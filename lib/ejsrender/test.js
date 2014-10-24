var views = require('./ejsparse.js');

var view = new views();

var gnn = view.render('index.ejs',{
	name:"Foobar"
},function(cb){
	console.log(cb);
});
