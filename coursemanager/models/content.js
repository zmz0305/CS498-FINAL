// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var ContentSchema   = new mongoose.Schema({
    name: String,
    url: String,
    position: String
});

// Export the Mongoose model
module.exports = mongoose.model('Content', ContentSchema);