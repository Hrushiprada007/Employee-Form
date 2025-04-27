const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Your MySQL user
    password: 'Hrushi@2003',        // Your MySQL password
    database: 'Employee1' // Ensure this DB exists
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    const { emp1,name,age,salary } = req.body;
    const sql = 'INSERT INTO Employee_data (  emp1, name, age, salary) VALUES (?, ?, ?,?)';
    db.query(sql, [emp1, name,age,salary], (err, result) => {
        if (err) throw err;
        res.send('Student record added successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get('/students', (req, res) => {
    const sql = 'SELECT * FROM Employee_data';
    db.query(sql, (err, results) => {
        if (err) throw err;

        // Build a simple HTML table
        let html = `
            <h2>All Employees</h2>
            <table border="1" cellpadding="8" cellspacing="0">
                <tr>
                    <th>EmpID</th>
                    <th>EName</th>
                    <th>EAge</th>
                    <th>ESalary</th>
                </tr>
        `;

        results.forEach(row => {
            html += `
                <tr>
                    <td>${row.emp1}</td>
                    <td>${row.name}</td>
                    <td>${row.age}</td>
                    <td>${row.salary}</td>
                </tr>
            `;
        });

        html += '</table><br><a href="/">Back to Form</a>';
        res.send(html);
    });
});
