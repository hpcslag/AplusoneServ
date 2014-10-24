var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/appone';

function connect(){
  	var assert = require('assert');

	// Connection URL
	var url = 'mongodb://localhost:27017/appone';
	// Use connect method to connect to the Server
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  console.log("MongoDB is Running");
	  db.close();
	});
}

connect.prototype.addData = function(data,table){
	MongoClient.connect(url, function(err, db) { 
	  	if(!err) {
  			console.log("");
 		}
 		db.collection(table.toString(), function(err, collection) {
	 		collection.insert([data],function(err,result){
	 			console.log("AddData OK!");
	 		});
 		});
	  db.close();
	});
};

connect.prototype.addDataL = function(data,table){
	MongoClient.connect(url, function(err, db) { 
	  	if(!err) {
  			console.log("");
 		}
 		db.collection(table.toString(), function(err, collection) {
	 		collection.insert(data,function(err,result){
	 			console.log("AddData OK!");
	 		});
 		});
	  db.close();
	});
};

connect.prototype.query = function(data,table){
	MongoClient.connect(url, function(err, db) { 
	  	if(!err) {
  			console.log("");
 		}
 		db.collection(table.toString(), function(err, collection) {
	 		collection.findOne(data,function(err,rows){
	 			console.log(rows);
	 		});
 		});
	  db.close();
	});
};

connect.prototype.drop = function(table){
	MongoClient.connect(url, function(err, db) { 
	  	if(!err) {
  			console.log("");
 		}
 		db.dropDatabase();
	 	console.log("Bye Bye MongoDB Data!");
	  db.close();
	});
};

connect.prototype.delete = function(data,table){
	MongoClient.connect(url, function(err, db) { 
		if(!err) {
	  		console.log("");
	 	}
	 	db.collection(table.toString(), function(err, collection) {
		 	collection.remove(data,function(err,result){
		 		console.log("DeleteData OK!");
		 	})
	 	});
		db.close();
	});
};

var cs = new connect();
module.exports = cs;