const passport = require('passport');
const express = require('express');
const controller = require('../controllers/form');
const authenticationController = require('../controllers/login');
const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/', authenticationController.checkAuthenticated, controller.goToForm);

module.exports = router;