
var net = require('net');
const EventEmitter = require('events');

class TCPProxy extends EventEmitter {

    server;
    client;

    constructor(options,cb) {
        super();
        this.server = net.createServer( (socket) => {

            this.client = new net.Socket();
            
            this.client.connect(options.port, options.ip, ()=>{
                console.log("connected")
            });

            this.client.on("data", (data)=>{
                socket.write(data);
                this.emit("activity");
            })

            socket.on("data", (data)=>{
                this.client.write(data);
                this.emit("activity");
            })
        })

        this.server.listen(options.listen,()=>{
            cb();
        })
    }

}

module.exports = TCPProxy