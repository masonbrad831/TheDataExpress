const config = require('../config');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let visited = 0;

mongoose.connect('mongodb+srv://ADMIN:password12345@data.0iakt.mongodb.net/Data?retryWrites=true&w=majority', {
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

    User.findOne({username: req.body.username}, (err, user) => {
        if(err) return console.error(err);
        if (bcrypt.compareSync(req.body.password, user.password)){
            req.session.user = {
                isAuthenticated: true,
                username: req.body.username
            }
            res.redirect('/profile');
        }else {
            res.redirect('/login');
        }
    })
};

exports.profile = (req, res) => {
    visited++;
    res.cookie('visited', visited, {maxAge: 9999999999999999999999999999999999999});
    res.render("profile", {
        title: "Profile",
        "config": config,
        visited: `You have been to your profile ${visited} times.`
    });

};

exports.settings = (req, res) => {
    res.render('settings', {
        title: 'Settings',
        "config" : config
    });
};

exports.editUser = (req, res) => {

    User.findOne({username: req.session.user.username}, (err, user) => {
        if(err) return console.error(err);
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        user.username = req.body.username;
        user.password = hash;
        user.email = req.body.email;
        user.age = req.body.age;
        user.answer1 = req.body.answer1;
        user.answer2 = req.body.answer2;
        user.answer3 = req.body.answer3;
        user.save((err, user) => {
            if(err) return console.err(err);
            console.log(req.body.username + ' updated');
        });
        res.redirect('/profile');
    })
};