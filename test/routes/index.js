/* GET home page. */
var test = require('../models/moose');
var myUtil = require('../myUtil.js');
var eventproxy = require('eventproxy');
var cheerio = require('cheerio');
var superagent = require('superagent');
var url = require('url');
var async =require('async');
//test
exports.nets = function(req,res){
  var durl = 'db.178.com/dota2/hero-38';
  console.log(durl);
  superagent.get(durl).end(function(err,sres){
    if(err){return console.error(err);}
    var $ = cheerio.load(sres.text);
    var items = [];
   $('.dota2_tip').each(function(idx,element){
      var $element = $(element);
      var href ="db.178.com"+$element.attr('href');
      items.push(href);
  
    })
    var ep = new eventproxy();
    var storys=[];
    var i=0;
    ep.after('topic_html',items.length,function(topics){
      topics = topics.map(function(topicPair){
      var topicUrl = topicPair[0];
      var topicHtml = topicPair[1];
      var $ = cheerio.load(topicHtml);
       storys.push({ 
        title:$('title').text(),
        // name:$('.bt_10').children('h3').text(),
        // longstory:$('.box_b_in').text(),
        // num:i,
        url:topicUrl
      })
      i++;
      
      })
      // console.log(storys);
      console.log(items.length);
     res.send(storys);

    })

    items.forEach(function(item){
      superagent.get(item).end(function(err,res){
        console.log(item);
        ep.emit('topic_html',[item,res.text]);
      })
    })






   //  var fetchUrl = function(item,callback){
   //       superagent.get(item).end(function(err,res){
   //    var Url = item;
   //    var Html = res.text;
   //    var $$$ = cheerio.load(Html);
   //   storys.push({
   //  name:$('.bt_10').children('h3').text(),
   //   longstory:$('.box_b_in').text()
   //   })
   //    })
   //  }
   //  var storys = [];
   //  async.mapLimit(items,5,function(item,callback){
   // fetchUrl(item,callback);
   //  },function(err,result){
   //    res.send(storys);
   //    console.log('final');
   //    console.log(result);
   //  })
  })
}

var $$ = require('jQuery');
exports.index = function(req,res){
  var urls ='http://movie.douban.com/subject/11529526';
  console.log(urls);
  myUtil.get(urls,function(content,status){
    console.log("status="+status);
    var movie = {};
    movie.name = $$(content).find('span[property="v:itemreviewed"]').text();
    movie.director = $$(content).find('#info span:nth-child(1) a').text();
    console.log(movie);
    res.send(content);
  })
}


// exports.home = function(req, res){
//  var add = new test.userlist({users:req.body.user, passwords:req.body.password});
//  console.log(add.passwords);
//    add.save(function(err){
//      if(err)
//     res.end("bug");
//  });
//  test.userlist.find(function(err,persons){
//   console.log(persons);
//   res.end("ok");
//  })
//   test.userlist.count(query,function(err,doc){
//     if(doc ==1){
//       var findResult = test.userlist.find(function(error,result){
//   	if(error){
//   		res.send(error);
//   	}
//   	else{ res.render('home', {
//             title : '后台',
//             status: doc,
//             username : query.user,
//             adminlist : result,
//             date : new Date()
//           });
//   }
  
// })
// }
// else{
//   res.render('home',{title:'ea',status:doc});}
  // })
// };

exports.login = function (req, res){
  res.render('login', {
    title: 'login'
  });
};

exports.doLogin = function(req,res){
  var user = {
    username:'admin',
    password:'admin'
  }
  if(req.body.username == user.username && req.body.password ==user.password){
    req.session.user = user;
    return res.redirect('/home');
  }else{
    req.session.error = 'Something wrong with you';
     return res.redirect('/login');
  }

};

exports.logout = function(req,res){
  req.session.user=null;
  res.redirect('/');
};

exports.home = function(req,res){
  res.render('home',{title:'Home'});
};
