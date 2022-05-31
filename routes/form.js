const passport = require('passport');
const express = require('express');
const controller = require('../controllers/form');

const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/', async (req, res) => {
    res.render('form', { layout: 'main', style: "form.css", title: "Form", script: "form.js" })
});


module.exports = router;