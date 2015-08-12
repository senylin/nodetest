var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var MovieSchema = new Schema({
	name:String,
	alias:[String],
	publish:Date,
	create_date:{type:Date,default:Date.now},
	images:{
		coverSmall:String,
		coverBig:String
	},
    source:[{
    	source:String,
    	link:String,
    	swfLink:String,
    	quality:String,
    	version:String,
    	lang:String,
    	subtitle:String,
    	create_date:{type:Date,default:Date.now}
    }]
})


var Movie = mongodb.mongoose.model("Movie",MovieSchema);
var MovieDAO= function(){};
MovieDAO.prototype.save = function(obj,callback){
    var instance = new Movie(obj);
    instance.save(function(err){
        callback(err);
    });
};
MovieDAO.prototype.findByName = function(query,callback){
    Movie.findOne(query,function(Err,obj){
        callback(err,obj);
    });
};

MovieDAO.prototype.findPagination = function(obj,callback){
    var q=obj.search||{};
    var col=obj.columns;

    var pageNumber=obj.page.num||1;
    var resultsPerPage= obj.page.limit||10;

    var skipFrom = (pageNumber*resultsPerPage)-resultsPerPage;
    var query =Movie.find(q,col).sort('-create_date').skip(skipFrom).limit(resultsPerPage);

    query.exec(function(error,results){
        if(error){
            callback(error,null,null);
        }else{
            Movie.count(q,function(error,count){
                if(error){
                    callback(error,null,null);
                }else{
                    var pageCount = Math.ceil(count / resultsPerPage);
                    callback(null,pageCount,results);
                }
            })
        }
    })
}
module.exports = new MovieDAO();
