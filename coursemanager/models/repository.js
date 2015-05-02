// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var RepositorySchema   = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    contents: [String]
});

// Export the Mongoose model
module.exports = mongoose.model('Repository', RepositorySchema);