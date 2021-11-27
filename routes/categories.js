const express = require('express')
const router = express.Router();
const db = require('../config/db');

router.get('/single', (req,res) => {
// returns a single category

    db.query('EXEC SelectCategory :CategoryId',
    {replacements: { CategoryId: req.query.categoryId }, logging: console.log})
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
// returns a list of categories

    let query = 'EXEC SearchCategories ';
    const { name, pricePercentage } = req.query;
    query += `:Name, :PricePercentage`
    let replacements = {
        Name: name == undefined ? null : name,
        PricePercentage: pricePercentage == undefined ? null : pricePercentage,
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
// creates a new category

    db.query('EXEC CreateCategory :Name, :PricePercentage', 
    {replacements: { Name: req.body.name, PricePercentage: req.body.pricePercentage}, logging: console.log})
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
// updates a single category
    
    db.query('EXEC UpdateCategory :CategoryId, :Name, :PricePercentage', 
    {replacements: { CategoryId: req.body.categoryId, Name: req.body.name, PricePercentage: req.body.pricePercentage}, logging: console.log})
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
// deletes a single category
    
    db.query('EXEC DeleteCategory :CategoryId',
    {replacements: { CategoryId: req.body.categoryId }, logging: console.log})
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


