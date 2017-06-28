const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
const bcrypt = require('bcryptjs');

const config = require('../config/database');

const UserSchema = mongoose.Schema({
    role: {
        type: String,
        default: null
    },
    createrole: {
        type: Boolean,
        default: false
    },
    createuser: {
        type: Boolean,
        default: false
    },
    uploaddata: {
        type: Boolean,
        default: false
    },
    booking: {
        type: Boolean,
        default: false
    },
    imageupload: {
        type: Boolean,
        default: false
    },
    status: {
        type: Number,
        default: 1
    }


});

const DataSchema = mongoose.Schema({
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


const Role = module.exports = mongoose.model('database', UserSchema);

const User = module.exports = mongoose.model('users', DataSchema);


module.exports.user = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}


module.exports.addrole = function(newUser, callback) {

    newUser.save(callback);

}