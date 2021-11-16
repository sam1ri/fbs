const Sequelize = require('sequelize')
const db = require('../configs/db')

const aeroplanet = db.define('Aeroplanet', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Emertimi: {
        type: Sequelize.STRING
    }

})

module.exports = aeroplanet;
