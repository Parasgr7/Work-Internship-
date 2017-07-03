const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const bodyParser = require('body-parser');
const multer = require('multer');
const assert = require('assert');
const User = require('../../models/user');
const Role = require('./../../models/role');
const config = require('../../config/database');

var querystring = require('querystring');
const request = require('request');

/*
router.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "https://localhost:4200");
    res.header("Access-Control-Allow-Origin", "httpss://api.mirrorsapp.in/v1/bookings");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
*/





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
            res.send(body);
        } else(err)
        console.log(err);



    });



});

router.post('/fetchMerchant', (req, res, next) => {
    console.log('yes');
    var data = querystring.stringify({
        name: req.body.name
    });
    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/fetch',
        headers: {
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768',
            'Content-type': ' application/x-www-form-urlencoded',
            'Content-length': data.length

        },
        body: data
    };
    request.post(options, function(err, response, body) {
        if (response) {
            console.log('Merchant Found');
            res.send(body);
        } else(err)
        console.log(err);


    });


});
router.post('/addPackage/:id', (req, res, next) => {

    var data = querystring.stringify({
        name: req.body.name,
        original_price: req.body.original_price,
        discounted_price: req.body.discounted_price
    });
    console.log(data);
    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/' + req.params.id + '/packages',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768',
            'Content-type': ' application/x-www-form-urlencoded',
            'Content-length': data.length

        },
        body: data
    };
    request.post(options, function(err, response, body) {
        if (response) {
            console.log('Merchant Found');
            res.send(body);
        } else(err)
        console.log(err);


    });



});



router.get('/getPackage/:id', (req, res, next) => {

    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/' + req.params.id + '/packages',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768'

        }
    };
    request.get(options, function(err, response, body) {
        if (response) {
            console.log('Packages found:');
            res.send(body);
        } else(err)
        console.log(err);


    });


});



router.get('/deletePackage/:id/:id1', (req, res, next) => {

    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/' + req.params.id1 + '/packages/' + req.params.id,
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768'

        }
    };
    request.delete(options, function(err, response, body) {
        if (response) {
            console.log('Packages Deleted Succesfully');
            res.send(body);
        } else(err)
        console.log(err);


    });


});


router.get('/getMerchant/:id', (req, res, next) => {

    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/' + req.params.id,
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768'

        }
    };
    request.get(options, function(err, response, body) {
        if (response) {
            console.log('Merchant fetched');
            res.send(body);
        } else(err)
        console.log(err);


    });
});


router.post('/updateGst/:id', (req, res, next) => {


    var abc = JSON.stringify(req.body);
    console.log(abc);
    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/' + req.params.id + '/updateGst',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768',
            'Content-type': 'application/json'

        },
        body: abc
    };
    request.put(options, function(err, response, body) {
        if (response) {
            console.log('GST Package Updated');
            res.send(body);
        } else(err)
        console.log(err);


    });
});


router.post('/updateExc/:id', (req, res, next) => {

    var abc = JSON.stringify(req.body);
    console.log(abc);

    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/' + req.params.id + '/updateExc',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768',
            'Content-type': 'application/json'

        },
        body: abc
    };

    request.put(options, function(err, response, body) {
        if (response) {
            console.log('Exclusive Offer Updated');
            res.send(body);
        } else(err)
        console.log(err);


    });

});

module.exports = router;