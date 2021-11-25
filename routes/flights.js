const express = require('express')
const router = express.Router();
const db = require('../config/db');

router.get('/single', (req,res) => {
// returns a single flight

    db.query('EXEC SelectFlight :FlightId',
    {replacements: { FlightId: req.query.flightId }})
    .then(data => {
        res.json({data: data});
    })
    .catch(err => {
        res.statusMessage = "Something went wrong!";
        res.status(503).end();
    })
})

router.get('/search', (req,res) => {
// returns a list of flights

    let query = 'EXEC SearchFlights '
    const replacements = {}
    if(req.query.departureId != undefined) {query += ':DepartureId'; replacements.DepartureId = req.query.departureId }
    if(req.query.arrivalId != undefined) {query += ', :ArrivalId '; replacements.ArrivalId = req.query.arrivalId }
    if(req.query.date != undefined) {query += ', :Date'; replacements.Date = req.query.date }
    
    console.log(query)
    console.log(replacements)
    
    db.query(query, 
    {replacements: replacements})
        .then(data   => {
            res.json({data: data});
        })
        .catch(err => {
            res.json(err)
            // res.statusMessage = "Something went wrong!";
            // res.status(503).end();
            
        })

})

router.post('/create', (req, res) => {
// creates a new flight

    db.query('EXEC CreateFlight :DirectionId, :AirplaneId, :DepartureDate, :ArrivalDate, :FlightPrice', 
    {replacements: { DirectionId: req.body.directionId, AirplaneId: req.body.airplaneId, DepartureDate: req.body.departureDate, ArrivalDate: req.body.arrivalDate, FlightPrice: req.body.flightPrice  }})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.put('/update', (req, res) => {
// creates a single flight
    
    db.query('EXEC UpdateFlight :FlightId, :DirectionId, :AirplaneId, :DepartureDate, :ArrivalDate, :FlightPrice', 
    {replacements: { FlightId: req.body.flightId, DirectionId: req.body.directionId, AirplaneId: req.body.airplaneId, DepartureDate: req.body.departureDate, ArrivalDate: req.body.arrivalDate, FlightPrice: req.body.flightPrice  }})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
        
})

module.exports = router;
