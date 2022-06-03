const express = require('express');
const controller = require('../controllers/reservations');
const loginController = require('../controllers/login');
const router = express.Router();

router.use((req, res, next) => {
    next();
});


router.get('/:id', loginController.checkAuthenticated, loginController.checkAdmin, controller.getReservations);





module.exports = router;