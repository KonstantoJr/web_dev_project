const passport = require('passport');
const express = require('express');
const controller = require('../controllers/eventForm');
const loginController = require('../controllers/login');
const router = express.Router();

router.use((req, res, next) => {
    next();
});



router.get('/', loginController.checkAuthenticated, loginController.checkAdmin, controller.getEventForm);
router.post('/submit', loginController.checkAuthenticated, loginController.checkAdmin, controller.submitEvent);

module.exports = router;