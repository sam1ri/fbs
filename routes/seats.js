const express = require('express')
const router = express.Router();
const db = require('../configs/db');

router.get('/single', (req,res) => {
// returns a single seat

    db.query('EXEC SelectSeat :SeatId',
    {replacements: { SeatId: req.query.seatId }})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/search', (req,res) => {
// returns a list of seats

    let query = 'EXEC SearchSeats '
    const replacements = {}
    if(req.query.name != undefined) {query += ':Name, '; replacements.Name = req.query.name }
    if(req.query.airplaneId != undefined) {query += ':AirplaneId, '; replacements.AirplaneId = req.query.airplaneId }
    if(req.query.categoryId != undefined) {query += ':CategoryId, '; replacements.CategoryId = req.query.categoryId }

    db.query(query, 
    {replacements: replacements})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.post('/create', (req, res) => {
// creates a new seat

    db.query('EXEC CreateSeat :Name, :AirplaneId, :CategoryId', 
    {replacements: { Name: req.body.name, AirplaneId: req.body.airplaneId, CategoryId: req.body.categoryId}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.put('/update', (req, res) => {
// updates a single seat
    
    db.query('EXEC UpdateSeat :SeatId, :Name, :AirplaneId, :CategoryId', 
    {replacements: { SeatId: req.body.seatId, Name: req.body.name, AirplaneId: req.body.airplaneId, CategoryId: req.body.categoryId}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.delete('/delete', (req,res) => {
// deletes a single seat
    
    db.query('EXEC DeleteSeat :SeatId',
    {replacements: { SeatId: req.query.seatId }})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

module.exports = router;


