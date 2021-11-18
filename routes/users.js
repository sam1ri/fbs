const express = require('express')
const router = express.Router();
const db = require('../configs/db');

router.get('/single', (req,res) => {
// returns a single user

    db.query('EXEC SelectUser :UserId',
    {replacements: { TicketId: req.query.userId }})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/search', (req,res) => {
// returns a list of users

    let query = 'EXEC SearchUsers '
    const replacements = {}
    if(req.query.pasangerId != undefined) {query += ':Emri,'; replacements.Emri = req.query.emri }
    if(req.query.pasangerId != undefined) {query += ':Mbiemri,'; replacements.Mbiemri = req.query.mbiemri }
    if(req.query.pasangerId != undefined) {query += ':Email,'; replacements.Email = req.query.email }
    if(req.query.pasangerId != undefined) {query += ':RoleId,'; replacements.RoleId = req.query.roleId }

    db.query(query, 
    {replacements: replacements})
        .then(data => {
            console.log(req.query.pasangerId)
            res.json({data: data});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.post('/create', (req, res) => {
// creates a new user

    db.query('EXEC CreateUser :Emri, :Mbiemri, :Email, :RoleId, :Password', 
    {replacements: { Emri: req.body.emri, Mbiemri: req.body.mbiemri, Email: req.body.email, RoleId: req.body.roleId, Password: req.body.password}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.put('/update', (req, res) => {
// updates a single user
    
    db.query('EXEC UpdateUser :Emri, :Mbiemri, :Email, :RoleId, :Password', 
    {replacements: { Emri: req.body.emri, Mbiemri: req.body.mbiemri, Email: req.body.email, RoleId: req.body.roleId, Password: req.body.password}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.delete('/delete', (req,res) => {
    // deletes a single ticket
    
    db.query('EXEC DeleteUser :UserId',
    {replacements: { TicketId: req.query.ticketId }})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

module.exports = router;


