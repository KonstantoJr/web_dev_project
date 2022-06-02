let db = require('../model/sqlite/model');

exports.getEventById = function (req, res) {
    db.getEventById(req.params.id, function (err, event) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            event = event[0]
            event.description = event.description.split(/\n/g);
            event.organizer = event.organizer.split(/\n/g);
            event.contributor = event.contributor.split(/\n/g);
            // console.log(event.description);
            res.render('event', {
                layout: 'main',
                style: "event.css",
                title: event.name,
                eventTitle: event.name,
                eventDate: event.start_date + "\n" + event.start_time,
                eventPlace: "Royal Theater",
                eventImg: event.img,
                eventDescription: event.description,
                eventCast: event.contributor,
                eventOrganizer: event.organizer
            })
        }
    });
};