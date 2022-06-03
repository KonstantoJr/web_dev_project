const express = require('express');
const controller = require('../controllers/about');

const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/', async (req, res) => {
    // console.log(req.session)
    res.render('about', { layout: 'bootstrap', 
    style: "about.css", 
    title: "About", 
    script: "about.js",
    userId: req.session.loggedUserId,
    accountType:req.session.loggedUserType,
    })
});





module.exports = router;