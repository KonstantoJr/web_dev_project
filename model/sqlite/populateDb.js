'use strict';
const db = require('better-sqlite3')
const bcrypt = require('bcrypt');
const fs = require('fs');
const sql = new db('database.sqlite');

let data = fs.readFileSync('./database.sql' , 'utf8');

data = data.split(';');
// console.log(data)

for (let i of data){
    // console.log(i + ';')
    if (i === ""){
        continue
    }
    let stmt = sql.prepare(i + ';');
    stmt.run();
}



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

var eventName = ["poutses", "peoi"];

for (let i = 0; i < eventName.length; i++) {
    
    let stmt = sql.prepare("INSERT INTO event VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)");
    // stmt.run(eventName[i]);
}

