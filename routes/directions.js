const express = require('express')
const router = express.Router();
const db = require('../config/db');

router.get('/single', (req,res) => {
// returns a single direction

    db.query('EXEC SelectDirection :DirectionId',
    {replacements: { DirectionId: req.query.directionId }})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/search', (req,res) => {
// returns a list of directions

    db.query('EXEC SearchDirections :DepartureId, :ArrivalId', 
    {replacements: { DepartureId: req.query.departureId, ArrivalId: req.query.arrivalId}})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            res.json(err)
        })
})

router.post('/create', (req, res) => {
// creates a new flight

    db.query('EXEC CreateDirection :DepartureId, :ArrivalId', 
    {replacements: { DepartureId: req.query.departureId, ArrivalId: req.query.arrivalId}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.json(err)
        })
})

router.put('/update', (req, res) => {
// creates a single flight
    
    db.query('EXEC UpdateDirection :DirectionId, :DepartureId, :ArrivalId', 
    {replacements: { DepartureId: req.query.departureId, ArrivalId: req.query.arrivalId}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.json(err)
        }) 
})

router.delete('/delete', (req, res) => {
    // creates a single flight
        
        db.query('EXEC DeleteDirection :DirectionId', 
        {replacements: { DepartureId: req.query.departureId, ArrivalId: req.query.arrivalId}})
            .then(data => {
                res.json({msg: 'Success'});
            })
            .catch(err => {
                res.json(err)
            }) 
    })

module.exports = router;


