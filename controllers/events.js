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
            for (let i = 0; i < event.length; i++) {
                event[i].description = event[i].description.split(" ").slice(0, 150).join(" ") + "...";
            }
            // console.log(event[0].description);
            res.render('events', {
                layout: 'bootstrap',
                style: "events.css",
                title: "Events",
                userId: req.session.loggedUserId,
                accountType: req.session.loggedUserType,
                events: event
            })
        }
    });
}