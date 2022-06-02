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

exports.getEventsByAdminId = function (id, callback) {
    const stmt = sql.prepare("SELECT id ,name, start_date, img FROM event WHERE admin_id = ?");
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

exports.getUserByUsername = function (username, callback) {
    const stmt = sql.prepare("SELECT id, username, password FROM user WHERE username = ? LIMIT 0, 1");
    let user;
    try {
        user = stmt.all(username);
    } catch (err) {
        callback(err, null);
    }
    callback(null, user[0]);
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
let getUserByUsername = (username, callback) => {
    const stmt = sql.prepare("SELECT id, username, password FROM user WHERE username = ? LIMIT 0, 1");
    let user;
    try {
        user = stmt.all(username);
    } catch (err) {
        callback(err, null);
    }
    callback(null, user[0]);
}
exports.getUserByUsername = getUserByUsername;
exports.getAdminByUsername = getAdminByUsername;

// Until we implement users we dont need it
exports.registerUser = function (username, password, email, callback) {
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    let stmt = sql.prepare("SELECT username FROM admin WHERE username = ? LIMIT 0, 1");
    let user;
    try {
        user = stmt.all(username);
    }
    catch (err) {
        callback(err, null);
    }
    if (user.length > 0) {
        let results = {
            result: null,
            message: 'Username already exists'
        }
        callback(null, results);
    }
    else {
        stmt = sql.prepare("SELECT username FROM user WHERE username = ? LIMIT 0, 1");
        try {
            user = stmt.all(username);
        }
        catch (err) {
            callback(err, null);
        }
        if (user.length > 0) {
            let results = {
                result: null,
                message: 'Username already exists'
            }
            callback(null, results);
        }
        else {
            stmt = sql.prepare('SELECT email FROM user WHERE email = ? LIMIT 0, 1');
            try {
                user = stmt.all(email);
            }
            catch (err) {
                callback(err, null);
            }
            if (user.length > 0) {
                let results = {
                    result: null,
                    message: 'Email already registered'
                }
                callback(null, results);
            }
            else {
                // εισάγουμε τον χρήστη στη βάση
                stmt = sql.prepare("INSERT INTO user (username, password, email) VALUES (?, ?, ?)");
                try {
                    let hashedPassword = bcrypt.hashSync(password, 10);
                    stmt.run(username, hashedPassword, email);
                }
                catch (err) {
                    callback(err, null);
                }
                let results = {
                    result: true,
                    message: 'User registered'
                }
                callback(null, results);
            }
        }
    }
}

exports.doLogin = function (username, callback) {
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    // console.log(username)
    let stmt = sql.prepare("SELECT id , username, password FROM admin WHERE username = ? LIMIT 0, 1");
    let user;
    try {
        user = stmt.all(username);
    } catch (err) {
        callback(err, null);
    }
    if (user.length > 0) {
        // console.log(user);
        user = user[0];
        let results = {
            id: user.id,
            password: user.password,
            accountType: 'admin'
        };
        callback(null, results)
    }
    else {
        stmt = sql.prepare("SELECT id ,username, password FROM user WHERE username = ? LIMIT 0, 1");
        try {
            user = stmt.all(username);
        } catch (err) {
            callback(err, null);
        }
        if (user.length > 0) {
            user = user[0];
            // console.log(user)
            let results = {
                id: user.id,
                password: user.password,
                accountType: 'user'
            };
            callback(null, results)
        }
        else {
            let results = {
                id: null,
                message: 'Username or password incorrect'
            }
            callback(null, results);
        }
    }
}


exports.deleteEvent = function (id, callback) {
    let stmt = sql.prepare("DELETE FROM event WHERE id = ?");
    try {
        stmt.run(id);
    } catch (err) {
        callback(err, null);
    }
    callback(null, true);
}