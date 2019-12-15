//Abdulrhman
// Express, Passport, 
const express = require('express');
const passport = require('passport');

// pull in Mongoose model for examples
const Shop = require('../models/shop');

// See details in example_reoutes.js
const customErrors = require('../../lib/custom_errors');
const handle404 = customErrors.handle404;
const requireOwnership = customErrors.requireOwnership;
const removeBlanks = require('../../lib/remove_blank_fields');
const requireToken = passport.authenticate('bearer', { session: false });

// instantiate a router (mini app that only handles routes)
const router = express.Router();



module.exports = router;