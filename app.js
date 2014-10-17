var Serv = require('./lib/Serv');
var path = require('path');

var appone = new Serv({
  baseDir: path.join(__dirname,'./www'), //Setup base Directory!
  dirindex:['index.html','default.html'] //Setup Your default index, like apache HTTPD.conf file!
});
appone.listen(80,'127.0.0.1'); //Setup Port, IP Address!
