const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer');
const assert = require('assert');
const User = require('../../models/user');
const Role = require('./../../models/role');
const config = require('../../config/database');

const request = require('request');

router.post('/createrole', (req, res, next) => {

    let newUser = new Role({
        role: req.body.role,
        createrole: req.body.role1,
        createuser: req.body.role2,
        uploaddata: req.body.role3,
        booking: req.body.role4,
        imageupload: req.body.role5

    });
    Role.addrole(newUser, (err, user) => {

        if (err) {
            res.json({ success: false, msg: 'Failed to register' });
        } else {

            res.json({ success: true, msg: 'Succesfully registered' });


        }

    });


});

router.get('/fetchrole', (req, res, next) => {

    var result = [];
    Role.find(function(err, data) {

        data.forEach(function(user) {
            result.push(user);
        });

        res.send(result);
    });
});


router.post('/submituser', (req, res, next) => {
    let newUser = new User({

        username: req.body.username,
        password: req.body.password,
        role: req.body.role


    });
    User.user(newUser, (err, user) => {
        console.log(err);
        if (err) {
            res.json({ success: false, msg: 'Failed to register' });
        } else {

            res.json({ success: true, msg: 'Succesfully registered' });


        }

    });


});

router.get('/fetchuserdata', (req, res, next) => {

    var result = [];
    User.find(function(err, data) {

        data.forEach(function(user) {
            result.push(user);
        });

        res.send(result);
    });
});

router.get('/fetchbooking', (req, res, next) => {

    var options = {
        url: 'https://api.mirrorsapp.in/v1/bookings',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768'
        }
    };

    request.get(options, function(err, response, body) {

        res.json({ 'status': 1, 'bookings': body });

    });



});

router.get('/confirmbookings/:id', (req, res, next) => {
    var id = req.params.id;
    var options = {

        url: 'https://api.mirrorsapp.in/v1/bookings/' + id + '/confirm',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768'
        }
    };
    request.put(options, function(err, response, body) {

        res.json(body);

    });



});

router.get('/cancelbookings/:id', (req, res, next) => {
    var id = req.params.id;
    var options = {

        url: 'https://api.mirrorsapp.in/v1/bookings/' + id + '/cancel',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768'
        }
    };

    request.put(options, function(err, response, body) {

        res.json(body);

    });
});

router.post('/uploadData', (req, res, next) => {
    var data = new Array;
    data.push(req.body);
    var abc = JSON.stringify(data);
    console.log(abc);
    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/insert',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768',
            'Content-type': 'application/json'

        },
        body: abc
    };
    request.post(options, function(err, response, body) {
        if (response.statusCode == 200) {
            console.log('Data Uploaded');
            res.json(body);
        } else(err)
        console.log(err);



    });


    router.put('/editUser/:id', (req, res, next) => {


    });

    router.put('/editRole/:id', (req, res, next) => {

    });


});

module.exports = router;