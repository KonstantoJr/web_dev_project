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

let changeDateFormat = function (date) {
    if (date.indexOf('/') > -1) {
        let newDate = date.split('/');
        return newDate[2] + "-" + newDate[1] + "-" + newDate[0];
    }
    else {
        return date;
    }
}

exports.getEditById = function (req, res) {
    db.getEventById(req.params.id, function (err, event) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            // console.log(event);
            event.start_date = changeDateFormat(event.start_date);
            res.render('editForm', {
                layout: 'main',
                style: "editForm.css",
                title: "Update Event",
                userId: req.session.loggedUserId,
                accountType: req.session.loggedUserType,
                event: event,
                id: req.params.id
            });
        }
    });
}

exports.updateEvent = function (req, res) {
    form = {
        id: req.params.id,
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
    db.updateEvent(form, function (err, result) {

        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            res.redirect('/controlPanel');
        }
    });
}

exports.getReservationsById = function (req, res) {

}
