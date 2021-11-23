const express = require('express')
const router = express.Router();
const db = require('../config/db');

router.get('/single', (req,res) => {
// returns a single bagage

    db.query('EXEC SelectBagage :BagageId',
    {replacements: { BagageId: req.query.babageId }})
        .then(data => {
            res.json({data: data});
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/search', (req,res) => {
// returns a list of bagages

    let query = 'EXEC SearchBagages '
    const replacements = {}
    if(req.query.mass != undefined) {query += ':Mass, '; replacements.Mass = req.query.mass }
    if(req.query.pricePercentage != undefined) {query += ':PricePercentage, '; replacements.PricePercentage = req.query.pricePercentage }

    db.query(query, 
    {replacements: replacements})
        .then(data   => {
            res.json({data: data});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.post('/create', (req, res) => {
// creates a new bagage

    db.query('EXEC CreateBagage :Mass, :PricePercentage', 
    {replacements: { Mass: req.body.mass, PricePercentage: req.body.pricePercentage}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.put('/update', (req, res) => {
// updates a single bagage
    
    db.query('EXEC UpdateBagage :BagageId, :Mass, :PricePercentage', 
    {replacements: { BagageId: req.body.babageId, Mass: req.body.mass, PricePercentage: req.body.pricePercentage}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.delete('/delete', (req,res) => {
// deletes a single bagage
    
    db.query('EXEC DeleteBagage :BagageId',
    {replacements: { BagageId: req.query.bagageId }})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

module.exports = router;


