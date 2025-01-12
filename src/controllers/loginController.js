const Login = require('../models/LoginModel');
exports.index = (req, res, next) => {
    res.render('register')
     next();
};

exports.logar = (req, res, next) => {
    res.render('login');
     next();
};

exports.register = async function(req, res) {
    try{
        const login = new Login(req.body);
    await login.register();

    if(login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(function(){
        return res.redirect('/login/index');
        })
    return
    }
    req.flash('success', "Usuário criado com sucesso!");
    req.session.save(function(){
        return res.redirect('/login/index');
    })
    }catch(e){
        console.log(e);
        res.render('404')
    }
    
        
};


exports.login = (req, res) => {

};