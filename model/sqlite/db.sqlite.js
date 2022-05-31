'use strict';

let sqlite3 = require('sqlite3');

let db = new sqlite3.cached.Database('./model/sqlite/db.sqlite', (err) => {
    if (err) {
        if (err) throw err;
    }
});

db.run('PRAGMA journal_mode = WAL;')

module.exports = db;