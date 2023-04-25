import db from "./connection.js";

const isDeleteMode = true;

if (isDeleteMode) {
    db.exec(`DROP TABLE users;`);
}

// (DDL)
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    is_admin BOOLEAN NOT NULL
);
`);

// Seeding (DML)
if (isDeleteMode) {
    db.exec(`INSERT INTO users (username, password, is_admin) VALUES ('admin', 'admin', True);`);
    db.exec(`INSERT INTO users (username, password, is_admin) VALUES ('billy', 'billy2', False);`);
}