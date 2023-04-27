import db from "./connection.js";
import bcrypt from "bcrypt";



db.exec(`DROP TABLE users;`);

// (DDL)
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
);
`
);

// Seeding (DML)
const adminPassword = await bcrypt.hash("admin", 10);
db.exec(`INSERT INTO users (username, password) VALUES ('admin', '${adminPassword}');`);
const johnPassword = await bcrypt.hash("john123", 10);
db.exec(`INSERT INTO users (username, password) VALUES ('john', '${johnPassword}');`);
