const passport = require('passport');
const express = require('express');
const controller = require('../controllers/login');

const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/', async (req, res) => {
    // console.log(res.statusCode)
    res.render('login', {
        layout: 'main',
        style: "login.css",
        title: "Login",
        script: "login.js",
        userId: req.session.loggedUserId,
        accountType: req.session.loggedUserType
    })
});

router.post('/user', controller.checkAuthenticated, controller.doLogin);

router.post('/register', controller.checkAuthenticated, controller.doRegister);

router.get('/logout', controller.checkAuthenticated, controller.doLogout);

module.exports = router;    