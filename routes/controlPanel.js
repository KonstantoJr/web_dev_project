const express = require('express');
const controller = require('../controllers/controlPanel');
const loginController = require('../controllers/login');
const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/', loginController.checkAuthenticated, loginController.checkAdmin, controller.getEventsByAdminId);
router.get('/delete/:id', loginController.checkAuthenticated, loginController.checkAdmin, controller.deleteEvent);
router.get('/edit/:id', loginController.checkAuthenticated, loginController.checkAdmin, controller.getEditById);
router.get('/reservations/:id', loginController.checkAuthenticated, loginController.checkAdmin, controller.getReservationsById);
router.post('/update/:id', loginController.checkAuthenticated, loginController.checkAdmin, controller.updateEvent);

module.exports = router;