var express = require('express')
,path = require('path')
,app = express();
  app.set('port', process.env.PORT || 3000);
// var server = require('http').createServer(app).listen(app.get('port'), function(){
// console.log("Express server listening on port " + app.get('port'));
// });
var server =app.listen(app.get('port'),function(){
	console.log('Express server listening on port '+app.get('port'));
});
var io = require('socket.io').listen(server);
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');

io.set('log level',1);

io.on('connection',function(socket){
	socket.emit('open');

	 var client = {
	 	socket:socket,
	 	name:false,
	 	color:getColor()
	 }

	 socket.on('message',function(msg){
	 	var obj = {time:getTime(),color:client.color};


	 	if(!client.name){
	 		client.name = msg;
	 		obj['text'] = client.name;
	 		obj['author'] = 'System';
	 		obj['type'] = 'welcome';
	 		console.log(client.name+':login');

	 		socket.emit('system',obj);

	 		socket.broadcast.emit('system',obj);
	 	}else{

	 		obj['text'] = msg;
	 		obj['author'] = client.name;
	 		obj['type'] = 'message';
	 		console.log(client.name+' say:'+msg);

	 		socket.emit('message',obj);

	 		socket.broadcast.emit('message',obj)
	 	}
	 });
	 socket.on('disconnect',function(){
	 	var obj ={
	 		time:getTime(),
	 		color:client.color,
	 		auther:'System',
	 		text:client.name,
	 		type:'disconnect'
	 	};
	 	   socket.broadcast.emit('system',obj);
	 	   console.log(client.name + 'Disconnect');
	 });
});


  app.set('views', path.join(__dirname + '/views'));
  app.use(logger('dev'));
  app.use(bodyParser.urlencoded());
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));



if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/',function(req,res){
	res.sendFile('views/chat.html');
});


var getTime = function(){
	var date = new Date();
	return date.getHours()+':'+date.getMinutes()+":"+date.getSeconds();
}

var getColor = function(){
  var colors = ['aliceblue','antiquewhite','aqua','aquamarine','pink','red','green',
                'orange','blue','blueviolet','brown','burlywood','cadetblue'];
  return colors[Math.round(Math.random() * 10000 % colors.length)];
}
