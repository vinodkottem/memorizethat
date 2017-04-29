//'use strict';
//var summarize = require('summarize');
//var superagent = require('superagent');
//
//
//module.exports = function(app) {
//  var Article = app.models.article;
//  superagent
//  .get('http://stackoverflow.com/questions/38838281/piping-readable-stream-using-superagent')
//  .end(function(err, res){
//	  console.log(err);
//	Article.create(summarize(res.text,10),function(err,created){
//		console.log(err);
//		console.log(created);
//	});
//  });
//  
//};
