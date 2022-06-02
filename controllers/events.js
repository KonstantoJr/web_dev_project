let db = require('../model/sqlite/model');

exports.getEvents = function (req, res) {
    db.getEvents(function (err, events) {
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
            res.render('events', {
                layout: 'bootstrap',
                style: "events.css",
                title: "Events",
                userId: req.session.loggedUserId,
                events: event
            })
        }
    });
}