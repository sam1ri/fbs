const Sequelize = require('sequelize')

//localserver
const db = new Sequelize('FBS_DB','sam', 'Samiri123', {
//onlineserver
//  const db = new Sequelize('services_hms','services_user','4vsXoNtOj4i(', {
         host: 'localhost',
         loggin: console.log,
         dialect: 'mssql',
         port: 1433,
         pool: {
             min: 0,
             max: 5,
             acquire: 30000,
             idle: 1000
         },
         define: {
             freezeTableName: true
         },
         logging: false 
     })
db.authenticate()
.then(() => console.log("Database state: Connected "))
.catch(err => console.log(err))

module.exports = db;
