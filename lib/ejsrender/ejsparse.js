var ejs = require('ejs');//1.0.0
var path = require('path');
var fs = require('fs');

var out = function(){};

out.prototype.render = function(ejs_filename,object,callback){
	fs.readFile(path.join(__dirname+'../../../configure.json'),function(err,data){
		if(err){
			console.log("You Need Create New Configure.json File!");
			process.exit();
		}else{
			var cf = JSON.parse(data);
			var rel = path.join(__dirname+'../../../',cf.view);

			var str = fs.readFileSync(path.join(rel,ejs_filename),'utf8');
			var ret = ejs.render(str,object);
			callback(ret);
		}
	});
}

module.exports = out;
