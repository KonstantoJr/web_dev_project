const express = require('express');
const req = require('express/lib/request');


const router = express.Router();

const loginRouter = require('./login.js');
const eventRouter = require('./event.js');
const formRouter = require('./form.js');
const aboutRouter = require('./about.js');
const eventFormRouter = require('./eventForm.js');
const eventsRouter = require('./events.js');
const controlPanelRouter = require('./controlPanel.js');


router.use((req, res, next) => {
    next();
});



//Rest Routes
router.use('/login', loginRouter);
router.use('/event', eventRouter);
router.use('/form', formRouter);
router.use('/about', aboutRouter);
router.use('/eventForm', eventFormRouter);
router.use('/events', eventsRouter);
router.use('/controlPanel', controlPanelRouter);

// Home page router
router.get('/', async (req, res) => {
    // console.log(req.session);
    res.render('home', { layout: 'main', style: "home.css", title: "Home", script: "home.js", userId: req.session.loggedUserId })
});

router.get('*', function (req, res) {
    res.send('Sorry, this is an invalid URL.');
});

module.exports = router;