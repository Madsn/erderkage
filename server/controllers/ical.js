const ical = require('ical-generator');
const Cake = require('../models/Cake');
const moment = require('moment');

const cal = ical({
  domain: 'erderkage.nu',
  prodId: {company: 'Terma A/S', product: 'Radar'},
  name: 'Kage kalender',
  url: 'https://erderkage.nu/calendar.ical',
  timezone: 'Europe/Copenhagen'
});

Cake.find({}).exec(function (err, cakes) {
  cakes.forEach(function(cake) {
    cal.createEvent({
      start: moment(cake.date),
      end: moment(cake.date).add(15, 'minutes'),
      timestamp: moment(cake.date),
      summary: cake.cake + ' (' + cake.initials + ')',
      description: cake.initials + ' giver ' + cake.cake,
      organizer: cake.initials + ' <' + cake.initials + '@terma.com>',
      busystatus: 'free',
      alarms: [
        {type: 'display', trigger: 300},
        {type: 'audio', trigger: 300}
      ]
    })
  });
});

module.exports = {
  cal
};
