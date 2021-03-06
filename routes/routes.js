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

exports.api = (req, res) => {
    User.find((err, accts) => {
        var returnDoc = {
            Q1:{
                AL: 0,
                AK: 0,
                AZ: 0,
                AR: 0,
                CA: 0,
                CO: 0,
                CT: 0,
                DE: 0,
                FL: 0,
                GA: 0,
                HI: 0,
                ID: 0,
                IL: 0,
                IN: 0,
                IA: 0,
                KS: 0,
                KY: 0,
                LA: 0,
                ME: 0,
                MD: 0,
                MA: 0,
                MI: 0,
                MN: 0,
                MS: 0,
                MO: 0,
                MT: 0,
                NE: 0,
                NV: 0,
                NH: 0,
                NJ: 0,
                NM: 0,
                NY: 0,
                NC: 0,
                ND: 0,
                OH: 0,
                OK: 0,
                OR: 0,
                PA: 0,
                RI: 0,
                SC: 0,
                SD: 0,
                TN: 0,
                TX: 0,
                UT: 0,
                VT: 0,
                VA: 0,
                WA: 0,
                WV: 0,
                WI: 0,
                WY: 0
            },
            Q2: {
                Pop: 0,
                Hiphop: 0,
                Rock: 0,
                Rap: 0,
                Electronic: 0,
                Other: 0
            },
            Q3: {
                Dog: 0,
                Cat: 0,
                Rabbit: 0,
                Turtle: 0,
                Fox: 0,
                Other: 0,
            }

        };
        // console.log(accts);
        for (let doc in accts) {
            // if(accts[doc].age) {
            //     ageCollection.push(accts[doc].age);
            // }
            console.log(accts[doc]);
            if(accts[doc].answer1) {
                switch (accts[doc].answer1) {
                    case 'AL':
                        returnDoc.Q1.AL += 1;
                        break;
                    case 'Ak' :
                        returnDoc.Q1.AK += 1;
                        break;
                    case 'AZ':
                        returnDoc.Q1.AZ += 1;
                        break;
                    case 'AR':
                        returnDoc.Q1.AR += 1;
                        break;
                    case 'CA' :
                        returnDoc.Q1.CA += 1;
                        break;
                    case 'CO' :
                        returnDoc.Q1.CO += 1;
                        break;
                    case 'CT' :
                        returnDoc.Q1.CT += 1;
                        break;
                    case 'DE' :
                        returnDoc.Q1.DE += 1;
                        break;
                    case 'FL' :
                        returnDoc.Q1.FL += 1;
                        break;
                    case 'GA' :
                        returnDoc.Q1.GA += 1;
                        break;
                    case 'HI' :
                        returnDoc.Q1.HI += 1;
                        break;
                    case 'ID' :
                        returnDoc.Q1.ID += 1;
                        break;
                    case 'IL' :
                        returnDoc.Q1.IL += 1;
                        break;
                    case 'IN' :
                        returnDoc.Q1.IN += 1;
                        break;
                    case 'IA' :
                        returnDoc.Q1.IA += 1;
                        break;
                    case 'KS' :
                        returnDoc.Q1.KS += 1;
                        break;
                    case 'KY' :
                        returnDoc.Q1.KY += 1;
                        break;
                    case 'LA' :
                        returnDoc.Q1.LA += 1;
                        break;
                    case 'ME' :
                        returnDoc.Q1.ME += 1;
                        break;
                    case 'MD' :
                        returnDoc.Q1.MD += 1;
                        break;
                    case 'MA' :
                            returnDoc.Q1.MA += 1;
                        break;
                    case 'MI' :
                        returnDoc.Q1.MI += 1;
                        break;
                    case 'MN' :
                        returnDoc.Q1.MN += 1;
                        break;
                    case 'MS' :
                        returnDoc.Q1.MS += 1;
                        break;
                    case 'MO' :
                        returnDoc.Q1.MO += 1;
                        break;
                    case 'MT' :
                        returnDoc.Q1.MT += 1;
                        break;
                    case 'NV' :
                        returnDoc.Q1.NV += 1;
                        break;
                    case 'NH' :
                        returnDoc.Q1.NH += 1;
                        break;
                    case 'NJ' :
                        returnDoc.Q1.NJ += 1;
                        break;
                    case 'NM' :
                        returnDoc.Q1.NM += 1;
                        break;
                    case 'NY' :
                        returnDoc.Q1.NY += 1;
                        break;
                    case 'NC' :
                        returnDoc.Q1.NC += 1;
                        break;
                    case 'ND' :
                        returnDoc.Q1.ND += 1;
                        break;
                    case 'OH' :
                        returnDoc.Q1.OH += 1;
                        break;
                    case 'OK' :
                        returnDoc.Q1.OK += 1;
                        break;
                    case 'OR' :
                        returnDoc.Q1.OR += 1;
                        break;
                    case 'PA' :
                        returnDoc.Q1.PA += 1;
                        break;
                    case 'RI' :
                        returnDoc.Q1.RI += 1;
                        break;
                    case 'SC' :
                        returnDoc.Q1.SC += 1;
                        break;
                    case 'SD' :
                        returnDoc.Q1.SD += 1;
                        break;
                    case 'TN' :
                        returnDoc.Q1.TN += 1;
                        break;
                    case 'TX' :
                        returnDoc.Q1.TX += 1;
                        break;
                    case 'UT' :
                        returnDoc.Q1.UT= 1;
                        break;
                    case 'VT' :
                        returnDoc.Q1.VT += 1;
                        break;
                    case 'VA' :
                        returnDoc.Q1.VA += 1;
                        break;
                    case 'WA' :
                        returnDoc.Q1.WA += 1;
                        break;
                    case 'WV' :
                        returnDoc.Q1.WV += 1;
                        break;
                    case 'WI' :
                        returnDoc.Q1.WI += 1;
                        break;
                    case 'WY' :
                        returnDoc.Q1.WY += 1;
                        break;

                    default:
                        break;
                }
            }
            if(accts[doc].answer2) {
                switch (accts[doc].answer2) {
                    case 'Pop':
                        returnDoc.Q2.Pop += 1;
                        break;
                    case 'Hip-hop':
                        returnDoc.Q2.Hiphop += 1;
                        break;
                    case 'Rock':
                        returnDoc.Q2.Rock += 1;
                        break;
                    case 'Rap':
                        returnDoc.Q2.Rap += 1;
                        break;
                    case 'Electronic':
                        returnDoc.Q2.Electronic += 1;
                        break;
                    case 'Other':
                        returnDoc.Q2.Other += 1;
                        break;
                    default:
                        break;
                }
            }
            if(accts[doc].answer3) {
                switch (accts[doc].answer3) {
                    case 'Dog':
                        returnDoc.Q3.Dog += 1;
                        break;
                    case 'Cat':
                        returnDoc.Q3.Cat += 1;
                        break;
                    case 'Rabbit':
                        returnDoc.Q3.Rabbit += 1;
                        break;
                    case 'Turtle':
                        returnDoc.Q3.Turtle += 1;
                        break;
                    case 'Fox':
                        returnDoc.Q3.Fox += 1;
                        break;
                    case 'Other':
                        returnDoc.Q3.Other += 1;
                        break;
                    default:
                        break;
                }
            }
        }
        console.log(returnDoc);
        res.send(returnDoc);
    });
};
