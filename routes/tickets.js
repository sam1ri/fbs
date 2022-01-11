const { v4: uuidv4 } = require('uuid');
const qrcodegen = require('../services/qr-generator')

const express = require('express')
const router = express.Router();
const db = require('../config/db');

router.get('/verify', (req,res) => {
    // returns a single ticket
        db.query('EXEC VerifyTicket :Uuid',
        {replacements: { Uuid: req.query.uuid }, logging: console.log})
            .then(data => {
                res.json({msg: valid});
            })
            .catch(err => {
                console.log(err)
                res.statusMessage = "Not valid!";
                res.status(404).end();
            })
    })

router.get('/single', (req,res) => {
// returns a single ticket

    db.query('EXEC SelectTicket :TicketId',
    {replacements: { TicketId: req.query.ticketId }, logging: console.log})
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
// returns a list of tickets

    let query = 'EXEC SearchTickets ';
    const { pasangerId, flightId, seatId, bagageId, price } = req.query;
    query += `:PasangerId, :FlightId, :SeatId, :BagageId, :Price `
    let replacements = {
        PasangerId: pasangerId == undefined ? null : pasangerId,
        FlightId: flightId == undefined ? null : flightId,
        SeatId: seatId == undefined ? null : seatId,
        BagageId: bagageId == undefined ? null : bagageId,
        Price: price == undefined ? null : price
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
// creates a new ticket

    const uuid = uuidv4();
    const data = `localhost:8000/tickets/verify?uuid=${uuid}`;
    console.log(data)
    db.query('EXEC CreateTicket :PasangerId, :FlightId, :SeatId, :BagageId, :Price, :Uuid', 
    {replacements: { PasangerId: req.body.pasangerId, FlightId: req.body.flightId, SeatId: req.body.seatId, BagageId: req.body.bagageId, Price: req.body.price, Uuid:uuid }, logging: console.log})
        .then(data => {
            qrcodegen(data, req, res)
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.put('/update', (req, res) => {
// updates a single ticket
    
    db.query('EXEC UpdateTicket :TicketId, :PasangerId, :FlightId, :SeatId, :BagageId, :Price', 
    {replacements: { TicketId: req.body.ticketId, PasangerId: req.body.pasangerId, FlightId: req.body.flightId, SeatId: req.body.seatId, BagageId: req.body.bagageId, Price: req.body.price }, logging: console.log})
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
    // deletes a single ticket
    
    db.query('EXEC DeleteTicket :TicketId',
    {replacements: { TicketId: req.body.ticketId }, logging: console.log})
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


