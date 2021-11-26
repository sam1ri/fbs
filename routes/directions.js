const express = require('express')
const router = express.Router();
const db = require('../config/db');

router.get('/single', (req,res) => {
// returns a single direction

    db.query('EXEC SelectDirection :DirectionId',
    {replacements: { DirectionId: req.query.directionId }, logging: console.log})
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
// returns a list of directions

    let query = 'EXEC SearchDirections ';
    const { departureId, arrivalId } = req.query;
    query += `:departureId, :arrivalId`
    let replacements = {
        departureId: departureId == undefined ? null : departureId,
        arrivalId: arrivalId == undefined ? null : arrivalId
    }

    db.query(query, 
    {replacements: replacements, logging: console.log})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.post('/create', (req, res) => {
// creates a new flight

    db.query('EXEC CreateDirection :DepartureId, :ArrivalId', 
    {replacements: { DepartureId: req.body.departureId, ArrivalId: req.body.arrivalId}, logging: console.log})
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
// creates a single flight
    
    db.query('EXEC UpdateDirection :DirectionId, :DepartureId, :ArrivalId', 
    {replacements: { DirectionId: req.body.directionId, DepartureId: req.body.departureId, ArrivalId: req.body.arrivalId}, logging: console.log})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        }) 
})

router.delete('/delete', (req, res) => {
    // creates a single flight
        
        db.query('EXEC DeleteDirection :DirectionId', 
        {replacements: { DirectionId: req.body.directionId}, logging: console.log})
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


