const express = require('express');
const req = require('express/lib/request');


const router = express.Router();

const loginRouter = require('./login.js');
const eventRouter = require('./event.js');
const formRouter = require('./form.js');
const eventFormRouter = require('./eventForm.js');

router.use((req, res, next) => {
    next();
});



//Rest Routes
router.use('/login', loginRouter);
router.use('/event', eventRouter);
router.use('/form', formRouter);
router.use('/eventForm', eventFormRouter);
// Home page router
router.get('/', async (req, res) => {
    res.render('home', { layout: 'main', style: "home.css", title: "Home", script: "home.js" })
});

module.exports = router;