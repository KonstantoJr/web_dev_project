const passport = require('passport');
const express = require('express');
const controller = require('../controllers/eventForm');

const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/', async (req, res) => {
    // console.log(req.session)
    res.render('events', { layout: 'bootstrap', style: "events.css", title: "Events", script: "events.js",userId: req.session.loggedUserId,
     events:[
         {  
             id : 1,
             title:"malakies", 
             date:"30/06/2022",
             description: "irvl"
            }
        ]
    })
});


module.exports = router;