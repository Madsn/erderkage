const Cake = require('../models/cake');
const ical = require('../controllers/ical');
const moment = require('moment');

const timeout = process.env.API_DELAY;

function createCake (req, res) {
  const cake = new Cake(req.body);
  ical.cal.createEvent({
    start: moment.unix(cake.timestamp),
    end: moment.unix(cake.timestamp).add(15, 'minutes'),
    timestamp: moment.unix(cake.timestamp),
    summary: cake.cake + ' (' + cake.initials + ')',
    description: cake.initials + ' giver ' + cake.cake + ' // erderkage.nu',
    organizer: cake.initials + ' <' + cake.initials + '@terma.com>',
    busystatus: 'free',
    alarms: [
      {type: 'display', trigger: 300},
      {type: 'audio', trigger: 300}
    ]
  });
  cake.save()
    .then((cake) => res.status(201).json(cake))
    .catch((err) => res.status(400).send())
}

function likeCake (req, res) {
  Cake.findByIdAndUpdate({_id: req.body._id }, { $inc: { claps: 1 } })
    .then((cake) => res.status(200).json(cake))
    .catch((err) => res.status(404).send())
}

function readCakes (req, res) {
  Cake.find({}).sort({'timestamp': 'desc'})
    .then((cakes) => res.status(200).json(cakes))
    .catch((err) => res.status(404).send())
}

function updateCake (req, res) {
  Cake.findByIdAndUpdate(req.body._id, req.body)
    .then((cake) => res.status(200).json(cake))
    .catch((err) => res.status(404).send())
}

function deleteCake (req, res) {
  Cake.findByIdAndRemove(req.params.id)
    .then((cake) => res.status(200).json(cake))
    .catch((err) => res.status(404).send())
}

function getHighscores (req, res) {
    Cake.aggregate([
        { $match : { 'date': {$lt: new Date()}} },
        { $group : {_id : '$initials', count : {$sum : 1} }
      }])
      .sort({'count': 'desc'})
      .limit(5)
      .then((count) => res.status(200).json(count))
      .catch((err) => res.status(404).send())
}

function getUpcoming (req, res) {
  Cake.find({"date": {"$gte": new Date().setTime(0)}}).sort({'timestamp': 'asc'})
    .then((cakes) => res.status(200).json(cakes))
    .catch((err) => res.status(404).send())
}

module.exports = {
  createCake,
  likeCake,
  readCakes,
  updateCake,
  deleteCake,
  getHighscores,
  getUpcoming
};
