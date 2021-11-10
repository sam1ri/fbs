const express = require('express');
const app = express();
const _PORT = 8000;

app.post('/test', (req,res) => {
    res.json({msg: req.query.name})
})





app.listen(_PORT, () => {
    console.log('Connection Successful!')
})