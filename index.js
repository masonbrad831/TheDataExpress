const express = require("express");
const pug = require("pug");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes/routes");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "/public")));

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get("/", routes.index);
app.get("/login", routes.login);
app.post("/login", routes.loginPost);
app.get("/signup", routes.signUp);
app.post("/signup", urlencodedParser, routes.signUpPost)

app.listen(3001);