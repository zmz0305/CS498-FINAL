// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var RepositorySchema   = new mongoose.Schema({
    name: String,
    url: String,
    contents: [String]
});

// Export the Mongoose model
module.exports = mongoose.model('Repository', RepositorySchema);