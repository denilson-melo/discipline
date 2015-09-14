var dbTools = require('../config/mysql.js');

function isLoggedIn(req, res, next) {
    //If user is authenticated continue the route
    if (req.isAuthenticated())
        return next();
    // If they aren't redirect them to the home page
    res.redirect('/login');
}

function needsGroup(group) {
    return function (req, res, next) {
        //If there's a user serialized, evaluate it's group, else redirect to the login page
        if (req.user) {
            //If the serialized users group equals the passed parameter the route coninues, else gives 401
            if (req.user.group == group) {
                next();
            } else {
                res.send(401, 'Unauthorized');
            }
        } else {
            res.redirect('/login');
        }
    };
}

module.exports = function (app, passport) {
//Index    
    app.get('/', function (req, res) {
        res.render('index', { title: 'Express', year: new Date().getFullYear() });
    });
//About
    app.get('/about', function (req, res) {
        res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page1.' });
    });
//Contact    
    app.get('/contact', needsGroup('night'), function (req, res) {
        console.log(req.session.passport.user);
        res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page.' });
    });
//Showusers    
    app.get('/showusers', isLoggedIn, function (req, res) {
        dbTools.fetchUsers(function (rows, fields) {
            res.render('showusers', { rows : rows, fields : fields });
        });
    });
//Professor
    app.get('/professor', function (req, res) {
        //Get professores + responsavel + turma + disciplina
        dbTools.fetchProfessor(function (err, professor) {
            if (err) res.render('/', 200);
            dbTools.fetchProfessorCargaHorariaSemanal(function (err, rows) {
                res.render('professor', { professor : professor, cargaHoraria : rows });
            });
        })
    });
//Criarturma
    app.get('/criarturma', function (req, res) {
        dbTools.fetchDisciplina(function (err, rows){
            var disciplina = rows;
            dbTools.fetchTurmasAbertas2(function (err, rows){
                var packed = [];
                var temp = {};
                var k = 0;
                var id = rows[0].fkturma;
                temp['codigo'] = rows[0].codigo;
                temp['nomeDisciplina'] = rows[0].nomeDisciplina;
                for (i = 0; i < rows.length; i++) {
                    if (id == rows[i].fkturma) {
                        k++;
                        temp['inicio'+k] = rows[i].inicio;
                        temp['fim'+k] = rows[i].fim;
                    } else {
                        k = 0;
                        id = rows[i].fkturma;
                        packed.push(temp);
                        temp = {};
                        temp['codigo'] = rows[i].codigo;
                        temp['nomeDisciplina'] = rows[i].nomeDisciplina
                        i--;
                    }
                }
                packed.push(temp);
                res.render('criarturma', { disciplina : disciplina, turmasEmAberto : packed });
            })
        })
    });
    app.post('/criarturma', function (req, res) {
        console.log('!!!!!!!', req.body);
        
    });
//Login
    app.get('/login', function (req, res) {
        res.render('login', { message : req.flash('loginMessage') });
    });
    app.post('/login', passport.authenticate('login', {
        successRedirect: '/showusers',
        failureRedirect: '/login',     
        failureFlash : true
    }));
//SignUp view(message, groups)
    app.get('/signup', function (req, res) {
        dbTools.getUserGroups(function (err, rows) {
            res.render('signup', {
                groups : rows,
                message : req.flash('signUpMessage')
            });
        });
    });
    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/showusers',
        failureRedirect: '/signup',
        failureFlash : true
    }));
}