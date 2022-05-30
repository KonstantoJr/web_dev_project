const passport = require('passport');
const express = require('express');
const controller = require('../controllers/login');

const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/', async (req, res) => {

    res.render('login', { layout: 'main', style: "login.css", title: "Login", script: "login.js" })
});


module.exports = router;