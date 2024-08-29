const mongoose = require('mongoose');

const starSchema = new mongoose.Schema({
  totalStars: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 }
});

const Star = mongoose.model('Star', starSchema);

module.exports = Star;
