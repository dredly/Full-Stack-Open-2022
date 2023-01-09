const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch (err) {
            console.log(err)
            return res.status(401).json({error: "Token invalid"})
        }
    } else {
        return res.status(401).json({error: "Token missing"})
    }
    next()
}

module.exports = { tokenExtractor }