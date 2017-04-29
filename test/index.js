var summarize = require('summarize');
var superagent = require('superagent');

superagent
  .get('http://stackoverflow.com/questions/38838281/piping-readable-stream-using-superagent')
  .end(function(err, res){
	  console.log(err);
	  // console.log(res);
    console.log(summarize(res.text,10));
  });