let db = require(`../model/sqlite/model.js`);



exports.getPopularEvents = function (req, res) {
    db.getPopularEvents(function (err, events) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            popular = {
                img1: events[0].img,
                img2: events[1].img,
                img3: events[2].img,
                id1: events[0].id,
                id2: events[1].id,
                id3: events[2].id,
                title1: events[0].name,
                title2: events[1].name,
                title3: events[2].name
            }
            res.render('home', {
                layout: 'bootstrap',
                style: "home.css",
                title: "Home",
                script: "home.js",
                userId: req.session.loggedUserId,
                accountType: req.session.loggedUserType,
                event: popular
            })
        }
    });
}

