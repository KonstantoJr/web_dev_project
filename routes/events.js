const passport = require('passport');
const express = require('express');
const controller = require('../controllers/eventForm');

const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/', async (req, res) => {
    res.render('events', { layout: 'main', style: "events.css", title: "Events", script: "events.js" })
});


module.exports = router;