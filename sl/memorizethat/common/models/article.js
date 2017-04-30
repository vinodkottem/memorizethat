'use strict';
var summarize = require('summarize');
var superagent = require('superagent');
var Promise = require('bluebird');

module.exports = function(Article) {
	/**
	 *  create: To save an article 
	 *  beforeRemote for 'create': To validate the given url, if it is already saved or not
	 */
	Article.beforeRemote ('create', function (ctx, modelInstance, next){
		let url = ctx.req.body.url;
		Article.count({url:url},function(err,cnt){
			console.log(cnt);
			if(err) next(err);
			else if(cnt > 0) next(new Error('record already exists.'));
			else {
				Article.summary(url,function(err,data){
					if(err) next(err);
					else {  
						Object.keys(data).forEach(function(key) {
							ctx.req.body[key] = data[key];
						});
						next();
						}
				});
			}
		});
	});
	Article.afterRemote('create', function(ctx, createddata, next) {
		if(ctx.result) {
			ctx.result = {'ok': true,'message':'saved successfully.'};
		}
		next();
	});
	
	Article.summary = (url,cb) =>{
		superagent
		.get(url)
		.end(function(err, res){
			if(err) cb(err);
			else {
				cb(null,summarize(res.text,10));
			}
		});
	}
};
