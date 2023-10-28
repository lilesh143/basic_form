var con = require('./connections/connection');
const { app } = require('.');

app.post('/', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var mno = req.body.mno;


    con.connect(function(error) {
        if (error) throw error;

        var sql = "insert into student2 (name, email, number) values ?";

        var values = [
            [name, email, mno]
        ];

        con.query(sql, [values], [name, email, mno], function(error, result) {
            if (error) throw error;
            res.send('data send success' + result.insertId);
        });

    });
});