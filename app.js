const express = require('express');

const config = require('./config');
const path = require('path');
const app = express();
const PORT = 4000;
const mysql = require('mysql2');
//const router = express.Router();
const session = require('express-session');
const connection = mysql.createConnection(config);
const getWorkersRout = require('./routes/getWorkersRout');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret-very!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));

function postMiddleware(req, res, next) {
    //const { email, password } = req.body;
    const email = req.body.email?.trim() || '';
    const password = req.body.password?.trim() || '';
    // console.log('email', email);
    // console.log('pass', password);
    if (email == '' || password == '') {
        res.send('nema')
    } else {
        const connection = mysql.createConnection(config);
        connection.connect();
        let query = 'SELECT * FROM dbusers.listusers'
        connection.query(query, (error, data) => {
            if (error) {
                console.log(error);

            };
            const userFind = data.find(user => user.email == email && user.pass == password);
            console.log(userFind);

            if (userFind) {
                console.log(userFind);
                next()
            } else {
                res.end('error:User not found!')
            }
        })
        // next()
    }
}

app.post('/login', postMiddleware, (req, res) => {
    console.log('postMeth', req.body);
    req.session.user = 'ihor'

    if (req.session.user) {
        res.redirect('/index');
    } else {
        res.send('zalogintes')
    }

})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Помилка при виході');
        res.clearCookie('connect.sid');
        res.send('vuishov');
    });
})

app.get('/index', (req, res) => {

    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})