var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    mime = require('mime');

var Serv = function(configure){
  http.createServer(function(req,res){
    var urls = url.parse(req.url);
    var relpath  = path.join(__dirname,urls.pathname);
    fs.readFile(relpath,function(err,data){
      if(err){
        console.log("defined");
      }else{
        res.writeHead(200,{'Content-Type':mime.lookup(relpath)});
        res.end(data);
      }
    });
  });
};

module.exports = Serv;
