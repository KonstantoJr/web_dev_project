let db = require('../model/sqlite/model');

exports.getEventById = function (req, res) {
    db.getEventById(req.params.id, function (err, event) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            event.description = event.description.split(/\n/g);
            event.organizer = event.organizer.split(/\n/g);
            event.contributor = event.contributor.split(/\n/g);
            // console.log(event.description);
            // console.log(event);
            res.render('event', {
                layout: 'bootstrap',
                style: "event.css",
                userId: req.session.loggedUserId,
                accountType: req.session.loggedUserType,
                title: event.name,
                eventTitle: event.name,
                eventDate: event.start_date + "\n" + event.start_time,
                eventPlace: "Royal Theater",
                eventImg: event.img,
                eventDescription: event.description,
                eventCast: event.contributor,
                eventOrganizer: event.organizer,
                id: req.params.id,
                eventPrice: event.price,
                eventPlace: event.location,
                eventPhone: event.phone,
                eventTotalSeats: event.total_seats,
                eventRemainingSeats: event.remaining_seats
            })
        }
    });
};