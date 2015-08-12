var settings = require('../settings');
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost','test');

db.on('error',function(error){
	console.log(error);
});

var Schema = mongoose.Schema;
var userlistSchema = new Schema({
	users:String,
	passwords:String
});

exports.mongoose = mongoose;
exports.userlist = db.model('e',userlistSchema);
exports.db = db;