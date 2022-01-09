const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const db = require('../config/db');

const controller = require('../middleware/controller')

router.get('/single', (req,res) => {
// returns a single flight

    db.query('EXEC SelectFlight :FlightId',
    {replacements: { FlightId: req.query.flightId }, logging: console.log})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(400).end();
        })
})

router.get('/search', controller.isCustomer, (req,res) => {
// returns a list of flights

// if(req.query.departureId == null || req.query.arivalId == null){
//     res.status == 404;
//     res.statusMessage = 'No flight found!';
//     res.json([])
// }

    let query = 'EXEC SearchFlights ';
    const { departureId, arrivalId, date } = req.query;
    query += `:departureId, :arrivalId, :date`
    let replacements = {
        departureId: departureId == undefined ? null : departureId,
        arrivalId: arrivalId == undefined ? null : arrivalId,
        date: date == undefined ? null : date
    }

    db.query(query,
    {replacements: replacements, logging: console.log, nest: true})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(400).end();
        })
})

router.post('/create', (req, res) => {
// creates a new flight

    db.query('EXEC CreateFlight :DirectionId, :AirplaneId, :DepartureDate, :ArrivalDate, :FlightPrice', 
    {replacements: { DirectionId: req.body.directionId, AirplaneId: req.body.airplaneId, DepartureDate: req.body.departureDate, ArrivalDate: req.body.arrivalDate, FlightPrice: req.body.flightPrice  }, logging: console.log})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(400).end();
        })
})

router.put('/update', (req, res) => {
// creates a single flight
    
    db.query('EXEC UpdateFlight :FlightId, :DirectionId, :AirplaneId, :DepartureDate, :ArrivalDate, :FlightPrice', 
    {replacements: { FlightId: req.body.flightId, DirectionId: req.body.directionId, AirplaneId: req.body.airplaneId, DepartureDate: req.body.departureDate, ArrivalDate: req.body.arrivalDate, FlightPrice: req.body.flightPrice  }, logging: console.log})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(400).end();
        })
        
})

module.exports = router;
