//Abdulrhman
// Express, Passport, 
const express = require('express');
const passport = require('passport');

// pull in Mongoose model for examples
const WorkOrder = require('../models/workOrder');

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
 * URI:         /api/WorkOrder
 * URI:         /api/WorkOrder/5df631d5ddcfb43dd9ce75ab
 * Description: Get All WorkOrders and one
 */

router.get('/api/workorder', requireToken, (req, res) => {
    WorkOrder.find()
        .then((workOrders) => {
            res.status(200).json({ workOrders: workOrders });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});

router.get('/api/workorder/:id', requireToken, (req, res) => {
    WorkOrder.find({car: req.params.id})
        .then((workOrders) => {
            res.status(200).json({ workOrders: workOrders });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});



/**
 * Action:      CREATE new WorkOrder
 * Method:      POST
 * URI:         /api/WorkOrder
 * Description: Create a new WorkOrder
*/
router.post('/api/workorder/:id', requireToken, (req, res, next) => {
    req.body.workOrder.car = req.params.id
    WorkOrder.create(req.body.workOrder)
        .then((newWorkOrder) => {
            res.status(201).json({ workOrder: newWorkOrder });
        })
        // Catch any errors that might occur
        .catch(next)
});

/**
 * Action:      UPDATE a WorkOrder
 * Method:      patch
 * URI:         /api/WorkOrder/5df631d5ddcfb43dd9ce75ab
 * Description: Update a WorkOrder
*/
router.put('/api/workorder/:id', requireToken, removeBlanks, (req, res, next) => {
    // if the client attempts to change the `owner` property by including a new
    // owner, prevent that by deleting that key/value pair

    delete req.body.workOrder.car

    WorkOrder.findById(req.params.id)
        .then(handle404)
        .then(workOrder => {
            // pass the `req` object and the Mongoose record to `requireOwnership`
            // it will throw an error if the current user isn't the owner
            // requireOwnership(req, customer)
            // console.log(customer)

            // pass the result of Mongoose's `.update` to the next `.then`
            return workOrder.update(req.body.workOrder)
        })
        // if that succeeded, return 204 and no JSON
        .then(customer => res.status(204).json({customer: customer}))
        // if an error occurs, pass it to the handler
        .catch(next)
    })
/**
 * Action:      DESTROY
 * Method:      DELETE
* URI:          /api/WorkOrder/5df631d5ddcfb43dd9ce75ab
* Description: Delete An WorkOrder by WorkOrder ID
 */
router.delete('/api/workorder/:id', requireToken, (req, res, next) => {
    WorkOrder.findById(req.params.id)
        .then((workOrder) => {
            if (workOrder) {
                // Pass the result of Mongoose's `.delete` method to the next `.then`
                return workOrder.remove();
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
