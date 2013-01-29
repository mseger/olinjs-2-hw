/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , cat = require('./routes/cat')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// GET 
app.get('/', cat.list);
app.get('/users', user.list);
app.get('/cats', cat.list);
app.get('/cats/new', cat.create);
app.get('/cats/delete', cat.remove);
app.get('/cats/color/:color', cat.by_color);
app.get('/cats/delete/old', cat.remove_oldest);

// POST
app.post('/cats/new', cat.create_post);
app.post('/cats/delete', cat.remove_post);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
