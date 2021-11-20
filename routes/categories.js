const express = require('express')
const router = express.Router();
const db = require('../configs/db');

router.get('/single', (req,res) => {
// returns a single category

    db.query('EXEC SelectCategory :CategoryId',
    {replacements: { CategoryId: req.query.categoryId }})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/search', (req,res) => {
// returns a list of categories

    let query = 'EXEC SearchCategories '
    const replacements = {}
    if(req.query.name != undefined) {query += ':Name, '; replacements.Name = req.query.name }
    if(req.query.pricePercentage != undefined) {query += ':PricePercentage, '; replacements.PricePercentage = req.query.pricePercentage }

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
// creates a new category

    db.query('EXEC CreateCategory :Name, :PricePercentage', 
    {replacements: { Name: req.body.name, PricePercentage: req.body.pricePercentage}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.put('/update', (req, res) => {
// updates a single category
    
    db.query('EXEC UpdateCategory :CategoryId, :Name,:PricePercentage', 
    {replacements: { CategoryId: req.body.categoryId, Name: req.body.name, PricePercentage: req.body.pricePercentage}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.delete('/delete', (req,res) => {
// deletes a single category
    
    db.query('EXEC DeleteCategory :CategoryId',
    {replacements: { CategoryId: req.query.categoryId }})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

module.exports = router;


