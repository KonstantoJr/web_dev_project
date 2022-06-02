let db = require('../model/sqlite/model');

exports.getEvent = function (req, res) {
    db.getEvent(req.params.id, function (err, event) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            res.render('event',
                {
                    layout: 'main',
                    style: "event.css",
                    title: "Event",
                    event: event
                });
        }
    });
};