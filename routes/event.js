const passport = require('passport');
const express = require('express');
const controller = require('../controllers/event');

const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/', async (req, res) => {
    res.render('event', { layout: 'main', style: "event.css", title: "Event", script: "event.js" , userId: req.session.loggedUserId,
    eventTitle:"test", eventDate: "30/05/2022", eventPlace: "Royal Theater", eventImg: "url", eventDescription: "perigrafi ths parastashs",
    eventCast: "Ηθοποιοί \n\ \n\ abgd \n\ \n\ abgd \n\ \n\ abgd \n\ \n\ abgd \n\ \n\ abgd", eventOrganizer: "ME.AS.AE"})
});


module.exports = router;


// function myFunction() {
//     console.log("aaaa");
// }