exports.list = function (req, res) {
var html = "<h2>你好, " + req.user.username + "</h2><a href='/logout'>退出</a>";
res.send(html);
};
exports.github = function(req,res){
	var html =  "<h2>你好, " + req.user.displayName +"(" + req.user.username+")</h2>" +  "<p><a href='/logout'>退出</a></p>";
	res.send(html);
};