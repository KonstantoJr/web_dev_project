const db = require('../model/sqlite/model');


exports.getEventForm = (req, res) => {
    res.render('eventForm', {
        layout: 'main',
        style: "eventForm.css",
        title: "Event Form",
        script: "eventForm.js",
        userId: req.session.loggedUserId,
        accountType: req.session.loggedUserType
    });
}


exports.submitEvent = function (req, res) {
    // console.log(req.body);
    // console.log(req.session.loggedUserId);
    form = {
        name: req.body.eventTitle,
        description: req.body.eventDescriptionText,
        seats: req.body.seats,
        organizer: req.body.eventOrganizer,
        duration: req.body.eventDuration,
        admin: req.session.loggedUserId,
        startDate: req.body.eventDate,
        startTime: req.body.eventTime,
        image: req.body.image,
        contributors: req.body.eventPeopleText,
        price: req.body.eventPrice,
        phone: req.body.phone,
        location: req.body.eventLocation,
    }
    // console.log(form);
    db.newEvent(form, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            res.redirect('/controlPanel');
        }
    });
}