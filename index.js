var mqtt = require('mqtt')
var mqttServer = 'mqtt://localhost'
var client  = mqtt.connect(mqttServer)

var PouchDB = require('pouchdb')
var db = new PouchDB('http://admin:taytob01@localhost:5984/vanpower')

client.on('connect', function () {
  console.log("Connected to " + mqttServer)
  var aTopic = 'vanpower'
  client.subscribe(aTopic, function (err) {
      if (!err) {
        console.log("Subscribed to " + aTopic)
        // client.publish('presence', 'Hello mqtt')
      }
      else {
        console.log("Subscription error:" + err)
        client.end()
      }
    })
  })
   
  client.on('message', function (topic, message) {
    console.log('Topic [' + topic + '] updated')
    //console.log(message.toString())
    var myDoc = message.toJSON()
    myDoc['_id'] = new Date().toISOString()
    db.put(myDoc, function callback(err, result) {
      if (err) {
        console.log(err.message)
      }
      else {
        console.log('couchDB doc created')
      }
    });
    //client.end()
  })