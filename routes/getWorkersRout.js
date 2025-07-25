const express = require('express');
const router = express.Router();
const config = require('../config');
const mysql = require('mysql2');

router.get('/', (req, res) => {
    // connection.connect();
    const connection = mysql.createConnection(config);
    let query = 'SELECT * FROM dbregno.workersdb'
    connection.query(query, (error, data) => {
        if (error) {
            console.log(error);
        }
        //     console.log(typeof (data));
        res.send(data)
        connection.end()
    })


})
router.get('/:id', (req, res) => {
    const connection = mysql.createConnection(config);

    connection.connect();
    let query = 'SELECT * FROM dbregno.workersdb'
    connection.query(query, (error, data) => {
        if (error) {
            console.log(error);

        };
        const idUser = data.find(worker => Number(worker.id) == req.params.id);
        if (!idUser) {
            return res.status(404).json({ error: 'USER не знайдено' });
        }
        res.json(idUser);

    })

});

module.exports = router;