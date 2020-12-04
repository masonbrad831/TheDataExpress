const express = require("express"),
    pug = require("pug"),
    path = require("path"), 
    routes = require("./routes/routes"),
    bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


let urlencodedParser = bodyParser.urlencoded( {
    extended: true
});

app.get('/', routes.index);

app.get('/login', routes.create);
app.post('/login', urlencodedParser, routes.createLogin);

app.listen(3000);