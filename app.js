const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Import Route
const server = require('./routes/server');

router.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
});

app.use('/', server);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});