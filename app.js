const express = require('express');
const app = express();
const _PORT = 8000;
const cors = require('cors')

// dependencies
app.use(cors())

app.post('/test', (req,res) => {
    res.json({msg: req.query.name})
})

// routes
const flights = require('./routes/flights');



app.use('/flights', flights);

app.listen(_PORT, () => {
    console.log('Connection Successful!')
})