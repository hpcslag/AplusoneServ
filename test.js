var http = require('http');
http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type':'text/html'});
  res.write("just test!");
  res.end();
}).listen(80,'127.0.0.1');
