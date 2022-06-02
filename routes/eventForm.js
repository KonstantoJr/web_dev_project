const passport = require('passport');
const express = require('express');
const controller = require('../controllers/eventForm');
const loginController = require('../controllers/login');
const router = express.Router();

router.use((req, res, next) => {
    next();
});



router.get('/', loginController.checkAdmin, controller.getEventForm);

module.exports = router;