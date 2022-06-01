'use strict';
const db = require('better-sqlite3')
const bcrypt = require('bcrypt');
const sql = new db('database.sqlite', { fileMustExist: true });


// Populate admin table with 2 admin users
var adminUsername = ['admin', 'theater'];
var adminPassword = ['admin', 'theater'];

for (let i = 0; i < adminUsername.length; i++) {
    let hashedPassword = bcrypt.hashSync(adminPassword[i], 10);
    let stmt = sql.prepare("INSERT INTO admin VALUES (null, ?, ?)");
    stmt.run(adminUsername[i], hashedPassword);
}

var simpleUsers = ['user1', 'user2', 'user3'];
var simpleUsersEmail = ['user1@gmail.com', 'user2@gmail.com', 'user3@gmail.com']
var simpleUsersPassword = ['user1', 'user2', 'user3'];

for (let i = 0; i < simpleUsers.length; i++) {
    let hashedPassword = bcrypt.hashSync(simpleUsersPassword[i], 10);
    let stmt = sql.prepare("INSERT INTO user VALUES (null, ?, ?, ?)");
    stmt.run(simpleUsers[i], simpleUsersEmail[i], hashedPassword);
}


