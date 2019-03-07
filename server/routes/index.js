var express = require('express');
var router = express.Router();
const ical = require('../controllers/ical');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/calendar.ical', function(req, res, next) {
  ical.cal.serve(res);
});

module.exports = router;
