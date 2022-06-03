
let db = require(`../model/sqlite/model.js`);


exports.goToForm = function (req, res) {
    res.render('form', {
        layout: 'bootstrap',
        style: "form.css",
        title: "Form",
        script: "form.js",
        userId: req.session.loggedUserId,
        accountType: req.session.accountType
    })
};


exports.goToFormById = function (req, res) {
    db.getEventById(req.params.id, function (err, event) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            // console.log(event);
            let error = req.session.flash.error;
            req.session.flash.error = [];
            // console.log(req.session.flash.error)
            res.render('form', {
                layout: 'bootstrap',
                style: "form.css",
                title: "Form",
                script: "form.js",
                event: event,
                id: req.params.id,
                userId: req.session.loggedUserId,
                error: error,
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
            req.flash('success', 'Η κράτηση σας καταχωρήθηκε με επιτυχία');
            res.redirect('/');
        }
    });
}


exports.checkDetails = function (req, res, next) {
    req.session.flash.error = [];
    // console.log(req.body);
    // console.log(req.params.id)
    total = 0;
    total += parseInt(req.body.kanonika);
    total += parseInt(req.body.foititika);
    total += parseInt(req.body.polytekna);
    total += parseInt(req.body.eidanagkes);
    db.getReamainingSeats(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            if (total <= result) {
                next();
            }
            else {
                req.session.flash.error.push('Δεν υπαρχουν αρκετές διαθεσιμα θέσεις');
                res.redirect('back');
            }
        }
    });
}