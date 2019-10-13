var net = require('net');

var TCPProxy = require("./tcpproxy")

var laserdummy;

var softwaredummy;

describe("Laser forwarder", () => {
    it("run dummy laser", function (done) {
        laserdummy = net.createServer(function(socket) {
            socket.on("data", (data)=>{
                socket.write(data);
            })
        });

        laserdummy.listen(1337, ()=>{
            done();
        });       
    })

    it("can connect", function (done) {
        var laserproxy = new TCPProxy({
            ip:"127.0.0.1", 
            port: 1337, 
            listen: 1338}, ()=>{
                done();
            });
    })

    it("dummy software can connect", function(done) {
        softwaredummy = new net.Socket;

        softwaredummy.connect( 1338, "127.0.0.1", function() {
            softwaredummy.write("test");
        })

        softwaredummy.on("data", (data)=>{
            if (data.toString() == "test") { 
                softwaredummy.end();
                done();
            }
        })       
    })

    it("dummy software can connect", function(done) {
        softwaredummy = new net.Socket;

        softwaredummy.connect( 1338, "127.0.0.1", function() {
            softwaredummy.write("test");
        })

        softwaredummy.on("data", (data)=>{
            if (data.toString() == "test") { 
                softwaredummy.end();
                done();
            }
        })       
    })
})