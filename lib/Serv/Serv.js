var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    mime = require('mime'),
    cache = require('../Cache');

var servtool = {
    getServ: function(relpath, dirindex, callback) {
        //cache Qurey
        console.log("DEBUG(Serv.js:11): "+relpath);
        if (cache.query('fscache', relpath)) {
            callback(false, relpath, cache.get('fscache', relpath));
        } else {
            //not found cache
            fs.stat(relpath, function(err, stats) {
                if (err) {
                    callback(true);
                } else {
                    if (stats.isDirectory()) {
                        //isDirectory
                        var arr = 0;
                        fs.readFile(path.join(relpath,dirindex[arr]), function rqs(err, data) {
                            if (err) {
                                if (arr < dirindex.length) {
                                    arr++;
                                    fs.readFile(path.join(relpath,dirindex[arr]), rqs);
                                } else {
                                    callback(true);
                                }
                            } else {
                                var responses = {
                                    "type": mime.lookup(relpath),
                                    "data": data
                                };
                                callback(false, relpath, responses);
                                //cache here,
                                cache.put('fscache', relpath, responses);
                            }
                        });
                    } else {
                        //Not Directory,
                        //fs.readFile({if(err)else{}});
                        fs.readFile(relpath, function(err, data) {
                            if (err) {
                                callback(true);
                            } else {
                                var responses = {
                                    "type": mime.lookup(relpath),
                                    "data": data
                                };
                                callback(false, relpath, responses);
                                //cache here
                                cache.put('fscache', relpath, responses);
                            }
                        });
                    }
                }
            });
        }
    }
};
var Serv = function(configure) {
    //cache here
    cache.regist('fscache');

    var server = http.createServer(function(req, res) {
        var urls = url.parse(req.url);
        var relpath = path.join(configure.baseDir, urls.pathname);

        servtool.getServ(relpath, configure.dirindex, function(err, realpath, data) {
            if (err) {
                console.log(realpath);
                res.writeHead(404, '');
                res.end("404 NOT FOUND!");
            } else {
                res.writeHead(200, {
                    'Content-Type': data.type,
                    'Content-Length': data.data.length
                });
                res.end(data.data);
            }
        });
    });
    this.listen = function(port, ip_address) {
        server.listen(port, ip_address);
        return this; //return to run
    };
}
module.exports = Serv;
