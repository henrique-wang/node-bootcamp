const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// It is implicited that checkTourId params are (req, res, next, val)
router.param('id', tourController.checkTourId);

router.route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router.route('/:id')
    .get(tourController.getTourById)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;