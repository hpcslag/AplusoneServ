appone.host(conf.host.ip).map('/',path.join(__dirname,'./www'))
	.get('/hello',function(req,res,cb) {
		cb(false,'/hello',{
			type: 'text/html',
			data: '<html><body>hello world</body></html>'
		});
	}).get('/index',function(req,res,cb){
		var data = view.render('index.ejs',{
			name:"Test Name"
		},function(callback){
			cb(false,'/index',{
				type:'text/html',
				data: callback
			});
		});
	});