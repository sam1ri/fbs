const express = require('express')
const router = express.Router();
const db = require('../config/db');

router.get('/single', (req,res) => {

// returns a single location

    db.query('EXEC SelectLocation :LocationId',
    {replacements: { LocationId: req.query.locationId }, logging: console.log})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.get('/all', (req,res) => {
// returns all locations

    db.query('EXEC SelectAllLocations', {logging: console.log})
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
// returns a list of locations locations

    db.query('EXEC SearchLocations :queryname', 
    {replacements: { queryname: req.query.name}, logging: console.log, nest: true},)
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
// creates a new location

    db.query('EXEC CreateLocation :Name', 
    {replacements: { Name: req.body.name}, logging: console.log})
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
// updates a single user
    
    db.query('EXEC UpdateLocation :LocationId, :Name', 
    {replacements: { LocationId: req.body.locationId, Name: req.body.name}, logging: console.log})
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
// deletes a single location
    
    db.query('EXEC DeleteLocation :LocationId',
    {replacements: { LocationId: req.body.locationId }, logging: console.log})
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


