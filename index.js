var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost')

var PouchDB = require('pouchdb')
var db = new PouchDB('http://admin:taytob01@localhost:5984/vanpower')

client.on('connect', function () {
    client.subscribe('vanpower', function (err) {
      if (!err) {
        client.publish('presence', 'Hello mqtt')
      }
    })
  })
   
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    var myDoc = message.toJSON()
    myDoc['_id'] = new Date().toISOString()
    db.put(myDoc, function callback(err, result) {
      if (!err) { console.log('db record sent')}
      else {console.log(err.message)}
    });
    //client.end()
  })