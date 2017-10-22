var express = require('express');
var bodyParser = require('body-parser');
var models = require('./models.js').getModels();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/challenge/2', function(request, response) {
    models.then(ms => {
        return ms.Donations.findAll({where: {challenge_id: '2'}});
    }).then((donations) => {
        console.log(donations);
        response.render('pages/hardcodeddetail', {
            donations: donations
        });
    });
});

app.post('/challenge/2/donate', function(request, response) {
    models.getModels().then(ms => {
        return ms.Donations.create({
            challenge_id: 2,
            name: "Daniel Pyrathon",
            amount: 10
        });
    }).then(() => {
        return response.redirect('/challenge/2');
    });
});

app.post('/create', function(request, response) {
});

app.get('/donate', function(request, response) {
  response.render('pages/donate');
});

app.get('/status', function(request, response) {
  response.render('pages/status');
});

app.post('/challenge', function(request, response) {
  console.log(request.body);
  var form = request.body;
  models.then(models => {
    models.Challenge.create({
      title: form.challengeName
    })
      .then(r => response.render('pages/detail', {
        title: form.challengeName,
        donations: []
      }))
      .catch(err => console.log(err))
  }).catch(err => console.log(err));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
