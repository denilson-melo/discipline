var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password = 'banana';
var cipher = crypto.createCipher(algorithm, password);

module.exports = {
    //fetchUsers
    fetchUsers : function(callback){
    connection.query('SELECT * FROM user', function (err, rows, fields) {
        if (!err) {
            callback(rows, fields); 

        }
        else
            console.log('Query error', err);
    });
    }
    ,
    //insertUser
    insertUser : function (name, password){
        var crypted = cipher.update(password, 'utf8', 'hex');
        connection.query('INSERT INTO user(name,password) VALUES(?,?)', [name, crypted] , function (err, rows, fields) {
            if (err) console.log(err);            
        });
    }
};