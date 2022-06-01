const express = require('express')
const handlebars = require('express-handlebars');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const SQLiteStore = require('connect-sqlite3')(session); // store for sessions
require('dotenv').config();

const app = express()
const index_router = require('./routes/index.js');

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     console.log(req.locals);
//     res.locals.userId = req.session.loggedUserId;
//     next();
// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 2000 * 60 * 60,
        sameSite: true
    },
    store: new SQLiteStore({ db: 'session.sqlite', dir: './model/sessions' })
}));

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs')
app.set('views', './views')

app.use('/', index_router);


// app.route('/searchText').get((req, res) => {
//     res.render('search', { layout: 'layouts/main', style: "home.css", title: "Search", script: "home.js" })
// })
// app.route('/event').get((req, res) => {
//     res.render('event', { layout: 'layouts/main', style: "event.css", title: "Event", script: "event.js" })
// })

module.exports = app;