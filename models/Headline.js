var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var headlineSchema = new Schema({

  headline: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },

  summary: {
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },
  saved: {
    type: Boolean,
    default: false
  }
});


var Headline = mongoose.model("Headline", headlineSchema);

// Export the Headline model
module.exports = Headline;
