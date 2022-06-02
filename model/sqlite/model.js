'use strict';
const db = require('better-sqlite3')
const bcrypt = require('bcrypt');
const sql = new db('./model/sqlite/database.sqlite', { fileMustExist: true });


exports.connect = (callback) => {
    console.log("connecting to database");
    callback(null, true)
}

exports.getEventById = function (id, callback) {
    const stmt = sql.prepare("SELECT name , description ,total_seats , organizer, duration , start_date , start_time , img , contributor , price , phone FROM event WHERE id = ? LIMIT 0, 1");
    let events;
    try {
        events = stmt.all(id);
    } catch (err) {
        callback(err, null);
    }
    callback(null, events);
}

exports.getEvents = function (callback) {
    const stmt = sql.prepare("SELECT id ,name, description, start_date, img FROM event");
    let events;
    try {
        events = stmt.all();
    } catch (err) {
        callback(err, null);
    }
    callback(null, events);
}

exports.findAdminbyUsernamePassword = (username, password, callback) => {
    //Φέρε μόνο μια εγγραφή (το LIMIT 0, 1) που να έχει username και password ίσο με username και password 
    const stmt = sql.prepare("SELECT username FROM admin WHERE username = ? and password = ? LIMIT 0, 1");
    let user;
    try {
        user = stmt.all(username, password);
    } catch (err) {
        callback(err, null);
    }
    callback(null, user);
}

let getAdminByUsername = (username, callback) => {
    const stmt = sql.prepare("SELECT id, username, password FROM admin WHERE username = ? LIMIT 0, 1");
    let user;
    try {
        user = stmt.all(username);
    } catch (err) {
        callback(err, null);
    }

    callback(null, user[0])
}

exports.getAdminByUsername = getAdminByUsername;

// Until we implement users we dont need it
exports.registerUser = function (username, password, callback) {
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    getAdminByUsername(username, async (err, userId) => {
        if (userId != undefined) {
            callback(null, null, { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" })
        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const stmt = sql.prepare('INSERT INTO admin VALUES (null, ?, ?)');
                let info;

                try {
                    info = stmt.run(username, hashedPassword);
                }
                catch (err) {
                    //Αν υπάρχει σφάλμα, κάλεσε τη συνάρτηση επιστροφής και δώστης το σφάλμα
                    callback(err, null);
                }
                //Αλλιώς κάλεσε τη συνάρτηση επιστροφής με όρισμα το id που πήρε από τη βάση η νέα εγγραφή
                //Την τιμή του info.lastInsertRowid μας τη δίνει η ίδια η βάση και εξασφαλίζουμε έτσι πως κάθε
                //εγγραφή έχει μοναδικό id
                callback(null, info.lastInsertRowid);
            } catch (error) {
                callback(error);
            }
        }

    })
}