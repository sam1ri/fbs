const jwt = require('jsonwebtoken')
const jwt_key = require('./jwt-key')

module.exports = checkToken = (req, res, next) => {
    
    if(req.headers.token){
        const token = req.headers.token
        jwt.verify(token, jwt_key, (err, decoded) => {
            if(!err){
                next()
            }
            else
                res.json({errMsg: 'invalid entry'})
        })
    }
    else {
        res.json({errMsg: 'invalid entry'})
    }

}