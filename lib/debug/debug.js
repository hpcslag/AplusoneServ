var fs = require('fs');
var path = require('path');
var nodeemailer = require('nodeemailer');

function Debug(){}

Debug.prototype.logrecord = function(message){
	fs.appendFile(__dirname+'/log/log.txt',message+'\n',function(err){
		if(err){
			console.log("writeDead");
		}else{
			console.log(message);
		}
	});
};

Debug.prototype.die = function(message){
	console.log(message);
	process.exit();
}


var debug = new Debug();

module.exports = debug;