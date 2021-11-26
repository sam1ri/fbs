const express = require('express')
const router = express.Router();
const db = require('../config/db');

router.get('/single', (req,res) => {
// returns a single airplane

    db.query('EXEC SelectAirplane :AirplaneId',
    {replacements: { AirplaneId: req.query.airplaneId }, logging: console.log})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.get('/search', (req,res) => {
// returns a list of airplanes

    let query = 'EXEC SearchAirplanes ';
    const { name, kmHr} = req.query;
    query += `:Name, :KmHr`
    let replacements = {
        Name: name == undefined ? null : name,
        KmHr: kmHr == undefined ? null : kmHr,
    }

    db.query(query,
    {replacements: replacements, logging: console.log})
        .then(data   => {
            res.json({data: data});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.post('/create', (req, res) => {
// creates a new airplane

    db.query('EXEC CreateAirplane :Name, :KmHr', 
    {replacements: { Name: req.body.name, KmHr: req.body.kmHr}, logging: console.log})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.put('/update', (req, res) => {
// updates a single airplane
    
    db.query('EXEC UpdateAirplane :AirplaneId, :Name, :KmHr', 
    {replacements: { AirplaneId: req.body.airplaneId, Name: req.body.name, KmHr: req.body.kmHr}, logging: console.log})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.delete('/delete', (req,res) => {
// deletes a single airplane
    
    db.query('EXEC DeleteAirplane :AirplaneId',
    {replacements: { AirplaneId: req.body.airplaneId }, logging: console.log})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

module.exports = router;


