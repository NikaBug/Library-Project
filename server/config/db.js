// db.js - підключення до бази даних MySQL

const mysql = require('mysql2');
// const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config();

// for Railway MySQL
// const db = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

db.connect((err) => {
    if (err) {
        console.log('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

module.exports = db;