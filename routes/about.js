const express = require('express');
const controller = require('../controllers/about');

const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/', async (req, res) => {
    // console.log(req.session)
<<<<<<< HEAD
    res.render('about', { layout: 'main', style: "about.css", title: "About", script: "about.js" })
});
=======
    res.render('about', { layout: 'bootstrap', style: "about.css", title: "About", script: "about.js"})});
>>>>>>> 9063e12ed60bb7ed7344e82e6811f2bf6db0f1bf





module.exports = router;