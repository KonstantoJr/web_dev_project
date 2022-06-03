const db = require('../model/sqlite/model');

exports.getReservations = function (req, res) {
    db.getReservations(req.params.id, (err, reservations, event) => {
        if (err) {
            console.error('error: ' + err);
            res.redirect('/login');
        }
        else {
            const priceRatios = [1, 0.5, 0.5, 0.3]
            const seatNames = ['Κανονικά', 'Φοιτητικά', 'Πολύτεκνα', 'ΑΜΕΑ']
            const totalReservations = reservations.length;
            for (let i = 0; i < reservations.length; i++) {
                let seats = reservations[i].number_of_seats.split(";");
                let curSeats = [];
                let price = 0
                for (let j = 0; j < seats.length; j++) {
                    curSeats.push(seatNames[j] + ': ' + seats[j].split(':')[1]);
                    price += parseInt(seats[j].split(':')[1]) * priceRatios[j] * event.price
                }
                reservations[i].tickets = curSeats;
                reservations[i].price = price;
            }
            // console.log(reservations);
            // console.log(event);
            res.render('reservations', {
                layout: 'bootstrap',
                style: "reservations.css", title: "Reservations",
                script: "reservations.js",
                userId: req.session.loggedUserId,
                accountType: req.session.loggedUserType,
                event: event,
                reservation: reservations,
                totalReserve: totalReservations
            });
        }
    })
}