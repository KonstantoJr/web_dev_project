# Team 22 Web_Development_Project

The following repo is a project for the course
```
Προγραμματισμός Διαδικτύου (ECE_ΓΚ802)
```
Students:
```
Kontos Panagiotis
Konstantopoulos Konstantinos
```
## Description
Website for making reservations at cultural events
(e.g. theatrical plays, concerts etc.)

More about the project can be found at docs/report/final-presentation/build/report.pdf

Modules needed to run
```
npm install -g nodemon
npm install hbs
npm install bcrypt
npm install express
npm install express-session
npm install express-handlebars
npm install pg
npm install dotenv
npm install cookie-parser
npm install connect-sqlite3
npm install connect-flash
npm init -y
```

After installing the above packages run ```npm run debug``` and go to http://localhost:3000/

## DATABASE CREATION
CD into folder sqlite found under model and run the following command 
```
populateDb.js
```
in order to create the database