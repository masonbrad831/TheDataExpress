const express = require("express");
const expressSession = require('express-session');
const pug = require("pug");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes/routes");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "/public")));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

const checkAuth = (req, res, next) => {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    }else {
        res.redirect('/');
    }
};

app.use(expressSession({
    secret: 'whatever',
    saveUninitialized: true,
    resave: true
}));

app.get("/", routes.index);
app.get("/login", routes.login);
app.post('/login', urlencodedParser, routes.loginUser);
app.get('/register', routes.register);
app.post('/register', urlencodedParser, routes.registerUser);
app.get('/profile', checkAuth, routes.profile);
app.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.listen(3000);