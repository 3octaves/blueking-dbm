
const mi = db.isMaster();
db = db.getSisterDB('admin');
let mongo_type = '';
if (typeof mi['setName'] != 'undefined' ) {
  if (mi.arbiterOnly) {
    mongo_type = 'arbiter';
  }
  else if ( mi.secondary) {
    db.auth(user,pwd);
    mongo_type = 'secondary';
  }
  else if ( mi.ismaster) {
    db.auth(user,pwd);
    mongo_type = 'primary';
  } else {
    mongo_type = 'unknown';
  }
} else if (mi.ismaster) {
  if (typeof mi['msg'] != 'undefined') {
    mongo_type = 'mongos';
  } else {
    mongo_type = 'configsvr';
  }
} else {
  mongo_type = 'unknown2';
}

db.auth(user,pwd);
print ('mongo_type:' + mongo_type);

if (mongo_type == 'primary') {
  print ("me ", mi.me , "connect ok update test.dbmon_heartbeat");
  var testdb= db.getSisterDB('test');
  testdb.dbmon_heartbeat.update ({_id:'hb'}, {"$set":{mi:mi}}, true,true);
  //printjson(testdb.dbmon_heartbeat.findOne());
} else {
  print ("me ", mongo_type , "connect ok");
}
