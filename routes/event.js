const passport = require('passport');
const express = require('express');
const controller = require('../controllers/event');

const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/', async (req, res) => {
    res.render('event', { layout: 'main', style: "event.css", title: "Event", script: "event.js" , event:"test"})
});


module.exports = router;