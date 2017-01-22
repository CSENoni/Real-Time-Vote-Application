var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
    title: String,
    description: String,
    label: [String],
    data: [Number]
});

module.exports = mongoose.model("Poll", pollSchema);