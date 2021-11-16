const express = require('express')
const router = express.Router();
const airplane = require('../models/airplane');
const db = require('../configs/db');

router.get('/single', (req,res) => {
    db.query('EXEC TeGjitheAeroplanet')
    .then(data => {
        res.json({data: data});
    })
    .catch(err => {
        res.json(err)
    })
})


// procedure call with parameters

// router.get('/single', (req,res) => {
//     sequelize.query('CALL TeGjitheAeroplanet (:email, :pwd, :device)', 
//     {replacements: { email: "me@jsbot.io", pwd: 'pwd', device: 'android', }})
//         .then(data => {
//             res.json({data: data});
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })







// // models
// const company = require('../models/company')
// const service = require('../models/services')
// const serviceType = require('../models/service_type')
// const companyUser = require('../models/company_users')
// const user = require('../models/user')

// // returns all companies
// router.get('/all', (req, res) => {
    //     company.findAll({
        //         include: [{
            //             model: service,
            //             include: [{
                //                 model: serviceType
                //             }]
                //         }],
                //         order: [
                    //             ['id','DESC']
                    //         ]
                    //     })
                    //         .then(data => {
                        //             res.json(data)
                        //         })
                        //         .catch(err => {
                            //             console.log(err)
                            //         })
                            // })
                            
                            
                            
                            // // returns a single company
                            // router.get('/one', (req, res) => {
                                //     company.findOne({
                                    //         where: {
                                        //             id: req.query.id
//         },
//         include: [
//             {
//                 model: service,
//                 include: [serviceType]
//             }
//         ]
//     })
//         .then(async data => {
//             if(data){
//                 let company = data.dataValues;
//                 companyUser.findAll({
//                     where: {
//                         company_id: req.query.id
//                     },
//                     include:[
//                         {
//                             model: user,
//                         }
//                     ]
//                 })
//                 .then( data => {
//                     let result;
//                     let users = [];
//                     data.forEach(el => {
//                         users.push(el.dataValues.users[0].dataValues)
//                     });
//                     result = {...company, users: users}
//                     res.json(result)
//                     })
//                     .catch(err => console.log(err));
//                 }
//                 else res.json({msg: 'no such data'})
//         })
//         .catch(err => console.log(err))
// })

// // creates a new company
// router.post('/create', (req, res) => {

//     company.findOne({
//         where: {
//             email: req.body.email
//         }
//     })
//         .then(data => {
//             if(!data){
//                 company.create({
//                     name: req.body.name,
//                     email: req.body.email,
//                     phone: req.body.phone,
//                     address: req.body.address,
//                     person_of_contact: req.body.personOfContact,
//                     reminder: req.body.reminder,
//                     reminder_frequence: req.body.reminderFrequence
//                 })
//                     .then(data => {

//                         req.body.user_id.forEach(el => {
//                             companyUser.create({
//                                 company_id: data.dataValues.id,
//                                 user_id: el
//                             })
//                             .then(data => {

//                             })
//                             .catch(err => {
//                                 res.json(err);  
//                             }) 
//                         });
//                         res.json({msg: 'Success'})
//                     })
//                     .catch(err => res.json(err))
//             }
//             else{
//                 res.json({errMsg: "Email already taken."})
//             }
//         })
// })

// router.post('/assign-single-client', (req,res) => {
//     let client = req.body.data.client;
//     let company_id = req.body.data.company_id;
//     user.create(client)
//         .then(data => {
//             companyUser.create({
//                 user_id: data.dataValues.id,
//                 company_id: company_id
//             })
//                 .then(data => {
//                     res.json({msg: "User assigned successfully !"})
//                 })
//                 .catch(err => {
//                     res.json({msg: "Couln't assign user !", err: err})
//                 })
//         })
//         .catch(err => {
//             res.json({msg: "Couln't create user", err: err})
//         })
// })

// router.post('/assign-users', (req,res) => {
//     let users = req.body.users;
//     let company_id = req.body.company_id;
//     let msg = `Users couldn't update !`;
//     let usersBulk = [];
//     users.forEach(el => {
//         usersBulk.push({
//             user_id: el,
//             company_id: company_id
//         })
//     })

//     companyUser.findAll({
//         where: {
//             company_id: req.body.company_id
//         }
//     })
//         .then(data => {
//             companyUser.destroy({
//                 where: {
//                     company_id: company_id
//                 }
//             })
//                 .then(data => {
//                     companyUser.bulkCreate(usersBulk)
//                         .then(data => {
//                             res.json({msg: 'Users saved successfully !'})
//                         })
//                         .catch(err => res.json(err))
//                 })
//                 .catch(err => {
//                     res.json(err);
//                 })
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })

// // updates a company (default: by id)
// router.put('/update', (req, res) => {

//     company.findOne({
//         where: {
//             email: req.body.email
//         }
//     })
//         .then(data => {
//             if(!data || data.dataValues.email == req.body.email){
//                 company.update({
//                     name: req.body.name,
//                     email: req.body.email,
//                     phone: req.body.phone,
//                     address: req.body.address,
//                     person_of_contact: req.body.person_of_contact,
//                     reminder: req.body.reminder,
//                     reminder_frequence: req.body.reminder_frequence
//                 }, {
//                     where: {
//                         id: req.body.id
//                     }
//                 })
//                     .then(data => res.json(data))
//                     .catch(err => console.log(err))
//             }
//         })
//         .catch()
// })

module.exports = router;
