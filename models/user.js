const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
const bcrypt = require('bcryptjs');

const config = require('../config/database');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: null
    }


});


module.exports = mongoose.model('RoleUser', UserSchema);

module.exports.user = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) { throw err; } else {
                newUser.password = hash;
                newUser.save(callback);
            }
        });
    });
}