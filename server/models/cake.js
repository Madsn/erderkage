const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CakeSchema = new Schema({
  initials: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  cake: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    trim: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: String,
    required: true,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Cake = mongoose.model('Cake', CakeSchema);

module.exports = Cake;
