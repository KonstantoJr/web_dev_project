const express = require('express');
const controller = require('../controllers/controlPanel');
const loginController = require('../controllers/login');
const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/', loginController.checkAdmin, controller.getEventsByAdminId);
router.get('/delete:id', loginController.checkAdmin, controller.deleteEvent);

module.exports = router;