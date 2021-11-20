const express = require('express')
const router = express.Router();
const db = require('../configs/db');

router.get('/single', (req,res) => {
// returns a single role

    db.query('EXEC SelectRole :RoleId',
    {replacements: { RoleId: req.query.roleId }})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/all', (req,res) => {
// returns all roles

    db.query('EXEC SelectAllRoles')
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            res.json(err)
        })
})

router.post('/create', (req, res) => {
// creates a new role

    db.query('EXEC CreateRole :Name', 
    {replacements: { Name: req.body.name}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.put('/update', (req, res) => {
// updates a single role
    
    db.query('EXEC UpdateRole :RoleId, :Name', 
    {replacements: { RoleId: req.body.roleId, Name: req.body.name}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.delete('/delete', (req,res) => {
// deletes a single role
    
    db.query('EXEC DeleteRole :RoleId',
    {replacements: { RoleId: req.query.roleId }})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

module.exports = router;


