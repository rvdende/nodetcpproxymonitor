/** written by Rouan van der Ende
 * link: https://github.com/rvdende/nodetcpproxymonitor
 * 13 Oct 2019
 */

var mqtt = require('mqtt');
var TCPProxy = require("./tcpproxy")

var config = { apikey: "xxxxxxxxxxxxxxxxxxxxxxxxx" }; // your api key

var client = mqtt.connect("mqtt://prototype.dev.iotnxt.io", {
        username: "api",
        password: "key-" + config.apikey
    });

var laserproxy = new TCPProxy({
    ip: "127.0.0.1",
    port: 1337,
    listen: 1338
}, () => {
    console.log("ready")
});

var laser = { id:"laser", data:{}}

laserproxy.on("activity", () => {
    laser.data.lastActivity = new Date();
})

client.on('connect', function () {
    console.log("connected.");
    client.subscribe(config.apikey, function (err) {
      if (err) { console.log(err) }
      console.log("subscribed.")
    })    
})
  
setInterval(()=>{
    if (client) client.publish(config.apikey, JSON.stringify(laser) );
},1000)

client.on('message', (topic, message) => { console.log(message.toString()); })