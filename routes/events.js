const passport = require('passport');
const express = require('express');
const controller = require('../controllers/events');

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/', controller.getEvents);

module.exports = router;