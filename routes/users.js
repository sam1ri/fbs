const express = require('express')
const router = express.Router();
const db = require('../config/db');
require("dotenv").config();

router.get('/single', (req,res) => {
// returns a single user

    db.query('EXEC SelectUser :UserId',
    {replacements: { UserId: req.query.userId }, logging: console.log})
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
// returns a list of users

    let query = 'EXEC SearchUsers ';
    const { name, surname, email, roleId } = req.query;
    query += `:Name, :Surname, :Email, :RoleId`
    let replacements = {
        Name: name == undefined ? null : name,
        Surname: surname == undefined ? null : surname,
        Email: email == undefined ? null : email,
        RoleId: roleId == undefined ? null : roleId
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
/*
// creates a new user
router.post('/create', (req, res) => {

  try {
    // Get user input
    const { name, surname, email, roleId, password } = req.body;

    // Validate user input
    if (!(email && password && name && surname && roleId)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    db.query('EXEC FindUser :Email',
    {replacements: { Email: email }})
        .then(data => {
            if(data.msg == 'exists')
                return res.status(409).send("User Already Exist. Please Login");
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create token
    const token = jwt.sign(
        { email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

    // Create user in our database
    db.query('EXEC CreateUser :Name, :Surname, :Email, :RoleId, :Password :Token', 
    {replacements: { Name: name, Surname: surname, Email: email, RoleId: roleId, Password: encryptedPassword, Token: token}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })

  } catch (err) {
    console.log(err);
  }
})

//https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
// user log in
router.post('/login', (req,res) => {

    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        db.query('EXEC FindUser :Email',
        {replacements: { Email: email }})
            .then(data => {
                if(data.msg == 'exists')
                    return res.status(409).send("User Already Exist. Please Login");
                const user_password = data.password
            })
            .catch(err => {
                res.statusMessage = "Something went wrong!";
                res.status(503).end();
            })
    
        if (await bcrypt.compare(password, user_password)) {
          // Create token
          const token = jwt.sign(
            { email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
})
*/
// updates a single user
router.put('/update', (req, res) => {    

    db.query('EXEC UpdateUser :UserId, :Name, :Surname, :Email, :RoleId, :Password', 
    {replacements: { UserId: req.body.userId, Name: req.body.name, Surname: req.body.surname, Email: req.body.email, RoleId: req.body.roleId, Password: req.body.password}})
        .then(data => {
            res.json({msg: 'Success'});
        })
        .catch(err => {
            console.log(err)
            res.statusMessage = "Something went wrong!";
            res.status(503).end();
        })
})

// deletes a single ticket
router.delete('/delete', (req,res) => {

    db.query('EXEC DeleteUser :UserId',
    {replacements: { UserId: req.query.userId }})
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


