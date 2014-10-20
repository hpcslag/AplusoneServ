var https = require('https');
var fs = require('fs');

var options = {
	key: fs.readFileSync("privateKey.crt"),
	cert: fs.readFileSync("certificate.crt"),
};

https.createServer(options,function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write("Hello this is HTTPS Module Options");
	res.end();
}).listen(443);