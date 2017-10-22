var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/create', function(request, response) {
  response.render('pages/create');
});

app.get('/donate', function(request, response) {
  response.render('pages/donate');
});

app.get('/status', function(request, response) {
  response.render('pages/status');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
