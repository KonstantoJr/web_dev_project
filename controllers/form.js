
let model = require(`../model/sqlite/model.js`);


exports.goToForm = function (req, res) {
    res.render('form', { layout: 'bootstrap', style: "form.css", title: "Form", script: "form.js", userId: req.session.loggedUserId})
};


