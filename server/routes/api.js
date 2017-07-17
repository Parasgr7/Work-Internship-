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

var google = require('googleapis');
var sheets = google.sheets('v4');
var authentication = require('./../../authentication');


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
    const alt = req.body;
    if (req.body.contact.email == null) {
        delete req.body.contact.email;
    }
    if (req.body.work_hours.holiday == null) {
        delete req.body.work_hours.holiday;
    }


    function appendData(auth) {
        sheets.spreadsheets.values.append({
            auth: auth,
            spreadsheetId: '1yoxb3l-Jf6M5xEe_lZaQeSkkbDO5LeodKEbY2S0Eht4',
            range: "'Live Client Details'!A620", //Change Sheet1 if your worksheet's name is something else
            valueInputOption: true, // TODO: Update placeholder value.
            insertDataOption: 'INSERT_ROWS', // TODO: Update placeholder value.
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [alt.name,
                        alt.loc.coordinates[0] + ';' + alt.loc.coordinates[1],
                        alt.contact.email,
                        alt.contact.website,
                        alt.contact.phone_number,
                        alt.contact.contact_no,
                        alt.address.shop_no,
                        alt.address.street,
                        alt.address.locality,
                        alt.address.city,
                        alt.address.state,
                        alt.address.pincode,
                        alt.information.cost_rating,
                        alt.information.facilities[0],
                        alt.information.gender,
                        alt.information.head.name,
                        alt.information.head.designation,
                        alt.information.services[0],
                        alt.work_hours.opening_time,
                        alt.work_hours.closing_time,
                        alt.work_hours.holiday,
                        alt.discount.percentage,
                        alt.discount.condition,
                        alt.special_offers[0],

                    ]

                ]
            }
        }, (err, response) => {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            } else {
                console.log("Appended");
            }
        });
    }




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
        console.log(response.statusCode)
        if (response.statusCode == 200) {
            console.log('Data Uploaded');
            authentication.authenticate().then((auth) => {
                appendData(auth);

            });
            res.send(body);
        } else(err)
        console.log(err);



    });



});

router.post('/fetchMerchant', (req, res, next) => {
    console.log('yes');
    var data = querystring.stringify({
        name: req.body.search
    });
    console.log(data);
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



router.get('/getGST/:id', (req, res, next) => {

    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/' + req.params.id + '/getGST',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768',
            'Content-type': 'application/json'

        }
    };

    request.get(options, function(err, response, body) {
        if (response) {
            console.log('Fetched GST Offer ');
            res.send(body);
        } else(err)
        console.log(err);


    });

});


router.get('/fetchNoti', (req, res, next) => {

    var options = {
        url: 'https://api.mirrorsapp.in/v1/notification/join',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768'
        }
    };

    request.get(options, function(err, response, body) {

        res.send(body);

    });



});


router.get('/getUser/:id', (req, res, next) => {

    var options = {
        url: 'https://api.mirrorsapp.in/v1/users/' + req.params.id,
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768'
        }
    };

    request.get(options, function(err, response, body) {

        res.send(body);

    });



});



router.post('/pushNotif', (req, res, next) => {



    var data = querystring.stringify({
        firebase_token: req.body.key,
        type: req.body.info.type,
        offer_title: req.body.info.offer_title,
        offer_desc: req.body.info.offer_desc,
        image_url: req.body.info.data.image_url,
        landing_type: req.body.info.data.landing_type,
        offer_btn_title: req.body.info.offer_btn_title,
        redirect_screen: req.body.info.redirect_screen,
        event_id: req.body.info.event_id,
        event_name: req.body.info.event_name,
        message: req.body.info.message,
        title: req.body.info.title
    });
    console.log(data);

    var options = {
        url: 'https://api.mirrorsapp.in/v1/fcm/send',
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
            console.log('Notification send');
            res.send(body);
        } else(err)
        console.log(err);

    });



});



router.post('/addBanner', (req, res, next) => {

    if (req.body.loc.coordinates != null) {
        delete req.body['merchants'];
    } else {
        delete req.body['loc'];
    }

    const abc = JSON.stringify(req.body);
    console.log(abc);
    var options = {
        url: 'https://api.mirrorsapp.in/v1/events/',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768',
            'Content-type': 'application/json'
        },
        body: abc
    };

    request.post(options, function(err, response, body) {


        if (response) {
            console.log('Banner Uploaded');
            res.send(body);
        } else(err)
        console.log(err);

    });



});



