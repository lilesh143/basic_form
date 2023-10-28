var con = require('./connections/connection');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.json());

app.set('view engine', 'ejs');



app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/html/form.html')
});
console.log('/ connected');

app.post('/', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var mno = req.body.mno;


    var sql = "insert into student2 (name, email, number) values(?, ?, ?)";

    con.query(sql, [name, email, mno], function(error, result) {
        if (error) throw error;
        // res.send('data send success' + result.insertId)
        res.redirect('/students')

    });

})

app.get('/students', function(req, res) {

    var sql = "select * from student2"
    con.query(sql, function(error, result) {
        if (error) throw error;
        res.render(__dirname + "/html/studentTable", { stdnt: result })
    })

})

app.get('/delete-student', function(req, res) {
    var sql = "delete from student2 where id=?"
    var id = req.query.id;

    con.query(sql, [id], function(error, result) {
        if (error) throw error;
        res.redirect('/students');
    })

})

app.get('/update-student', function(req, res) {
    var sql = "select * from student2 where id=?"
    var id = req.query.id;
    con.query(sql, [id], function(error, result) {
        if (error) throw error;
        res.render(__dirname + "/html/update", { stdnt: result });
    })
})

app.post('/update-student', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var mno = req.body.mno;
    var id = req.body.id;

    var sql = "update student2 set name=?, email=?, number=? where id=?"
    con.query(sql, [name, email, mno, id], function(error, result) {
        if (error) throw error;
        res.redirect('/students');
    })

})

app.get('/search-student', function(req, res) {
    var sql = "select * from student2"
    con.query(sql, function(error, result) {
        if (error) throw error;
        res.render(__dirname + "/html/search-student", { stdnt: result })
    })
})

app.get('/search', function(req, res) {
    var name = req.query.name;
    var email = req.query.email;
    var number = req.query.number;


    var sql = "select * from student2 where name like '%" + name + "%' and email like '%" + email + "%' and number like '%" + number + "%'";

    con.query(sql, function(error, result) {
        if (error) throw error;
        res.render(__dirname + "/html/search-student", { stdnt: result })
    })
})

app.listen(5500);