const passport = require('passport');
const express = require('express');
const controller = require('../controllers/event');

const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/:id', controller.getEvent);


module.exports = router;


// function myFunction() {
//     console.log("aaaa");
// }