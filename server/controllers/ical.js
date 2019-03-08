const ical = require('ical-generator');
const Cake = require('../models/cake');
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
      start: moment.unix(cake.timestamp),
      end: moment.unix(cake.timestamp).add(15, 'minutes'),
      timestamp: moment.unix(cake.timestamp),
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
