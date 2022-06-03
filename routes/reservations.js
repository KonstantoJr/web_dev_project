const express = require('express');
const controller = require('../controllers/reservations');

const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/', async (req, res) => {
    // console.log(req.session)
    res.render('reservations', { layout: 'bootstrap', 
    style: "reservations.css", 
    title: "Reservations", 
    script: "reservation.js",
    userId: req.session.loggedUserId,
    accountType:req.session.loggedUserType,
    })
});





module.exports = router;