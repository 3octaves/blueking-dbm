// Package proxyuserlist proxy用户列表
package proxyuserlist

import (
	"bufio"
	"context"
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"strings"

	"dbm-services/mysql/db-tools/mysql-monitor/pkg/config"
	"dbm-services/mysql/db-tools/mysql-monitor/pkg/monitoriteminterface"

	"github.com/jmoiron/sqlx"
)

var name = "proxy-user-list"

// Checker TODO
type Checker struct {
	db *sqlx.DB
}

// Run TODO
func (c *Checker) Run() (msg string, err error) {
	userListFilePath := filepath.Join(
		"/etc",
		fmt.Sprintf(`proxy_user.cnf.%d`, config.MonitorConfig.Port),
	)
	f, err := os.Open(userListFilePath)
	if err != nil {
		slog.Error("read proxy user list file", slog.String("error", err.Error()))
		return "", err
	}
	defer func() {
		_ = f.Close()
	}()

	var usersFromFile []string
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		usersFromFile = append(usersFromFile, scanner.Text())
		err := scanner.Err()
		if err != nil {
			slog.Error("scan proxy user list file", slog.String("error", err.Error()))
			return "", err
		}
	}

	ctx, cancel := context.WithTimeout(context.Background(), config.MonitorConfig.InteractTimeout)
	defer cancel()

	var usersFromQuery []string
	err = c.db.SelectContext(ctx, &usersFromQuery, `SELECT * FROM USERS`)
	if err != nil {
		slog.Error("query user list", slog.String("error", err.Error()))
		return "", err
	}

	/*
		这种比较两个 slice, 并抽取各自独有的 element 的算法会更快, 理论上是 O(2(m+n))
		如果用传统的以一个 slice 做循环, 查找另一个 slice, 理论上是 O(mlog(n))

		BenchmarkMapIter-6              1000000000               0.001124 ns/op        0 B/op          0 allocs/op
		BenchmarkMapIter-6              1000000000               0.001228 ns/op        0 B/op          0 allocs/op
		BenchmarkMapIter-6              1000000000               0.001189 ns/op        0 B/op          0 allocs/op
		BenchmarkMapIter-6              1000000000               0.002286 ns/op        0 B/op          0 allocs/op
		BenchmarkMapIter-6              1000000000               0.001106 ns/op        0 B/op          0 allocs/op
		BenchmarkNormalIter-6           1000000000               0.1990 ns/op          0 B/op          0 allocs/op
		BenchmarkNormalIter-6           1000000000               0.1922 ns/op          0 B/op          0 allocs/op
		BenchmarkNormalIter-6           1000000000               0.1985 ns/op          0 B/op          0 allocs/op
		BenchmarkNormalIter-6           1000000000               0.1944 ns/op          0 B/op          0 allocs/op
		BenchmarkNormalIter-6           1000000000               0.1928 ns/op          0 B/op          0 allocs/op

		测试性能差别还是蛮大的
	*/
	stage := make(map[string]int)
	for _, u := range usersFromFile {
		stage[u] = 1
	}
	for _, u := range usersFromQuery {
		if _, ok := stage[u]; !ok {
			stage[u] = 0
		}
		stage[u] -= 1
	}

	var onlyFile, onlyQuery []string
	for k, v := range stage {
		if v == 1 {
			onlyFile = append(onlyFile, k)
		}
		if v == -1 {
			onlyQuery = append(onlyQuery, k)
		}
	}

	var msgs []string

	if len(onlyFile) > 0 {
		msgs = append(msgs, fmt.Sprintf("user only in file: %s", strings.Join(onlyFile, ",")))
	}
	if len(onlyQuery) > 0 {
		slog.Info("user only in memory", slog.String("users", strings.Join(onlyQuery, ",")))
		err := refreshUsersToFile(onlyQuery, userListFilePath)
		if err != nil {
			msgs = append(msgs,
				fmt.Sprintf("refresh users [%v] failed: %s", onlyQuery, err.Error()))
		}
	}

	return strings.Join(msgs, "\n"), nil
}

func refreshUsersToFile(userList []string, userFilePath string) error {
	f, err := os.OpenFile(userFilePath, os.O_RDWR|os.O_APPEND, 0777)
	if err != nil {
		return err
	}
	defer func() {
		_ = f.Close()
	}()

	var realMissingUserList []string
	for _, u := range userList {
		if !isInUserFile(u, f) {
			realMissingUserList = append(realMissingUserList, u)
		}
	}

	_, err = f.WriteString(strings.Join(realMissingUserList, "\n"))
	return err
}

func isInUserFile(user string, f *os.File) bool {
	s := bufio.NewScanner(f)
	s.Split(bufio.ScanLines)

	for s.Scan() {
		if strings.TrimSpace(s.Text()) == strings.TrimSpace(user) {
			return true
		}
	}
	return false
}

// Name TODO
func (c *Checker) Name() string {
	return name
}

// New TODO
func New(cc *monitoriteminterface.ConnectionCollect) monitoriteminterface.MonitorItemInterface {
	return &Checker{db: cc.ProxyAdminDB}
}

// Register TODO
func Register() (string, monitoriteminterface.MonitorItemConstructorFuncType) {
	return name, New
}
