const config = require('../config');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/data', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', callback => {});

let accountSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number,
    answer1: String,
    answer2: String,
    answer3: String
});

let User = mongoose.model('User_Collection', accountSchema);

exports.index = (req, res) => {
    res.render("index", {
        title: "Home",
        "config": config
    });
};

exports.register = (req, res) => {
    res.render('register', {
        title: 'Register User',
        "config": config
    });
};

exports.registerUser = (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    let user = new User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        age: req.body.age,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3,
    });
    user.save((err, user) => {
        if (err) return console.err(err);
        console.log(req.body.username + ' added');
    })
    res.redirect('/')
};

exports.login = (req, res) => {
    res.render("login", {
        title: "Login",
        "config": config
    });
};

exports.loginUser = (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);


    const test_user = User.find({
        $and: [
            {username: req.body.username},
            {password: hash}
        ]
    });
    if (req.body.username != ' ' && req.body.password != ' '){
        if(test_user.exists){
            req.session.user = {
                isAuthenticated: true,
                username: req.body.username
            }
            res.redirect('/profile');
        } else {
            res.redirect('/login');
        }
    }else{
        res.redirect('/login');
    }
};

exports.profile = (req, res) => {
    res.render("profile", {
        title: "Profile",
        "config": config
    });
};