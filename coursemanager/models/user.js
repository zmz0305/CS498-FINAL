// Load required packages
var mongoose = require('mongoose');
findOneOrCreate = require('mongoose-find-one-or-create');

// Define our beer schema
var UserSchema   = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    repo_ids: [String]
});
UserSchema.plugin(findOneOrCreate);
// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);