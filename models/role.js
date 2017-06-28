const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config/database');

const RoleSchema = mongoose.Schema({
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



module.exports = mongoose.model('Role', RoleSchema);

module.exports.addrole = function(newUser, callback) {

    newUser.save(callback);

}