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

exports.loginPost = (req, res) => {
    //idk what goes here but start the login session somehow
}

exports.signup = (req, res) => {
    res.render("signup", {
        "title": "Sign Up"
    })
}