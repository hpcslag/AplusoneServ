var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    mime = require('mime'),
    cache = require('../cache'),
    router = require('../router'),
    servtool = require('../tool');

var Serv = function(configure) {
    //cache here
    cache.regist('fscache');

    var server = http.createServer(function(req, res) {
        var urls = url.parse(req.url);
        var relpath = path.join(configure.baseDir, urls.pathname);

        servtool.dispatch(configure, req, res, function(err, realpath, data) {
            if(err) {
                //console.log(realpath + ' not exists.');
                res.writeHead(404, {"Content-Type":"text/html"});
                res.end('<html><body><h1>404: Request resource not found.</h1></body></html>');
            } else {
               //console.log(realpath + ' exists.');
               res.writeHead(200, {
                   "Content-Type": data.type,
                   "Content-Length": data.data.length
               });
               res.end(data.data);
            }
        });
    });
    this.listen = function(port, ip_address) {
        server.listen(port, ip_address);
        return this; //return to run
    };
    
    var emit = require('events').EnentEmitter;
    
    this.on = function(event){
        server.on(event,function(){server.close()});
    };

    this.host = servtool.hostHandler;
}
module.exports = Serv;
