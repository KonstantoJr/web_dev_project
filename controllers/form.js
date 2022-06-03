
let db = require(`../model/sqlite/model.js`);


exports.goToForm = function (req, res) {
    res.render('form', { layout: 'bootstrap', style: "form.css", title: "Form", script: "form.js", userId: req.session.loggedUserId })
};


exports.goToFormById = function (req, res) {
    db.getEventById(req.params.id, function (err, event) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            event = event[0];
            console.log(event);
            res.render('form', {
                layout: 'main',
                style: "form.css",
                title: "Form",
                script: "form.js",
                event: event
            })
        }
    });
}