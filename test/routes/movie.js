var Movie = require('../models/Movie');
exports.movieAdd = function(req,res){
	if(req.params.name){
		return res.render('movies',{
			title:req.params.name+'| | |movie.me',
			label:'Bianji'+req.params.name,
			movie:req.params.name
		});
	}else{
		return res.render('movies',{
			title:'new|movie.me',
			label:'new',
			movie:false
		});
	}
	// res.render('movies',{
	// 		title:'new||movie.me',
	//  		lable:'new',
	// 		movie:false
	// 	});
};
exports.doMovieAdd = function(req, res) {
console.log(req.body.content);
var json = req.body.content;
if(json._id){//update
} else {//insert
Movie.save(json, function(err){
if(err) {
res.send({'success':false,'err':err});
} else {
res.send({'success':true});
}
});
}
};
// exports.moviess = function(req,res){
//   res.render('movie2',{ title: 'Express'});
// }
exports.movie = function(req,res){
    var search = {};
    var page={limit:5,num:1};

    if(req.query.p){
    	page['num']=req.query.p<1?1:req.query.p;
    }
    var model= {
    	search:search,
    	columns:'name alias director publish images.coverSmall create_date type deply',
    	page:page
    };

    Movie.findPagination(model,function(err, pageCount,list){
    	page['pageCount']=pageCount;
    	page['size']=list.length;
    	page['numberOf']=pageCount>5?5:pageCount;

    	return res.render('movie2',{
    		title:'moive||movie.me',
    		page:'admin',nav:'admin.movie',
    		movieList:list,
    		page:page
    	})
    })
}
exports.movieJSON= function(req,res){
	Movie.findByName(req,params.name,function(err,obj){
		res.send(obj);
	});
}