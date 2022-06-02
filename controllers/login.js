/** 
 * Οι συναρτήσεις του controller που χρειάζονται για την αυθεντικοποίηση 
*/
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

let model = require(`../model/sqlite/model.js`);


exports.doRegister = function (req, res) {
    model.registerUser(req.body.username, req.body.password, req.body.email, (err, result) => {
        if (err) {
            console.error('registration error: ' + err);
            //FIXME: δε θα έπρεπε να περνάμε το εσωτερικό σφάλμα στον χρήστη
            res.redirect('/login');
        }
        else if (result.message) {
            console.log('registration error: ' + result.message);
            res.render('login', { layout: 'main', style: "login.css", title: "Login", script: "login.js", registerError: { message: result.message } });
        }
        else {
            console.log('registration successful');
            res.redirect('/');
        }
    })
}

exports.doLogin = function (req, res) {
    //Ελέγχει αν το username και το password είναι σωστά και εκτελεί την
    //συνάρτηση επιστροφής authenticated
    // console.log(req.body);
    model.doLogin(req.body.username, (err, result) => {
        if (err) {
            console.error('login error: ' + err);
            res.redirect('/login');
        }
        else if (result.id == null) {
            // console.log(result)
            res.render('login', {
                layout: 'main',
                style: "login.css", title: "Login",
                script: "login.js",
                loginError: { message: "Δεν βρέθηκε username" }
            });
        }
        else if (result.accountType == "admin") {
            const match = bcrypt.compareSync(req.body.password, result.password);
            if (match) {
                req.session.loggedUserId = result.id;
                req.session.loggedUserType = result.accountType;
                res.redirect('/controlPanel');
            }
            else {
                res.render('login', {
                    layout: 'main',
                    style: "login.css", title: "Login",
                    script: "login.js",
                    loginError: { message: "Λάθος password" }
                });
            }
        }
        else if (result.accountType == "user") {
            // console.log(req.body);
            // console.log(result)
            const match = bcrypt.compareSync(req.body.password, result.password);
            if (match) {
                req.session.loggedUserId = result.id;
                req.session.loggedUserType = result.accountType;
                // console.log(req.session);
                res.render('home', {
                    layout: 'main',
                    style: "home.css", title: "Home",
                    script: "home.js",
                    userId: req.session.loggedUserId
                })
            }
            else {
                res.render('login', {
                    layout: 'main',
                    style: "login.css", title: "Login",
                    script: "login.js",
                    loginError: { message: "Λάθος password" }
                });
            }
        }
    })
}

exports.doLogout = (req, res) => {
    //Σημειώνουμε πως ο χρήστης δεν είναι πια συνδεδεμένος
    req.session.destroy();
    res.redirect('/');
}

//Τη χρησιμοποιούμε για να ανακατευθύνουμε στη σελίδα /login όλα τα αιτήματα από μη συνδεδεμένους χρήστες
exports.checkAuthenticated = function (req, res, next) {
    //Αν η μεταβλητή συνεδρίας έχει τεθεί, τότε ο χρήστης είναι συνεδεμένος
    if (req.session.loggedUserId) {
        console.log("user is authenticated", req.originalUrl);
        //Καλεί τον επόμενο χειριστή (handler) του αιτήματος
        next();
    }
    else {
        //Ο χρήστης δεν έχει ταυτοποιηθεί, αν απλά ζητάει το /login ή το register δίνουμε τον
        //έλεγχο στο επόμενο middleware που έχει οριστεί στον router
        if ((req.originalUrl === "/login/user") || (req.originalUrl === "/login/register")) {
            next()
        }
        else {
            //Στείλε το χρήστη στη "/login" 
            console.log("not authenticated, redirecting to /login")
            errorMessage = { message: "Πρέπει να συνδεθείτε" };
            res.render('login', { layout: 'main', style: "login.css", title: "Login", script: "login.js", loginError: errorMessage });
        }
    }
}

exports.checkAdmin = function (req, res, next) {
    // console.log(req.session)
    if (req.session.loggedUserType === 'admin') {
        next();
    }
    else {
        console.log("not admin, redirecting to /login");
        errorMessage = { message: "Πρέπει να είστε διαχειριστής" };
        // res.location('/login');
        res.location('/login').render('login', { layout: 'main', style: "login.css", title: "Login", script: "login.js", loginError: errorMessage });
        // res.render('login', { layout: 'main', style: "login.css", title: "Login", script: "login.js", loginError: errorMessage });
    }
}
