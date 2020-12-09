const config = require('../config');


exports.index = (req, res) => {
    Login.find((err, login) => {
        if(err) return console.error;
        res.render('index', {
            title: 'Login List',
            login: login
        });
    });
};

exports.index = (req, res) => {
    res.render("index", {
        "title": "Home",
        "config": config
    });
}

exports.signUp = (req, res) => {
    res.render('signup', {
        title: 'Sign Up',
        "config": config
    });
};


exports.login = (req, res) => {
    res.render("login", {
        "title": "Login",
        "config": config
    });
}




///////// DATABASE CONNECTIONS/////////
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://ADMIN:password12345@calories.yanet.mongodb.net/Login_Information?retryWrites=true&w=majority', { 
    useUnifiedTopology: true,
    useNewUrlParser: true 
});

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connnection error'));
mdb.once('open', callback => {});

let loginSchema = mongoose.Schema({
    username : String,
    password: String,
    email: String,
    age : String,
    multiple1 : String,
    multiple2 : String,
    multiple3 : String,
});

let Login = mongoose.model('LoginInfo', loginSchema);



exports.signUpPost = (res, req) => {
    let login = new Login({
        username: req.body.username,
        password : req.body.password,
        email: req.body.email,
        age : req.body.age,
        multiple1 : req.body.multiple1,
        multiple2 : req.body.multiple2,
        multiple3 : req.body.multiple3
    });

    login.save((err, login) => {
        if (err) return console.error(err);
        console.log(req.body.username + ' added');

    });

    res.redirect('/')
};




exports.loginPost = (req, res) => {
    //idk what goes here but start the login session somehow
}
