module.exports = function(app) {
  var remotes = app.remotes();
  remotes.after('**', function (ctx, next) {
  	if(ctx.result.error){
	    ctx.result = {
	      data: ctx.result,
	      error: ctx.result.error
	    };
	    delete ctx.result.data.error;
	}
	else{
		ctx.result = {
	      data: ctx.result,
	      error: {
	      	"status": 200,
	      	"message": "Success",
	      	"description": ""
	      }
	    };
	}
    next();
  });

  var opts = remotes.options || {};
  opts.errorHandler = {
    'handler': function restErrorHandler(err, req, res, next) {
    	console.log(err);
    	var eCode = err.status;
    	if(eCode == null)
    	{
            if(err.statusCode !=null)
      			eCode = err.statusCode;
            else
              eCode = 400;
      	}
      err = {
        data: {},
        error: {
          status: eCode,
          message: err.message,
          description: err.message
        }
      }
      res.send(err);
    }
  }
  remotes.options =  opts;
};