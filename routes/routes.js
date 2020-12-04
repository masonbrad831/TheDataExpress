exports.index = (req, res) => {
    res.render("index", {
        "title": "Home"
    });
}

exports.login = (req, res) => {
    res.render("login", {
        "title": "Login"
    });
}