
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
            // console.log(event);
            res.render('form', {
                layout: 'bootstrap',
                style: "form.css",
                title: "Form",
                script: "form.js",
                event: event,
                id: req.params.id,
                userId: req.session.loggedUserId
            })
        }
    });
}

exports.submitEvent = function (req, res) {
    // console.log(req.body);
    // console.log(req.session.loggedUserId);
    // console.log(req.session);
    let date = new Date();
    let dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    form = {
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        userId: req.session.loggedUserId,
        date: dateString,
        seats: "Normal:" + req.body.kanonika + ";Foititika:" + req.body.foititika + ';Poluteknika:' + req.body.polytekna + ';AMEA:' + req.body.eidanagkes
    }
    db.submitEvent(form, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            res.redirect('/');
        }
    });
}