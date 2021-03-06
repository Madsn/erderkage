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
  timestamp: {
    type: Number,
    required: true
  },
  claps: {
    type: Number,
    default: 0
  }
});

const Cake = mongoose.model('Cake', CakeSchema);

module.exports = Cake;
