const express = require('express')
const router = express.Router();
const db = require('../config/db');

router.get('/single', (req,res) => {
// returns a single seat

    db.query('EXEC SelectSeat :SeatId',
    {replacements: { SeatId: req.query.seatId }, logging: console.log})
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
// returns a list of seats

    let query = 'EXEC SearchSeats ';
    const { name, airplaneId, categoryId } = req.query;
    query += `:Name, :AirplaneId, :CategoryId`
    let replacements = {
        Name: name == undefined ? null : name,
        AirplaneId: airplaneId == undefined ? null : airplaneId,
        CategoryId: categoryId == undefined ? null : categoryId
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
// creates a new seat

    db.query('EXEC CreateSeat :Name, :AirplaneId, :CategoryId', 
    {replacements: { Name: req.body.name, AirplaneId: req.body.airplaneId, CategoryId: req.body.categoryId}, logging: console.log})
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
// updates a single seat
    
    db.query('EXEC UpdateSeat :SeatId, :Name, :AirplaneId, :CategoryId', 
    {replacements: { SeatId: req.body.seatId, Name: req.body.name, AirplaneId: req.body.airplaneId, CategoryId: req.body.categoryId}, logging: console.log})
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
// deletes a single seat
    
    db.query('EXEC DeleteSeat :SeatId',
    {replacements: { SeatId: req.body.seatId }, logging: console.log})
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


