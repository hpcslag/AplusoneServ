var Serv = require('./lib/Serv');
//var Servs = require('./lib/https'); using https module
var path = require('path');
var fs = require('fs');
var colors = require('colors');


fs.readFile('configure.json',function(err,data){
	if(err){
		console.log("["+"ERROR!".red+"] Not Found Connfigure.json File, Please Create New Configure.json File!");
		process.exit();
	}else{
		var conf = JSON.parse(data);

		var appone = new Serv({
			baseDir: path.join(__dirname,conf.baseDir),
			dirindex: conf.dirindex
		});
		appone.listen(conf.host.port,conf.host.ip); //Setup Port, IP Address!
		console.log("["+"RUN".green+"] Server Run as "+conf.host.ip+":"+conf.host.port);
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
		console.log("               █  █ ██   ◢███████▌".red);
		console.log("               ███◤ ██ ◢◤   ◥█████◣".red);
		console.log("               █ ◥◣ ██◤       ◥████".red);
		console.log("    GOD GOTO SLEEP     ,        ◥██".red);
		console.log("      "+"GO DE YOUR BUG.".green+"             ◥ ".red);
	}
});
 //Setup base Directory!
 //Setup Your default index, like apache HTTPD.conf file!