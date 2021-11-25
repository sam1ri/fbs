const express = require('express')
const router = express.Router();
const db = require('../config/db');

router.get('/single', (req,res) => {
// returns a single airplane

    db.query('EXEC SelectAirplane :AirplaneId',
    {replacements: { AirplaneId: req.query.airplaneId }})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/search', (req,res) => {
// returns a list of airplanes

    let query = 'EXEC SearchAirplanes '
    const replacements = {}
    if(req.query.name != undefined) {query += ':Name, '; replacements.Name = req.query.name }
    if(req.query.kmHr != undefined) {query += ':KmHr, '; replacements.kmHr = req.query.kmHr }

    db.query(query, 
    {replacements: replacements})
        .then(data   => {
            res.json({data: data});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.post('/create', (req, res) => {
// creates a new airplane

    db.query('EXEC CreateAirplane :Name, :KmHr', 
    {replacements: { Name: req.body.name, KmHr: req.body.kmHr}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.put('/update', (req, res) => {
// updates a single airplane
    
    db.query('EXEC UpdateAirplane :AirplaneId, :Name, :KmHr', 
    {replacements: { AirplaneId: req.body.airplaneId, Name: req.body.name, KmHr: req.body.airplaneId}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.delete('/delete', (req,res) => {
// deletes a single airplane
    
    db.query('EXEC DeleteAirplane :AirplaneId',
    {replacements: { AirplaneId: req.query.airplaneId }})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

module.exports = router;


