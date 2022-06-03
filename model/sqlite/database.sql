DROP TABLE IF EXISTS `event`;
CREATE TABLE 'event'(
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'name' TEXT NOT NULL,
    'description' TEXT NOT NULL,
    'total_seats' INTEGER NOT NULL,
    'organizer' TEXT NOT NULL,
    'duration'  INT NOT NULL,
    'admin_id' INTEGER NOT NULL,
    'start_date' TEXT NOT NULL,
    'start_time' TEXT NOT NULL,
    'img' TEXT NOT NULL,
    'contributor' TEXT NOT NULL,
    'price'  INTEGER NOT NULL,
    'phone' TEXT NOT NULL,
    'location' TEXT NOT NULL,
    FOREIGN KEY('admin_id') REFERENCES 'admin'('id') ON DELETE CASCADE
);
DROP TABLE IF EXISTS `admin`;
CREATE TABLE 'admin'(
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'username' TEXT NOT NULL UNIQUE,
    'password' TEXT NOT NULL
);
DROP TABLE IF EXISTS `reservation`;
CREATE TABLE 'reservation'(
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'event_id' INTEGER NOT NULL,
    'date' TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    'name' TEXT NOT NULL,
    'phone' TEXT NOT NULL,
    'number_of_seats' TEXT NOT NULL,
    'email' TEXT NOT NULL,
    'user_id' INTEGER NOT NULL,
    FOREIGN KEY('event_id') REFERENCES 'event'('id') ON DELETE CASCADE,
    FOREIGN KEY('user_id') REFERENCES 'user'('id') ON DELETE CASCADE
);

DROP TABLE IF EXISTS `user`;
CREATE TABLE 'user'(
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'username' TEXT NOT NULL,
    'password' TEXT NOT NULL UNIQUE,
    'email' TEXT NOT NULL
);