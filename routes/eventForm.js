const passport = require('passport');
const express = require('express');
const controller = require('../controllers/eventForm');

const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/', async (req, res) => {
    res.render('eventForm', { layout: 'main', style: "eventForm.css", title: "Form", script: "eventForm.js" })
});


module.exports = router;