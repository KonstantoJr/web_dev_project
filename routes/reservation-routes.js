'use strict';

const express = require('express');
// const passport = require('passport');
const app = require('../app');
const router = express.Router();
// const grouperController = require('../controller/grouper-controller');



router.use(express.urlencoded({ extended: true }));

// users Level
// router.get('/users/login', grouperController.checkAuthenticated, grouperController.loginUser)
// router.get('/users/dashboard', grouperController.checkNotAuthenticated, grouperController.dashboardUser)
// router.post('/users/register', grouperController.registerUser)
// router.get('/users/logout', grouperController.logoutUser)

// dashboard Level
// router.post('/dashboard/create', grouperController.createTeam)
// router.post('/dashboard/join', grouperController.joinTeam)


// main level
// router.get('/grouper/:Team_Name', grouperController.checkNotAuthenticated, grouperController.grouperMainPage)
// router.get('/grouper/:Team_Name/readCard', grouperController.checkNotAuthenticated, grouperController.readCard)

// changes
// router.post('/grouper/:Team_Name/newCard', grouperController.checkNotAuthenticated, grouperController.newCard)
// router.get('/grouper/:Team_Name/saveDetails', grouperController.checkNotAuthenticated, grouperController.saveDetails)
// router.post('/grouper/:Team_Name/dragCard', grouperController.checkNotAuthenticated, grouperController.dragCard)
// router.post('/grouper/:Team_Name/changeColor', grouperController.checkNotAuthenticated, grouperController.changeColor)
// router.post('/grouper/:Team_Name/moveCard', grouperController.checkNotAuthenticated, grouperController.moveCard)
// router.post('/grouper/:Team_Name/copyCard', grouperController.checkNotAuthenticated, grouperController.copyCard)
// router.post('/grouper/:Team_Name/plusBoard', grouperController.checkNotAuthenticated, grouperController.plusBoard)
// router.post('/grouper/:Team_Name/deleteCard', grouperController.checkNotAuthenticated, grouperController.deleteCard)
// router.post('/grouper/:Team_Name/leaveTeam', grouperController.checkNotAuthenticated, grouperController.leaveTeam)

module.exports = router;