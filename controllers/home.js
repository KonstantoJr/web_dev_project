let db = require(`../model/sqlite/model.js`);



exports.getPopularEvents = function (req, res) {
    db.getPopularEvents(function (err, events) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            let popular = {
                id: [],
                img: [],
                title: []
            }
            for (let i in events) {
                popular.id.push(events[i].id);
                popular.img.push(events[i].img);
                popular.title.push(events[i].name)
            }
            if (req.session.loggedUserId) {
                var success = req.session.flash.success;
                req.session.flash.success = [];
            }
            else {
                var success = null;
            }
            // console.log(popular)
            res.render('home', {
                layout: 'bootstrap',
                style: "home.css",
                title: "Home",
                script: "home.js",
                userId: req.session.loggedUserId,
                accountType: req.session.loggedUserType,
                event: popular,
                success: success
            })
        }
    });
}

