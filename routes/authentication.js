const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const jwt_key = require('../configs/jwt-key')
const db = require('../config/db');


router.post('/signup', (req, res) => {

    try {
        // Get user input
        const { name, surname, email, password } = req.body;

        // Validate user input
        if (!(email && password && name && surname)) {
            return res.status(400).send("All input is required");
        }
        const saltRounds = 10

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                //
                db.query('EXEC FindUser :Email', { replacements: { Email: email }, nest: true })
                    .then(data => {
                        console.log(data)
                        if (data.length != 0)
                            return res.status(409).json({ errMsg: "User Already Exist. Please Login" });

                        // Create user in our database
                        db.query('EXEC CreateUser :Name, :Surname, :Email, :RoleId, :Password',
                            { replacements: { Name: name, Surname: surname, Email: email, RoleId: 2, Password: hash } })
                            .then(data => {
                                res.json({ msg: 'User created successfully!' });
                            })
                            .catch(err => {
                                console.log(err)
                                res.statusMessage = "Something went wrong!";
                                res.status(503).end();
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        res.statusMessage = "Something went wrong!";
                        res.status(503).end();
                    })
            })
        })



        // check if user already exist
        // Validate if user exist in our database


        //Encrypt user password
        //   encryptedPassword = await bcrypt.hash(password, 10);

        //   // Create token
        //   const token = jwt.sign(
        //       { email },
        //       process.env.TOKEN_KEY,
        //       {
        //         expiresIn: "2h",
        //       }
        //     );



    } catch (err) {
        console.log(err);
    }
})

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    const key = require('../config/jwt-key');
    if (email && password) {
        db.query('EXEC FindUser :Email', { replacements: { Email: email }, nest: true })
            .then(data => {
                if (data.length == 0)
                    return res.status(409).json({ errMsg: "User not found!" });
                data = data[0];
                console.log(data)
                bcrypt.compare(password, data.Password, function (err, isMatch) {
                    if (isMatch) {
                        jwt.sign({ id: data.Id, name: data.Emri, last_name: data.Mbiemri, email: data.Email, role_id: data.RoleId }, key, { expiresIn: '3600s' }, (err, token) => {
                            res.json({
                                token: token
                            })
                        })
                    }
                    else {
                        res.json({ error: "Incorrect Password" });
                    }
                });
            })
            .catch(err => res.json(err))
    }
    else {
        res.json({ error: "All data must be filled" });
    }
})

module.exports = router