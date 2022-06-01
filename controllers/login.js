/** 
 * Οι συναρτήσεις του controller που χρειάζονται για την αυθεντικοποίηση 
*/
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

let model = require(`../model/sqlite/model.js`);


exports.showLogInForm = function (req, res) {
    res.render('login-password', { model: process.env.MODEL });
}

exports.showRegisterForm = function (req, res) {
    res.render('register-password', {});
}

exports.doRegister = function (req, res) {
    model.registerUser(req.body.username, req.body.password, (err, result, message) => {
        if (err) {
            console.error('registration error: ' + err);
            //FIXME: δε θα έπρεπε να περνάμε το εσωτερικό σφάλμα στον χρήστη
            res.redirect('/login');
        }
        else if (message) {
            console.log('registration error: ' + message.message);
            res.render('login', { layout: 'main', style: "login.css", title: "Login", script: "login.js", registerError: message });
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
    model.getAdminByUsername(req.body.email, (err, user) => {
        if (user == undefined) {
            console.log("No user found");
            emsg1 = { message: "Δεν βρέθηκε ο χρήστης" };
            res.render('login', { layout: 'main', style: "login.css", title: "Login", script: "login.js", loginError: emsg1 });
        }
        else {
            const match = bcrypt.compare(req.body.password, user.password, (err, match) => {
                if (match) {
                    //Θέτουμε τη μεταβλητή συνεδρίας "loggedUserId"
                    req.session.loggedUserId = user.id;
                    //Αν έχει τιμή η μεταβλητή req.session.originalUrl, αλλιώς όρισέ τη σε "/" 
                    const redirectTo = req.session.originalUrl || "/";
                    // res.redirect("/");
                    console.log("successful login")
                    res.redirect(redirectTo);
                }
                else {
                    console.log('Wrong password');
                    emsg1 = { message: "Λάθος κωδικός" };
                    res.render('login', { layout: 'main', style: "login.css", title: "Login", script: "login.js", loginError: emsg1 });
                }
            })
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
        if ((req.originalUrl === "/login") || (req.originalUrl === "/register")) {
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

