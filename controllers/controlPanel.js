let db = require('../model/sqlite/model');

exports.getEventsByAdminId = function (req, res) {
    // console.log(req.session.loggedUserId);
    db.getEventsByAdminId(req.session.loggedUserId, function (err, events) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            let event = [];
            for (let i = 0; i < events.length; i++) {
                if (events[i]) {
                    event.push(events[i]);
                }
            }
            // console.log(event);
            res.render('controlPanel', {
                layout: 'bootstrap',
                style: "controlPanel.css",
                title: "ControlPanel",
                userId: req.session.loggedUserId,
                events: event,
                admin: 'exists',
                userId: req.session.loggedUserId,
                accountType: req.session.loggedUserType
            })
        }
    });
}

exports.deleteEvent = function (req, res) {
    // console.log(req.params.id);
    db.deleteEvent(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            res.redirect('/controlPanel');
        }
    });
}


exports.getEditById = function (req, res) {
    db.getEventById(req.params.id, function (err, event) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            console.log(event);
            res.render('eventForm', {
                layout: 'main',
                style: "eventForm.css",
                title: "Event Form",
                script: "eventForm.js",
                userId: req.session.loggedUserId,
                accountType: req.session.loggedUserType,
            });
        }
    });
}

exports.getReservationsById = function (req, res) {

}

exports.editEvent = function (req, res) {

}