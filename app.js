const express = require('express');
const app = express();
const _PORT = 8000;
const cors = require('cors')
//const auth = require("./middleware/auth");

// dependencies
app.use(cors())
/*
app.get('/', auth, (req,res) => {
    //res.json({msg:'Welcome to FBS Air API!'})
    res.status(200).send("Welcome 🙌 ");
})
*/
// routes
app.use(express.json());
const airplanes = require('./routes/airplanes');
const bagages = require('./routes/bagages');
const seats = require('./routes/seats');
const flights = require('./routes/flights');
const tickets = require('./routes/tickets');
const directions = require('./routes/directions');
const users = require('./routes/users');
const categories = require('./routes/categories');
const locations = require('./routes/locations');
const roles = require('./routes/roles');

// use routes defined above
app.use('/flights', flights);
app.use('/tickets', tickets);
app.use('/directions', directions);
app.use('/users', users);
app.use('/categories', categories);
app.use('/locations', locations);
app.use('/airplanes', airplanes);
app.use('/bagages', bagages);
app.use('/seats', seats);
app.use('/roles', roles);

// connection listner
app.listen(_PORT, () => {
    console.log('Connection Successful!')
})