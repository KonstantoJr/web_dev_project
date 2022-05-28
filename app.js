const express = require('express')
const app = express()
const session = require('express-session')


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 2000 * 60 * 60,
        sameSite: true
    }
}));

// const passport = require("passport")


// const initializePassport = require("./passportConfig");

// initializePassport(passport);

// app.use(passport.initialize());
// app.use(passport.session())

// const dbClient = require("./dbconfig");

const hbs = require('hbs');
app.set('view engine', 'hbs')
app.set('views', 'views/')
app.use(express.static(__dirname + '/public'));

const routes = require('./routes/reservation-routes');


// app.use('/', routes);
// handlebars.create({ defaultLayout: 'layouts/main.hbs' });
// app.engine('handlebars', handlebars.engine({ defaultLayout: "layouts/main.hbs" }));

app.get('/', (req, res) => res.render('home', { layout: 'layouts/main', style: "home.css", title: "Home", script: "home.js" }))
app.route('/').get((req, res) => {
    res.render('home', { layout: 'layouts/main', style: "home.css", title: "Home", script: "home.js" })
})
app.route('/login').get((req, res) => {
    res.render('login', { layout: 'layouts/main', style: "login.css", title: "Login", script: "login.js" })
})

// app.post(
//     "/users/login",
//     passport.authenticate("local", {
//         successRedirect: "/users/dashboard",
//         failureRedirect: "/users/login"
//     })
// );

module.exports = app;