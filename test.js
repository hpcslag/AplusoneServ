var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    mime = require('mime'),
    colors = require('colors');

http.createServer(function(req,res){
    var urls = url.parse(req.url);
    var relpath  = path.join(__dirname,urls.pathname);
    fs.readFile(relpath,function(err,data){
      if(err){
        res.writeHead(404,'');
        res.end();
        console.log("["+"Bad".red+"] 404 Not Found!");
      }else{
        res.writeHead(200,{'Content-Type':mime.lookup(relpath)});
        res.end(data);
      }
    });
  }).listen(80);
