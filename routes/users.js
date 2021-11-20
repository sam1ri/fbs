const express = require('express')
const router = express.Router();
const db = require('../configs/db');

router.get('/single', (req,res) => {
// returns a single user

    db.query('EXEC SelectUser :UserId',
    {replacements: { UserId: req.query.userId }})
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
    if(req.query.name != undefined) {query += ':Name, '; replacements.Name = req.query.name }
    if(req.query.surname != undefined) {query += ':Surname, '; replacements.Surname = req.query.surname }
    if(req.query.email != undefined) {query += ':Email, '; replacements.Email = req.query.email }
    if(req.query.roleId != undefined) {query += ':RoleId, '; replacements.RoleId = req.query.roleId }

    // EXEC SearchUsers :Name, :Surname,

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
// creates a new user

    db.query('EXEC CreateUser :Name, :Surname, :Email, :RoleId, :Password', 
    {replacements: { Name: req.body.name, Surname: req.body.surname, Email: req.body.email, RoleId: req.body.roleId, Password: req.body.password}})
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
    
    db.query('EXEC UpdateUser :Name, :Surname, :Email, :RoleId, :Password', 
    {replacements: { Name: req.body.name, Surname: req.body.surname, Email: req.body.email, RoleId: req.body.roleId, Password: req.body.password}})
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
    {replacements: { UserId: req.query.userId }})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

module.exports = router;


