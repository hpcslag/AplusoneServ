var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    mime = require('mime');

var servtool = function(relpath,dirindex,callback){
    fs.stats(relpath,function(err,stats){
      if(err){
        callback(true);
      }else{
        if(stats.isDirectory()){
          //isDirectory
          var arr = 0;
          fs.readFile(dirindex[arr],function rqs(err,data){
            if(err){
              if(ic>dirindex.length){
                arr++;
                fs.readFile(dirindex[arr],rqs);
              }else{
                callback(true);
              }
            }else{
              responses = {"type":mime.lookup(relpath),"data":data};
              callback(false,relpath,responses);
              //cache here,
            }
          });
        }else{
          //Not Directory,
          //fs.readFile({if(err)else{}});
        }
      }
    })
}
var Serv = function(configure){
  //cache here
  http.createServer(function(req,res){
    var urls = url.parse(req.url);
    var relpath  = path.join(__dirname,urls.pathname);
    //
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
