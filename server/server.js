// server.js - стартовий файл сервера
const express = require('express')
// const mysql = require('mysql')
const cors = require('cors')
const path = require('path');

// змінні середовища
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json()) // дані у json
app.use(cors()) // для з'єднання з клієнтом

// обробка статичних файлів
app.use('/covers', express.static(path.join(__dirname, 'covers')));
app.use('/books-content', express.static(path.join(__dirname, 'books-content')))
app.use('/books-fragment', express.static(path.join(__dirname, 'books-fragment')))


// підключення до бази даних
const db = require('./config/db');

// отримати стислу інформацію про 
// художню літературу (перші шість екземплярів)
app.get('/getfiction', (req, res) => {
    const sql = "SELECT e.idEdition, b.title, a.name AS author, e.url_cover FROM edition AS e " 
    + "INNER JOIN book AS b ON e.book_id = b.idBook " 
    + "INNER JOIN author AS a ON b.author_id = a.idAuthor WHERE b.category_id = 1 LIMIT 6 "
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: "Error SELECT (getfiction)" })
        }
        return res.json(data);
    })

})

// отримати стислу інформацію про 
// нехудожню літературу (перші шість екземплярів)
app.get('/getnonfiction', (req, res) => {
    const sql = "SELECT e.idEdition, b.title, a.name AS author, e.url_cover FROM edition AS e "
        + "INNER JOIN book AS b ON e.book_id = b.idBook "
        + "INNER JOIN author AS a ON b.author_id = a.idAuthor WHERE b.category_id = 2 LIMIT 6"
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: "Error SELECT (getnonfiction)" })
        }
        return res.json(data);
    })

})

// отримати деталі книги
app.get('/bookdetail/:idEdition', (req, res) => {
    const idEdition = req.params.idEdition;
    const sql = "SELECT b.title, a.name AS author, f.name AS format, l.name AS language, p.name AS publisher, "
        + "e.year_edition, b.description, e.page_number, e.isbn, b.year_publication, e.url_cover, "
        + "GROUP_CONCAT(t.name) AS tag, e.url_fragment, e.url_content "
        + "FROM edition AS e "
        + "INNER JOIN `book` AS b ON e.book_id = b.idBook "
        + "INNER JOIN `book_tag` bt ON b.idBook = bt.book_id "
        + "INNER JOIN `tags` AS t ON  t.idTag = bt.tag_id "
        + "INNER JOIN `author` AS a ON b.author_id = a.idAuthor "
        + "INNER JOIN `format` AS f ON f.idFormat = e.format_id "
        + "INNER JOIN `language` AS l ON e.language_id = l.idLanguage "
        + "INNER JOIN `publisher` AS p ON e.publisher_id = p.idPublisher "
        + "WHERE idEdition = ?";

    db.query(sql, [idEdition], (err, data) => {
        if (err) {
            return res.json({ Error: "Error BOOK DETAIL" })
        }
        return res.json(data);
    })
})

// отримати всі книги
app.get('/allbooks', (req, res) => {
    const sql = "SELECT e.idEdition, b.title, a.name AS author, "
        + "f.name AS format, l.name AS language, p.name AS publisher, e.url_cover, c.name AS category "
        + "FROM edition AS e "
        + "INNER JOIN `book` AS b ON e.book_id = b.idBook "
        + "INNER JOIN `author` AS a ON b.author_id = a.idAuthor "
        + "INNER JOIN `format` AS f ON f.idFormat = e.format_id "
        + "INNER JOIN `language` AS l ON e.language_id = l.idLanguage "
        + "INNER JOIN `publisher` AS p ON e.publisher_id = p.idPublisher "
        + "INNER JOIN `category` AS c ON c.idCategory = b.category_id ";

    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: "Error SELECT (allbooks)" })
        }
        return res.json(data);
    })
})

// запит на пошук книги
app.post('/searchbook', (req, res) => {
    // параметри для пошуку
    const title = req.body.title;
    const author = req.body.author;
    const category = req.body.category;
    const language = req.body.language;
    const format = req.body.format;
    const startYear = req.body.startYear;
    const endYear = req.body.endYear;

    // загальний запит на вибір всіх видань  
    let sql = "SELECT e.idEdition, b.title, a.name AS author, e.url_cover "
        + "FROM edition AS e "
        + "INNER JOIN `book` AS b ON e.book_id = b.idBook "
        + "INNER JOIN `author` AS a ON b.author_id = a.idAuthor "
        + "WHERE 1=1 ";

    let queryParams = []; // параметри запиту
    if (title) {
        sql += "AND b.title = ? ";
        queryParams.push(title);
    }

    if (author) {
        sql += "AND a.name = ? ";
        queryParams.push(author);
    }

    if (category) {
        const join_category = "INNER JOIN `category` AS c ON c.idCategory = b.category_id "
        const indexInsert = sql.indexOf('WHERE'); // індекс WHERE
        // вставити join_category перед WHERE 
        // та додати після WHERE частину з AND
        sql = sql.slice(0, indexInsert) + join_category + sql.slice(indexInsert) + "AND c.name = ? ";
        queryParams.push(category);
    }

    if (language) {
        const join_language = "INNER JOIN `language` AS l ON e.language_id = l.idLanguage "
        const indexInsert = sql.indexOf('WHERE');
        sql = sql.slice(0, indexInsert) + join_language + sql.slice(indexInsert) + "AND l.name = ? ";
        queryParams.push(language);
    }

    if (format) {
        const join_format = "INNER JOIN `format` AS f ON f.idFormat = e.format_id "
        const indexInsert = sql.indexOf('WHERE');
        sql = sql.slice(0, indexInsert) + join_format + sql.slice(indexInsert) + "AND f.name = ? ";
        queryParams.push(format);
    }

    if (startYear && endYear) {
        sql += "AND e.year_edition BETWEEN ? AND ? ";
        queryParams.push(startYear, endYear);
    }

    db.query(sql, queryParams, (err, data) => {
        if (err) {
            return res.json({ Error: "Error SEARCH BOOK" })
        }
        return res.json(data);
    })

})

// отримати діапазон років видань (мінімальне та максимальне значення)
app.get('/rangeyears', (req, res) => {
    let sql = "SELECT MIN(e.year_edition) AS minYear, MAX(e.year_edition) AS maxYear FROM edition AS e";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: "Error SELECT (rangeyears)" })
        }
        return res.json(data);
    })
})

// запуск сервера
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server is started... ")
})