const db = require('../model/sqlite/model');


exports.getEventForm = (req, res) => {
    res.render('eventForm', {
        layout: 'main',
        style: "eventForm.css",
        title: "Event Form",
        script: "eventForm.js",
        userId: req.session.loggedUserId
    });
}