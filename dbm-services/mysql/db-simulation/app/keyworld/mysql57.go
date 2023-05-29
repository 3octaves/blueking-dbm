/*
 * TencentBlueKing is pleased to support the open source community by making 蓝鲸智云-DB管理系统(BlueKing-BK-DBM) available.
 * Copyright (C) 2017-2023 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

package keyworld

// Keywords57 mysql5.7 key words
var Keywords57 = []Keyword{
	{"ACCESSIBLE", false},
	{"ACCOUNT", false},
	{"ACTION", false},
	{"ADD", false},
	{"AFTER", false},
	{"AGAINST", false},
	{"AGGREGATE", false},
	{"ALGORITHM", false},
	{"ALL", false},
	{"ALTER", true},
	{"ALWAYS", false},
	{"ANALYSE", false},
	{"ANALYZE", false},
	{"AND", false},
	{"ANY", false},
	{"AS", false},
	{"ASC", false},
	{"ASCII", false},
	{"ASENSITIVE", false},
	{"AT", false},
	{"AUTOEXTEND_SIZE", false},
	{"AUTO_INCREMENT", false},
	{"AVG", false},
	{"AVG_ROW_LENGTH", false},
	{"BACKUP", false},
	{"BEFORE", false},
	{"BEGIN", false},
	{"BETWEEN", false},
	{"BIGINT", false},
	{"BINARY", false},
	{"BINLOG", false},
	{"BIT", false},
	{"BLOB", false},
	{"BLOCK", false},
	{"BOOL", false},
	{"BOOLEAN", false},
	{"BOTH", false},
	{"BTREE", false},
	{"BY", false},
	{"BYTE", false},
	{"CACHE", false},
	{"CALL", false},
	{"CASCADE", false},
	{"CASCADED", false},
	{"CASE", false},
	{"CATALOG_NAME", false},
	{"CHAIN", false},
	{"CHANGE", false},
	{"CHANGED", false},
	{"CHANNEL", false},
	{"CHAR", false},
	{"CHARACTER", false},
	{"CHARSET", false},
	{"CHECK", false},
	{"CHECKSUM", false},
	{"CIPHER", false},
	{"CLASS_ORIGIN", false},
	{"CLIENT", false},
	{"CLOSE", false},
	{"COALESCE", false},
	{"CODE", false},
	{"COLLATE", false},
	{"COLLATION", false},
	{"COLUMN", false},
	{"COLUMNS", false},
	{"COLUMN_FORMAT", false},
	{"COLUMN_NAME", false},
	{"COMMENT", false},
	{"COMMIT", true},
	{"COMMITTED", false},
	{"COMPACT", false},
	{"COMPLETION", false},
	{"COMPRESSED", false},
	{"COMPRESSION", false},
	{"CONCURRENT", false},
	{"CONDITION", false},
	{"CONNECTION", false},
	{"CONSISTENT", false},
	{"CONSTRAINT", false},
	{"CONSTRAINT_CATALOG", false},
	{"CONSTRAINT_NAME", false},
	{"CONSTRAINT_SCHEMA", false},
	{"CONTAINS", false},
	{"CONTEXT", false},
	{"CONTINUE", false},
	{"CONVERT", false},
	{"CPU", false},
	{"CREATE", false},
	{"CROSS", false},
	{"CUBE", false},
	{"CURRENT", false},
	{"CURRENT_DATE", false},
	{"CURRENT_TIME", false},
	{"CURRENT_TIMESTAMP", false},
	{"CURRENT_USER", false},
	{"CURSOR", false},
	{"CURSOR_NAME", false},
	{"DATA", false},
	{"DATABASE", true},
	{"DATABASES", false},
	{"DATAFILE", false},
	{"DATE", false},
	{"DATETIME", false},
	{"DAY", false},
	{"DAY_HOUR", false},
	{"DAY_MICROSECOND", false},
	{"DAY_MINUTE", false},
	{"DAY_SECOND", false},
	{"DEALLOCATE", false},
	{"DEC", false},
	{"DECIMAL", false},
	{"DECLARE", false},
	{"DEFAULT", false},
	{"DEFAULT_AUTH", false},
	{"DEFINER", false},
	{"DELAYED", false},
	{"DELAY_KEY_WRITE", false},
	{"DELETE", false},
	{"DESC", false},
	{"DESCRIBE", false},
	{"DES_KEY_FILE", false},
	{"DETERMINISTIC", false},
	{"DIAGNOSTICS", false},
	{"DIRECTORY", false},
	{"DISABLE", false},
	{"DISCARD", false},
	{"DISK", false},
	{"DISTINCT", false},
	{"DISTINCTROW", false},
	{"DIV", false},
	{"DO", false},
	{"DOUBLE", false},
	{"DROP", true},
	{"DUAL", false},
	{"DUMPFILE", false},
	{"DUPLICATE", false},
	{"DYNAMIC", false},
	{"EACH", false},
	{"ELSE", false},
	{"ELSEIF", false},
	{"ENABLE", false},
	{"ENCLOSED", false},
	{"ENCRYPTION", false},
	{"END", false},
	{"ENDS", false},
	{"ENGINE", false},
	{"ENGINES", false},
	{"ENUM", false},
	{"ERROR", false},
	{"ERRORS", false},
	{"ESCAPE", false},
	{"ESCAPED", false},
	{"EVENT", false},
	{"EVENTS", false},
	{"EVERY", false},
	{"EXCHANGE", false},
	{"EXECUTE", false},
	{"EXISTS", false},
	{"EXIT", false},
	{"EXPANSION", false},
	{"EXPIRE", false},
	{"EXPLAIN", false},
	{"EXPORT", false},
	{"EXTENDED", false},
	{"EXTENT_SIZE", false},
	{"FALSE", false},
	{"FAST", false},
	{"FAULTS", false},
	{"FETCH", false},
	{"FIELDS", false},
	{"FILE", false},
	{"FILE_BLOCK_SIZE", false},
	{"FILTER", false},
	{"FIRST", false},
	{"FIXED", false},
	{"FLOAT", false},
	{"FLOAT4", false},
	{"FLOAT8", false},
	{"FLUSH", false},
	{"FOLLOWS", false},
	{"FOR", false},
	{"FORCE", false},
	{"FOREIGN", false},
	{"FORMAT", false},
	{"FOUND", false},
	{"FROM", false},
	{"FULL", false},
	{"FULLTEXT", false},
	{"FUNCTION", false},
	{"GENERAL", false},
	{"GENERATED", false},
	{"GEOMETRY", false},
	{"GEOMETRYCOLLECTION", false},
	{"GET", false},
	{"GET_FORMAT", false},
	{"GLOBAL", false},
	{"GRANT", false},
	{"GRANTS", false},
	{"GROUP", false},
	{"GROUP_REPLICATION", false},
	{"HANDLER", false},
	{"HASH", false},
	{"HAVING", false},
	{"HELP", false},
	{"HIGH_PRIORITY", false},
	{"HOST", false},
	{"HOSTS", false},
	{"HOUR", false},
	{"HOUR_MICROSECOND", false},
	{"HOUR_MINUTE", false},
	{"HOUR_SECOND", false},
	{"IDENTIFIED", false},
	{"IF", false},
	{"IGNORE", false},
	{"IGNORE_SERVER_IDS", false},
	{"IMPORT", false},
	{"IN", false},
	{"INDEX", false},
	{"INDEXES", false},
	{"INFILE", false},
	{"INITIAL_SIZE", false},
	{"INNER", false},
	{"INOUT", false},
	{"INSENSITIVE", false},
	{"INSERT", false},
	{"INSERT_METHOD", false},
	{"INSTALL", false},
	{"INSTANCE", false},
	{"INT", false},
	{"INT1", false},
	{"INT2", false},
	{"INT3", false},
	{"INT4", false},
	{"INT8", false},
	{"INTEGER", false},
	{"INTERVAL", false},
	{"INTO", false},
	{"INVOKER", false},
	{"IO", false},
	{"IO_AFTER_GTIDS", false},
	{"IO_BEFORE_GTIDS", false},
	{"IO_THREAD", false},
	{"IPC", false},
	{"IS", false},
	{"ISOLATION", false},
	{"ISSUER", false},
	{"ITERATE", false},
	{"JOIN", false},
	{"JSON", false},
	{"KEY", false},
	{"KEYS", false},
	{"KEY_BLOCK_SIZE", false},
	{"KILL", false},
	{"LANGUAGE", false},
	{"LAST", false},
	{"LEADING", false},
	{"LEAVE", false},
	{"LEAVES", false},
	{"LEFT", false},
	{"LESS", false},
	{"LEVEL", false},
	{"LIKE", false},
	{"LIMIT", false},
	{"LINEAR", false},
	{"LINES", false},
	{"LINESTRING", false},
	{"LIST", false},
	{"LOAD", false},
	{"LOCAL", false},
	{"LOCALTIME", false},
	{"LOCALTIMESTAMP", false},
	{"LOCK", false},
	{"LOCKS", false},
	{"LOGFILE", false},
	{"LOGS", false},
	{"LONG", false},
	{"LONGBLOB", false},
	{"LONGTEXT", false},
	{"LOOP", false},
	{"LOW_PRIORITY", false},
	{"MASTER", false},
	{"MASTER_AUTO_POSITION", false},
	{"MASTER_BIND", false},
	{"MASTER_CONNECT_RETRY", false},
	{"MASTER_DELAY", false},
	{"MASTER_HEARTBEAT_PERIOD", false},
	{"MASTER_HOST", false},
	{"MASTER_LOG_FILE", false},
	{"MASTER_LOG_POS", false},
	{"MASTER_PASSWORD", false},
	{"MASTER_PORT", false},
	{"MASTER_RETRY_COUNT", false},
	{"MASTER_SERVER_ID", false},
	{"MASTER_SSL", false},
	{"MASTER_SSL_CA", false},
	{"MASTER_SSL_CAPATH", false},
	{"MASTER_SSL_CERT", false},
	{"MASTER_SSL_CIPHER", false},
	{"MASTER_SSL_CRL", false},
	{"MASTER_SSL_CRLPATH", false},
	{"MASTER_SSL_KEY", false},
	{"MASTER_SSL_VERIFY_SERVER_CERT", false},
	{"MASTER_TLS_VERSION", false},
	{"MASTER_USER", false},
	{"MATCH", false},
	{"MAXVALUE", false},
	{"MAX_CONNECTIONS_PER_HOUR", false},
	{"MAX_QUERIES_PER_HOUR", false},
	{"MAX_ROWS", false},
	{"MAX_SIZE", false},
	{"MAX_STATEMENT_TIME", false},
	{"MAX_UPDATES_PER_HOUR", false},
	{"MAX_USER_CONNECTIONS", false},
	{"MEDIUM", false},
	{"MEDIUMBLOB", false},
	{"MEDIUMINT", false},
	{"MEDIUMTEXT", false},
	{"MEMORY", false},
	{"MERGE", false},
	{"MESSAGE_TEXT", false},
	{"MICROSECOND", false},
	{"MIDDLEINT", false},
	{"MIGRATE", false},
	{"MINUTE", false},
	{"MINUTE_MICROSECOND", false},
	{"MINUTE_SECOND", false},
	{"MIN_ROWS", false},
	{"MOD", false},
	{"MODE", false},
	{"MODIFIES", false},
	{"MODIFY", false},
	{"MONTH", false},
	{"MULTILINESTRING", false},
	{"MULTIPOINT", false},
	{"MULTIPOLYGON", false},
	{"MUTEX", false},
	{"MYSQL_ERRNO", false},
	{"NAME", false},
	{"NAMES", false},
	{"NATIONAL", false},
	{"NATURAL", false},
	{"NCHAR", false},
	{"NDB", false},
	{"NDBCLUSTER", false},
	{"NEVER", false},
	{"NEW", false},
	{"NEXT", false},
	{"NO", false},
	{"NODEGROUP", false},
	{"NONBLOCKING", false},
	{"NONE", false},
	{"NOT", false},
	{"NO_WAIT", false},
	{"NO_WRITE_TO_BINLOG", false},
	{"NULL", false},
	{"NUMBER", false},
	{"NUMERIC", false},
	{"NVARCHAR", false},
	{"OFFSET", false},
	{"OLD_PASSWORD", false},
	{"ON", false},
	{"ONE", false},
	{"ONLY", false},
	{"OPEN", false},
	{"OPTIMIZE", false},
	{"OPTIMIZER_COSTS", false},
	{"OPTION", false},
	{"OPTIONALLY", false},
	{"OPTIONS", false},
	{"OR", false},
	{"ORDER", false},
	{"OUT", false},
	{"OUTER", false},
	{"OUTFILE", false},
	{"OWNER", false},
	{"PACK_KEYS", false},
	{"PAGE", false},
	{"PARSER", false},
	{"PARSE_GCOL_EXPR", false},
	{"PARTIAL", false},
	{"PARTITION", true},
	{"PARTITIONING", false},
	{"PARTITIONS", false},
	{"PASSWORD", false},
	{"PHASE", false},
	{"PLUGIN", false},
	{"PLUGINS", false},
	{"PLUGIN_DIR", false},
	{"POINT", false},
	{"POLYGON", false},
	{"PORT", false},
	{"PRECEDES", false},
	{"PRECISION", false},
	{"PREPARE", false},
	{"PRESERVE", false},
	{"PREV", false},
	{"PRIMARY", false},
	{"PRIVILEGES", false},
	{"PROCEDURE", false},
	{"PROCESSLIST", false},
	{"PROFILE", false},
	{"PROFILES", false},
	{"PROXY", false},
	{"PURGE", false},
	{"QUARTER", false},
	{"QUERY", false},
	{"QUICK", false},
	{"RANGE", false},
	{"READ", false},
	{"READS", false},
	{"READ_ONLY", false},
	{"READ_WRITE", false},
	{"REAL", false},
	{"REBUILD", false},
	{"RECOVER", false},
	{"REDOFILE", false},
	{"REDO_BUFFER_SIZE", false},
	{"REDUNDANT", false},
	{"REFERENCES", false},
	{"REGEXP", false},
	{"RELAY", false},
	{"RELAYLOG", false},
	{"RELAY_LOG_FILE", false},
	{"RELAY_LOG_POS", false},
	{"RELAY_THREAD", false},
	{"RELEASE", false},
	{"RELOAD", false},
	{"REMOVE", false},
	{"RENAME", false},
	{"REORGANIZE", false},
	{"REPAIR", false},
	{"REPEAT", false},
	{"REPEATABLE", false},
	{"REPLACE", false},
	{"REPLICATE_DO_DB", false},
	{"REPLICATE_DO_TABLE", false},
	{"REPLICATE_IGNORE_DB", false},
	{"REPLICATE_IGNORE_TABLE", false},
	{"REPLICATE_REWRITE_DB", false},
	{"REPLICATE_WILD_DO_TABLE", false},
	{"REPLICATE_WILD_IGNORE_TABLE", false},
	{"REPLICATION", false},
	{"REQUIRE", false},
	{"RESET", false},
	{"RESIGNAL", false},
	{"RESTORE", false},
	{"RESTRICT", false},
	{"RESUME", false},
	{"RETURN", false},
	{"RETURNED_SQLSTATE", false},
	{"RETURNS", false},
	{"REVERSE", false},
	{"REVOKE", false},
	{"RIGHT", false},
	{"RLIKE", false},
	{"ROLLBACK", false},
	{"ROLLUP", false},
	{"ROTATE", false},
	{"ROUTINE", false},
	{"ROW", false},
	{"ROWS", false},
	{"ROW_COUNT", false},
	{"ROW_FORMAT", false},
	{"RTREE", false},
	{"SAVEPOINT", false},
	{"SCHEDULE", false},
	{"SCHEMA", false},
	{"SCHEMAS", false},
	{"SCHEMA_NAME", false},
	{"SECOND", false},
	{"SECOND_MICROSECOND", false},
	{"SECURITY", false},
	{"SELECT", false},
	{"SENSITIVE", false},
	{"SEPARATOR", false},
	{"SERIAL", false},
	{"SERIALIZABLE", false},
	{"SERVER", false},
	{"SESSION", false},
	{"SET", false},
	{"SHARE", false},
	{"SHOW", false},
	{"SHUTDOWN", false},
	{"SIGNAL", false},
	{"SIGNED", false},
	{"SIMPLE", false},
	{"SLAVE", false},
	{"SLOW", false},
	{"SMALLINT", false},
	{"SNAPSHOT", false},
	{"SOCKET", false},
	{"SOME", false},
	{"SONAME", false},
	{"SOUNDS", false},
	{"SOURCE", false},
	{"SPATIAL", false},
	{"SPECIFIC", false},
	{"SQL", false},
	{"SQLEXCEPTION", false},
	{"SQLSTATE", false},
	{"SQLWARNING", false},
	{"SQL_AFTER_GTIDS", false},
	{"SQL_AFTER_MTS_GAPS", false},
	{"SQL_BEFORE_GTIDS", false},
	{"SQL_BIG_RESULT", false},
	{"SQL_BUFFER_RESULT", false},
	{"SQL_CACHE", false},
	{"SQL_CALC_FOUND_ROWS", false},
	{"SQL_NO_CACHE", false},
	{"SQL_SMALL_RESULT", false},
	{"SQL_THREAD", false},
	{"SQL_TSI_DAY", false},
	{"SQL_TSI_HOUR", false},
	{"SQL_TSI_MINUTE", false},
	{"SQL_TSI_MONTH", false},
	{"SQL_TSI_QUARTER", false},
	{"SQL_TSI_SECOND", false},
	{"SQL_TSI_WEEK", false},
	{"SQL_TSI_YEAR", false},
	{"SSL", false},
	{"STACKED", false},
	{"START", false},
	{"STARTING", false},
	{"STARTS", false},
	{"STATS_AUTO_RECALC", false},
	{"STATS_PERSISTENT", false},
	{"STATS_SAMPLE_PAGES", false},
	{"STATUS", false},
	{"STOP", false},
	{"STORAGE", false},
	{"STORED", false},
	{"STRAIGHT_JOIN", false},
	{"STRING", false},
	{"SUBCLASS_ORIGIN", false},
	{"SUBJECT", false},
	{"SUBPARTITION", false},
	{"SUBPARTITIONS", false},
	{"SUPER", false},
	{"SUSPEND", false},
	{"SWAPS", false},
	{"SWITCHES", false},
	{"TABLE", true},
	{"TABLES", false},
	{"TABLESPACE", false},
	{"TABLE_CHECKSUM", false},
	{"TABLE_NAME", false},
	{"TEMPORARY", false},
	{"TEMPTABLE", false},
	{"TERMINATED", false},
	{"TEXT", false},
	{"THAN", false},
	{"THEN", false},
	{"TIME", false},
	{"TIMESTAMP", false},
	{"TIMESTAMPADD", false},
	{"TIMESTAMPDIFF", false},
	{"TINYBLOB", false},
	{"TINYINT", false},
	{"TINYTEXT", false},
	{"TO", false},
	{"TRAILING", false},
	{"TRANSACTION", false},
	{"TRIGGER", false},
	{"TRIGGERS", false},
	{"FALSE", false},
	{"TRUNCATE", false},
	{"TYPE", false},
	{"TYPES", false},
	{"UNCOMMITTED", false},
	{"UNDEFINED", false},
	{"UNDO", false},
	{"UNDOFILE", false},
	{"UNDO_BUFFER_SIZE", false},
	{"UNICODE", false},
	{"UNINSTALL", false},
	{"UNION", false},
	{"UNIQUE", false},
	{"UNKNOWN", false},
	{"UNLOCK", false},
	{"UNSIGNED", false},
	{"UNTIL", false},
	{"UPDATE", false},
	{"UPGRADE", false},
	{"USAGE", false},
	{"USE", false},
	{"USER", false},
	{"USER_RESOURCES", false},
	{"USE_FRM", false},
	{"USING", false},
	{"UTC_DATE", false},
	{"UTC_TIME", false},
	{"UTC_TIMESTAMP", false},
	{"VALIDATION", false},
	{"VALUE", false},
	{"VALUES", false},
	{"VARBINARY", false},
	{"VARCHAR", false},
	{"VARCHARACTER", false},
	{"VARIABLES", false},
	{"VARYING", false},
	{"VIEW", false},
	{"VIRTUAL", false},
	{"WAIT", false},
	{"WARNINGS", false},
	{"WEEK", false},
	{"WEIGHT_STRING", false},
	{"WHEN", true},
	{"WHERE", true},
	{"WHILE", false},
	{"WITH", false},
	{"WITHOUT", false},
	{"WORK", false},
	{"WRAPPER", false},
	{"WRITE", false},
	{"X509", false},
	{"XA", false},
	{"XID", false},
	{"XML", false},
	{"XOR", false},
	{"YEAR", false},
	{"YEAR_MONTH", false},
	{"ZEROFILL", false},
}
