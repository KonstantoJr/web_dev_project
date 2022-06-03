const passport = require('passport');
const express = require('express');
const controller = require('../controllers/form');
const authenticationController = require('../controllers/login');
const router = express.Router();

router.use((req, res, next) => {
    next();
});


// router.get('/', authenticationController.checkUser, controller.goToForm);
router.get('/:id', authenticationController.checkAuthenticated, authenticationController.checkUser, controller.goToFormById);
router.post('/submit/:id', authenticationController.checkAuthenticated, authenticationController.checkUser, controller.submitEvent);
module.exports = router;