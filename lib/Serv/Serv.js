var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    mime = require('mime'),
    cache = require('../cache'),
    router = require('../router');

var servtool = {
    getServ: function(relpath, dirindex, callback) {
        //cache Qurey
        console.log("DEBUG(Serv.js:11): "+relpath);
        if (cache.query('fscache', relpath)) {
            process.nextTick(function(){callback(false, relpath, cache.get('fscache', relpath))});
        } else {
            //not found cache
            fs.stat(relpath, function(err, stats) {
                if (err) {
                    process.nextTick(function(){callback(true,relpath)});
                } else {
                    if (stats.isDirectory()) {
                        //isDirectory
                        var arr = 0;
                        fs.readFile(path.join(relpath,dirindex[arr]), function rqs(err, data) {
                            var rellpath = path.join(relpath,dirindex[arr]);
                            arr++;
                            if (err) {
                                if (arr < dirindex.length) {
                                    fs.readFile(path.join(relpath,dirindex[arr]), rqs);
                                } else {
                                    process.nextTick(function(){callback(true,rellpath)});
                                }
                            } else {
                                var responses = {
                                    "type": mime.lookup(rellpath),
                                    "data": data
                                };
                                process.nextTick(function(){callback(false, relpath, responses)});
                                //cache here,
                                process.nextTick(function(){cache.put('fscache', relpath, responses)});
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
                                    "type": "text/html",//mime.lookup(relpath),
                                    "data": data
                                };
                                process.nextTick(function(){callback(false, relpath, responses)});
                                //cache here
                                process.nextTick(function(){cache.put('fscache', relpath, responses)});
                            }
                        });
                    }
                }
            });
        }
    },
    hostHandler: function(hostname) {
        hostname = hostname || 'localhost';
        router.addhost(hostname);
        return {
            map: function(spath, fspath) {
                router.addfs(hostname, spath, fspath);
                return this;
            },
            get: function(spath, cb) {
                router.addroute(hostname, spath, 'GET', cb);
                return this;
            },
            post: function(spath, cb) {
                router.addroute(hostname, spath, 'POST', cb);
                return this;
            },
            put: function(spath, cb) {
                router.addroute(hostname, spath, 'PUT', cb);
                return this;
            },
            delete: function(spath, cb) {
                router.addroute(hostname, spath, 'DELETE', cb);
                return this;
            },
            head: function(spath, cb) {
                router.addroute(hostname, spath, 'HEAD', cb);
                return this;
            }
        };
    },
    dispatch: function(conf, request, response, cb) {
        var respath = url.parse(request.url).pathname;
        var handle = router.query(request.headers.host, respath, request.method);
        if(typeof handle === 'undefined') {
            process.nextTick(function(){cb(true, respath)});
            return;
        }
        if(handle.type === 'route') {
            process.nextTick(function(){handle.result(request, response, cb)});
            return;
        }
        if(handle.type === 'fs') {
            process.nextTick(function(){servtool.getServ(handle.result, conf.dirindex, cb)});
            return;
        }
    }
};
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
    this.host = servtool.hostHandler;
}
module.exports = Serv;
