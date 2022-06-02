let db = require('../model/sqlite/model');

exports.getEventsByAdminId = function (req, res) {
    console.log(req.session.loggedUserId);
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
                events: event
            })
        }
    });
}