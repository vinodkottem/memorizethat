'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
app.sendmail = function(to,sub,txt,cb){
	app.models.Email.send({
	      to: to || app.get('toemail'),
	      from: app.get('fromemail'),
	      subject: sub ||'Thanks for subscribing',
	      text: txt || "you are welcome"
	      //html: 'my <em>html</em>'
	    }, function(err, mail) {
	      console.log('email sent!'+err);
	      cb(err,mail);
	    });
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;
  if (require.main === module)
    app.start();
});


