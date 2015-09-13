var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'proto'
});
connection.connect();

var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password = 'banana';
var cipher = crypto.createCipher(algorithm, password);

var bcrypt = require('bcrypt-nodejs');

module.exports = {
    //fetchUsers
    fetchUsers : function(callback){
    connection.query('SELECT * FROM user', function (err, rows, fields) {
        callback(rows, fields); 
    });
    }
    ,
    //insertUser
    insertUser : function (name, password){
        connection.query('INSERT INTO user(name,password) VALUES(?,?)', [name, password] , function (err, rows, fields) {
            if (err) console.log(err);     
        });
    },
    //findUserById callback(err, rows, fields)
    findUserById : function (id, callback){
        connection.query('SELECT * FROM user WHERE iduser = ?', [id], function (err, rows, fields) {
            callback(err, rows, fields);
        })
    },
    //findUserByName callback(user)
    findUserByName : function (name, callback) {
        connection.query('SELECT * FROM user WHERE name = ?', [name], function (err, rows, fields) {
            callback(err, rows[0]);
        })
    },
    generateHash : function (password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword : function (passwordInput, passwordFound) {
        console.log('!!!!!!', passwordFound);
        return bcrypt.compareSync(passwordInput, passwordFound);
    }
};