package redismonitor

import (
	"fmt"
	"sync"

	"dbm-services/redis/db-tools/dbmon/config"
	"dbm-services/redis/db-tools/dbmon/models/myredis"
	"dbm-services/redis/db-tools/dbmon/mylog"
	"dbm-services/redis/db-tools/dbmon/pkg/consts"
)

// globRedisMonitorJob global var
var globRedisMonitorJob *Job
var monitorOnce sync.Once

// Job 监控任务
type Job struct {
	Conf *config.Configuration `json:"conf"`
	Err  error                 `json:"-"`
}

// GetGlobRedisMonitorJob 新建监控任务
func GetGlobRedisMonitorJob(conf *config.Configuration) *Job {
	monitorOnce.Do(func() {
		globRedisMonitorJob = &Job{
			Conf: conf,
		}
	})
	return globRedisMonitorJob
}

// Run new monitor tasks and run
func (job *Job) Run() {
	mylog.Logger.Info("redismonitor wakeup,start running...")
	defer func() {
		if job.Err != nil {
			mylog.Logger.Info(fmt.Sprintf("redismonitor end fail,err:%v", job.Err))
		} else {
			mylog.Logger.Info("redismonitor end succ")
		}
	}()
	job.Err = nil
	var instAddr string
	var password string
	var predixyItem *PredixyMonitorTask
	var twemItem *TwemproxyMonitorTask
	var redisItem *RedisMonitorTask
	predixyTasks := []*PredixyMonitorTask{}
	twemproxyTasks := []*TwemproxyMonitorTask{}
	redisTasks := []*RedisMonitorTask{}
	for _, svrItem := range job.Conf.Servers {
		warnTask, _ := newBaseTask(job.Conf, svrItem, "")
		instAddr = svrItem.ServerIP + ":0"
		if len(svrItem.ServerPorts) > 0 {
			instAddr = fmt.Sprintf("%s:%d", svrItem.ServerIP, svrItem.ServerPorts[0])
		}
		warnTask.eventSender.SetInstance(instAddr)
		if svrItem.MetaRole == consts.MetaRolePredixy && len(svrItem.ServerPorts) > 0 {
			password, job.Err = myredis.GetProxyPasswdFromConfFlie(svrItem.ServerPorts[0], svrItem.MetaRole)
			if job.Err != nil {
				warnTask.eventSender.SendWarning(consts.EventPredixyLogin, job.Err.Error(), consts.WarnLevelError, svrItem.ServerIP)
				continue
			}
			predixyItem, job.Err = NewPredixyMonitorTask(job.Conf, svrItem, password)
			if job.Err != nil {
				continue
			}
			predixyTasks = append(predixyTasks, predixyItem)
		} else if svrItem.MetaRole == consts.MetaRoleTwemproxy && len(svrItem.ServerPorts) > 0 {
			password, job.Err = myredis.GetProxyPasswdFromConfFlie(svrItem.ServerPorts[0], svrItem.MetaRole)
			if job.Err != nil {
				warnTask.eventSender.SendWarning(consts.EventTwemproxyLogin, job.Err.Error(),
					consts.WarnLevelError, svrItem.ServerIP)
				continue
			}
			twemItem, job.Err = NewTwemproxyMonitorTask(job.Conf, svrItem, password)
			if job.Err != nil {
				continue
			}
			twemproxyTasks = append(twemproxyTasks, twemItem)
		} else if consts.IsRedisMetaRole(svrItem.MetaRole) && len(svrItem.ServerPorts) > 0 {
			password, job.Err = myredis.GetRedisPasswdFromConfFile(svrItem.ServerPorts[0])
			if job.Err != nil {
				warnTask.eventSender.SendWarning(consts.EventRedisLogin, job.Err.Error(), consts.WarnLevelError, svrItem.ServerIP)
				continue
			}
			redisItem, job.Err = NewRedisMonitorTask(job.Conf, svrItem, password)
			if job.Err != nil {
				continue
			}
			redisTasks = append(redisTasks, redisItem)
		}
	}
	for _, predixy01 := range predixyTasks {
		predixyItem := predixy01
		predixyItem.RunMonitor()
		if predixyItem.Err != nil {
			return
		}
	}
	for _, twem01 := range twemproxyTasks {
		twemItem := twem01
		twemItem.RunMonitor()
		if twemItem.Err != nil {
			return
		}
	}
	for _, redis01 := range redisTasks {
		redisItem := redis01
		redisItem.RunMonitor()
		if redisItem.Err != nil {
			return
		}
	}
}
