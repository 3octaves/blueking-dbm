export const MysqlDbOperations = {
  dml: ['select', 'insert', 'update', 'delete', 'show view'],
  ddl: [
    'create',
    'alter',
    'drop',
    'index',
    'create view',
    'execute',
    'trigger',
    'event',
    'create routine',
    'alter routine',
    'references',
    'create temporary tables',
  ],
  glob: ['file', 'reload', 'show databases', 'process', 'replication slave', 'replication client'],
};

export const MysqlDdlSensitiveWords = [
  'trigger',
  'event',
  'create routine',
  'alter routine',
  'references',
  'create temporary tables',
];

export const TendbClusterDbOperations = {
  dml: ['select', 'insert', 'update', 'delete'],
  ddl: ['execute'],
  glob: ['file', 'reload', 'process', 'show databases'],
};
