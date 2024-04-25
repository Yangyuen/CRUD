const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeesystem'
})

app.get('/employees', (req, res) =>{
    db.query("SELECT * FROM employee", (err, result) =>{
        if (err) {
            console.log(err);
        
        } else {
            res.send(result);
        }
    });
});

app.post('/create', (req, res) =>{
    const id = req.body.id;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const position = req.body.position;
    const department = req.body.department;

    db.query("INSERT INTO employee (id, name, lastname, position, department) VALUES(?,?,?,?,?)", 
    [id, name, lastname, position, department],
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    }
);
})

app.put('/update', (req, res) =>{
    const id = req.body.id;
    const position = req.body.position;
    db.query('UPDATE employee SET position = ? WHERE id =?', [position, id], (err, result) =>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.delete('/delete/:id', (req, res) =>{
    const id = req.params.id;
    db.query("DELETE FROM employee WHERE id =?", id, (err, result) =>{
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.listen('3002', ()=>{
    console.log('Server is Running Port 3002')
})