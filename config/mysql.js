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
    //fetchProfessor
    fetchProfessor : function (callback){
        connection.query('SELECT * FROM professor JOIN responsavel JOIN turma JOIN disciplina '
                        +'WHERE professor.id = responsavel.fkprofessor '
                        + 'AND responsavel.fkturma = turma.id '
                        + 'AND turma.fkdisciplina = disciplina.id;', function (err, rows, fields){
            callback(err, rows);
        })
    }
    ,
    fetchDisciplina : function (callback){
        connection.query('SELECT id, nomeDisciplina FROM disciplina', function (err, rows, fields){
            callback(err, rows);
        })
    },
    fetchTurmasAbertas : function (callback){
        connection.query('SELECT * FROM turma JOIN horaaula WHERE turma.id = horaaula.fkturma AND horaaula.avaliando = 1', function (err, rows, fields){
            callback(err, rows);
        })
    }
    ,
    fetchTurmasAbertas2 : function (callback) {
        connection.query('SELECT horaaula.id, horaaula.fkturma, codigo, nomeDisciplina, inicio,fim FROM turma JOIN horaaula JOIN disciplina ' 
                        +'WHERE turma.id = horaaula.fkturma '
                        +'AND turma.fkdisciplina = disciplina.id '
                        +'AND horaaula.avaliando = 1 '
                        + 'ORDER BY horaaula.fkturma DESC; ', 
            function (err, rows, fields) {
                callback(err, rows);
        })
    }
    ,
    fetchProfessorCargaHorariaSemanal : function (callback){
        connection.query('SELECT nomeProfessor, sum(cargaHorariaSemanal) FROM professor JOIN responsavel JOIN turma JOIN disciplina ' 
                        + 'WHERE professor.id = responsavel.fkprofessor ' 
                        + 'AND responsavel.fkturma = turma.id ' 
                        + 'AND turma.fkdisciplina = disciplina.id;', function (err, rows, fields) {
            callback(err, rows);
        })
    }
    ,
    //insertUser
    insertUser : function (name, password, group){
        connection.query('INSERT INTO user(name,password,user.group) VALUES(?,?,?)', [name, password, group] , function (err, rows, fields) {
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
    getUserGroups : function (callback){
        connection.query('SELECT DISTINCT user.group FROM user', function (err, rows, fields){
            callback(err, rows);
        })
    },
    generateHash : function (password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword : function (passwordInput, passwordFound) {
        return bcrypt.compareSync(passwordInput, passwordFound);
    }
};