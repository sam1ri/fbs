const express = require('express')
const router = express.Router();
const db = require('../config/db');

router.get('/single', (req,res) => {
// returns a single ticket

    db.query('EXEC SelectTicket :TicketId',
    {replacements: { TicketId: req.query.ticketId }})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/search', (req,res) => {
// returns a list of tickets

    let query = 'EXEC SelectTickets '
    const replacements = {}
    if(req.query.pasangerId != undefined) {query += ':PasangerId,'; replacements.PasangerId = req.query.pasangerId }
    if(req.query.pasangerId != undefined) {query += ':FlightId,'; replacements.FlightId = req.query.flightId }
    if(req.query.pasangerId != undefined) {query += ':SeatId,'; replacements.SeatId = req.query.seatId }
    if(req.query.pasangerId != undefined) {query += ':BagageId,'; replacements.BagageId = req.query.bagageId }
    if(req.query.pasangerId != undefined) {query += ':Price,'; replacements.Price = req.query.price }

    db.query(query, 
    {replacements: replacements})
        .then(data => {
            console.log(req.query.pasangerId)
            res.json({data: data});
        })
        .catch(err => {
            res.json(err)
        })
})

router.post('/create', (req, res) => {
// creates a new ticket

    db.query('EXEC CreateTicket :PasangerId, :FlightId, :SeatId, :BagageId, :Price', 
    {replacements: { PasangerId: req.body.pasangerId, FlightId: req.body.flightId, SeatId: req.body.seatId, BagageId: req.body.bagageId, Price: req.body.price}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.json(err)
        })
})

router.put('/update', (req, res) => {
// updates a single ticket
    
    db.query('EXEC UpdateTicket :PasangerId, :FlightId, :SeatId, :BagageId, :Price', 
    {replacements: { LinjaId: req.body.linjaId, AeroplaniId: req.body.AeroplaniId, DataNisjes: req.body.dataNisjes, DataMberritjes: req.body.dataMberritjes, CmimiFluturimit: req.body.cmimiFluturimit  }})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.json(err)
        })
})

router.delete('/delete', (req,res) => {
    // deletes a single ticket
    
    db.query('EXEC DeleteTicket :TicketId',
    {replacements: { TicketId: req.query.ticketId }})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router;


