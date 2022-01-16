const express = require('express')
const router = express.Router();
const db = require('../config/db');

router.get('/single', (req,res) => {
// returns a single bagage

    db.query('EXEC SelectBagage :BagageId',
    {replacements: { BagageId: req.query.babageId }, logging: console.log})
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
    // returns a single bagage
    
        db.query('EXEC SelectAllBagages',
        {logging: console.log, nest: true})
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
// returns a list of bagages

    let query = 'EXEC SearchBagages ';
    const { mass, pricePercentage } = req.query;
    query += `:Mass, :PricePercentage`
    let replacements = {
        Mass: mass == undefined ? null : mass,
        PricePercentage: pricePercentage == undefined ? null : pricePercentage
    }

    db.query(query,
    {replacements: replacements, logging: console.log})
        .then(data   => {
            res.json({data: data});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

router.post('/create', (req, res) => {
// creates a new bagage

    db.query('EXEC CreateBagage :Mass, :PricePercentage', 
    {replacements: { Mass: req.body.mass, PricePercentage: req.body.pricePercentage}, logging: console.log})
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
// updates a single bagage
    
    db.query('EXEC UpdateBagage :BagageId, :Mass, :PricePercentage', 
    {replacements: { BagageId: req.body.bagageId, Mass: req.body.mass, PricePercentage: req.body.pricePercentage}, logging: console.log})
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
// deletes a single bagage
    
    db.query('EXEC DeleteBagage :BagageId',
    {replacements: { BagageId: req.body.bagageId }, logging: console.log})
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