router.post('/uploadEditData/:id', (req, res, next) => {
    if (req.body.work_hours.holiday == null) {
        delete req.body.work_hours.holiday;
    }
    if (req.body.contact.phone_number == "" || req.body.contact.phone_number == null) {
        var arr = new Array;
        req.body.contact.phone_number = arr;
    }
    if (req.body.contact.contact_no == "" || req.body.contact.contact_no == null) {
        var arr = new Array;
        req.body.contact.contact_no = arr;
    }
    console.log(arr);


    if (req.body.special_offers == "") {
        var arr = new Array;
        req.body.special_offers = arr;
    }

    var abc = JSON.stringify(req.body);
    console.log(abc);
    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/' + req.params.id,
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768',
            'Content-type': 'application/json'

        },
        body: abc
    };
    request.put(options, function(err, response, body) {
        if (response.statusCode == 200) {
            console.log('Data Edited');
            res.send(body);
        } else(err)
        console.log(err);



    });



});



router.post('/multiple/:id', (req, res, next) => {

    var data = JSON.stringify(req.body);
    console.log(data);
    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/' + req.params.id + '/images',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768',
            'Content-type': ' application/json'
        },
        body: data
    };
    request.post(options, function(err, response, body) {
        if (response) {
            console.log('Multiple Images Uploaded');
            res.send(body);
        } else(err)
        console.log(err);


    });
});

router.post('/rateCard/:id', (req, res, next) => {

    var data = JSON.stringify(req.body);
    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/' + req.params.id + '/rateImages',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768',
            'Content-type': ' application/json'
        },
        body: data
    };
    request.post(options, function(err, response, body) {
        if (response) {
            console.log('Rate Card Uploaded');
            res.send(body);
        } else(err)
        console.log(err);


    });
});

router.post('/logo/:id', (req, res, next) => {

    var data = JSON.stringify(req.body);
    console.log(data);
    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/' + req.params.id + '/addLogo',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768',
            'Content-type': ' application/json'
        },
        body: data
    };
    request.post(options, function(err, response, body) {
        if (response) {
            console.log('Logo Uploaded');
            res.send(body);
        } else(err)
        console.log(err);


    });
});



router.post('/cover/:id', (req, res, next) => {

    var data = JSON.stringify(req.body);
    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/' + req.params.id + '/addCover',
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768',
            'Content-type': ' application/json'
        },
        body: data
    };
    request.post(options, function(err, response, body) {
        if (response) {
            console.log('Cover Uploaded');
            res.send(body);
        } else(err)
        console.log(err);


    });
});


router.get('/deleteMerchant/:id', (req, res, next) => {

    var options = {

        url: 'https://api.mirrorsapp.in/v1/merchants/' + req.params.id,
        headers: {
            'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODkzMmZmOGY3ODgyNDAwMTE3MGJlZTEiLCJ1cGRhdGVkX2F0IjoiMjAxNy0wMi0wMlQxMzoxMToyMC4zNTZaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDItMDJUMTM6MTE6MjAuMzU2WiIsIl9fdiI6MCwiYWRtaW4iOnRydWUsImdvb2dsZSI6eyJhdWQiOiI4MDQ2MTk2NzE4ODQiLCJlbWFpbCI6InBhcmljaGl0Lmt1bWFya0BnbWFpbC5jb20iLCJpZCI6IjEwNDQwMDUxMTg2MjM0OTAyMDM0MiJ9LCJ1c2VyX2lkIjoiNTg5MzJmZjhmNzg4MjQwMDExNzBiZWUyIiwiaWF0IjoxNDg2MTIzMjQzfQ._CrGlCixzYJILij08cjJFfRQFlualDJn1T_UlP95p8Y',
            'api_key': 'c6578964530bc5c55152c440ac3399c89243b768'

        }
    };
    request.delete(options, function(err, response, body) {
        if (response) {
            console.log('Merchant have been Deleted Succesfully');
            res.send(body);
        } else(err)
        console.log(err);


    });


});


module.exports = router;