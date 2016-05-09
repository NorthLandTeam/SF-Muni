var gzippo  = require('gzippo'),
	express = require('express'),
	morgan = require('morgan'),
	app     = express();

var port = process.env.PORT || 3000;
 
app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(port, function() {
  console.log('listening on port:',  port);
});