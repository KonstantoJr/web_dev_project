# Team 22 Web_Development_Project

The following repo is a project for the course
```
Προγραμματισμός Διαδικτύου (ECE_ΓΚ802)
```
Students:
```
Konstantopoulos Konstantinos
Kontos Panagiotis
```
## Description
Website for making reservations at cultural events
(e.g. theatrical plays, concerts etc.)


### To do and questions
- To do 
    1. Get ideas from existing sites on how to design it
    2. Design the db to handle the reservations

- Questions
    1. Payments?
    2. In case of cinema do we need a seat selector
    3. Sort by date or by theme 

Modules needed to run
```
npm install -g nodemon
npm install hbs
npm install bcrypt
npm install passport
npm install passport-local
npm install express
npm install express-session
npm install express-handlebars
npm install pg
npm install dotenv
npm install cookie-parser
npm install connect-sqlite3
npm init -y
```

After installing the above packages run ```npm run debug``` and go to http://localhost:3000/

## DATABASE CREATION
CD into folder sqlite found under model and run the following command
```
sqlite3 database.sqlite < database.sql
```