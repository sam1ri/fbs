const express = require('express');
const app = express();
const _PORT = 3000;
const cors = require('cors')

// dependencies
app.use(cors())

app.get('/', (req,res) => {
    res.json({msg:'Welcome to FBS!'})
})

// routes
const flights = require('./routes/flights');
const tickets = require('./routes/tickets');
const directions = require('./routes/directions');

// use routes defined above
app.use('/flights', flights);
app.use('/tickets', tickets);
app.use('/directions', directions);

app.listen(_PORT, () => {
    console.log('Connection Successful!')
})