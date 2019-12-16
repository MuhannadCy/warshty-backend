//Abdulrhman
// Express, Passport, 
const express = require('express');
const passport = require('passport');

// pull in Mongoose model for examples
const Car = require('../models/car');

// See details in example_reoutes.js
const customErrors = require('../../lib/custom_errors');
const handle404 = customErrors.handle404;
const requireOwnership = customErrors.requireOwnership;
const removeBlanks = require('../../lib/remove_blank_fields');
const requireToken = passport.authenticate('bearer', { session: false });

// instantiate a router (mini app that only handles routes)
const router = express.Router();


/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/car
 * URI:         /api/car/5df631d5ddcfb43dd9ce75ab
 * Description: Get All Cars and one
 */

router.get('/api/car', requireToken, (req, res) => {
    Car.find()
        .then((cars) => {
            res.status(200).json({ cars: cars });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});

router.get('/api/car/:id', requireToken, (req, res) => {
    Car.findById(req.params.id)
        .then((car) => {
            res.status(200).json({ car: car });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});



/**
 * Action:      CREATE new car
 * Method:      POST
 * URI:         /api/car
 * Description: Create a new Car
*/
router.post('/api/car', requireToken, (req, res, next) => {
    Car.create(req.body.car)

        .then((newCar) => {
            res.status(201).json({ car: newCar });
        })
        // Catch any errors that might occur
        .catch(next)
});

/**
 * Action:      UPDATE a car
 * Method:      patch
 * URI:         /api/car/5df631d5ddcfb43dd9ce75ab
 * Description: Update a Car
*/
router.patch('/api/car/:id', requireToken, removeBlanks, (req, res, next) => {

    delete req.body.car.owner
    Car.findById(req.params.id)
        .then(car => {
            requireOwnership(req, car)
            return car.update(req.body.car)
        })
        .then(() => res.status(204))
        .catch(next)
});

/**
 * Action:      DESTROY
 * Method:      DELETE
* URI:          /api/car/5df631d5ddcfb43dd9ce75ab
* Description: Delete An car by Car ID
 */
router.delete('/api/car/:id', requireToken, (req, res, next) => {
    Car.findById(req.params.id)
        .then((car) => {
            if (car) {
                // Pass the result of Mongoose's `.delete` method to the next `.then`
                return car.remove();
            } else {
                // If we couldn't find a document with the matching ID
                res.status(404).json({ error: error });
            }
        })
        .then(() => {
            // If the deletion succeeded, return 204 and no JSON
            res.status(204).end();
        })
        // Catch any errors that might occur
        .catch(next)
});


module.exports = router;