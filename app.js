var Serv = require('./lib/serv');
var Servs = require('./lib/https'); //using https module
var path = require('path');
var fs = require('fs');
var colors = require('colors');
var router = require('./lib/router');
var views = require('./lib/ejsrender');

var cluster = require('cluster');
var http = require('http');  
var numCPUs = require('os').cpus().length;
fs.readFile('configure.json',function(err,data){
	var en = JSON.parse(data);
	if (cluster.isMaster) {  
	  // Fork workers.
	  for (var i = 0; i < en.cluster; i++) {  
	    cluster.fork();  
	  }   
	  
	  cluster.on('death', function(worker) {  
	    console.log('worker ' + worker.pid + ' died');  
	  });  
	} else {

		fs.readFile('configure.json',function(err,data){
			if(err){
				console.log("["+"ERROR!".red+"] Not Found Connfigure.json File, Please Create New Configure.json File!");
				process.exit();
			}else{
				var conf = JSON.parse(data);
				if(conf.https == "enable"){
					var appone = new Servs({
						baseDir: path.join(__dirname,conf.baseDir),
						dirindex: conf.dirindex
					});
				}else{
					var appone = new Serv({
						baseDir: path.join(__dirname,conf.baseDir),
						dirindex: conf.dirindex
					});
					
					var view = new views();
					fs.readFile('./index.js',function(err,data){
						if(err){
							console.log('undefined index.js file, please create file!');
							process.exit();
						}else{
							eval(data.toString()); //string to code, warning!
						}
					});
					/*appone.host(conf.host.ip)
						.map('/',path.join(__dirname,'./www'))
						.get('/hello',function(req,res,cb) {
							cb(false,'/hello',{
								type: 'text/html',
								data: '<html><body>hello</body></html>'
							});
						}).get('/begin',function(req,res,cb) {
							cb(false,'/hello',{
								type: 'text/html',
								data: '<html><body>hello</body></html>'
							});
						}).get('/index',function(req,res,cb){
							var data = view.render('index.ejs',{
								name:"MacTaylor"
							},function(callback){
								cb(false,'/index',{
									type:'text/html',
									data: callback
								});
							});
						});*/
				}

				appone.listen(conf.host.port,conf.host.ip); //Setup Port, IP Address!
				if(conf.https == "enable"){
					console.log("["+"RUN".green+"] Server Run as "+conf.host.ip+":443 or https://localhost");
				}else{
					console.log("["+"RUN".green+"] Server Run as "+conf.host.ip+":"+conf.host.port);
				}
				console.log("	                    ˍ▂▃▄▄".red);
				console.log("                 	◢████████◤".red);
				console.log("           ◢        ██████████▆▄".red);
				console.log("           ◥◣     ███████████████◣".red);
				console.log("             ◥◣◢███████████████████◤".red);
				console.log("                ◥████████████████◤".red);
				console.log("          █◣  ▌██████████████◣".red);
				console.log("          ███◣▌█▄▄ ◥███████████◣".red);
				console.log("          █ ◥█▌█     ◥██████████".red);
				console.log("          █  ◥▌████    ◥████████◣".red);
				console.log("               ▇▇◣  ██   ◥███████".red);
				console.log("               █  █ 	██   ◢███████▌".red);
				console.log("               ███◤ 	██ ◢◤   ◥█████◣".red);
				console.log("               █ ◥◣ 	██◤       ◥████".red);
				console.log("    GOD GOTO SLEEP     ,        	 ◥██".red);
				console.log("      "+"GO DE YOUR BUG.".green+"     ◥ ".red);
			}
		});
	}//cluster
});//fs