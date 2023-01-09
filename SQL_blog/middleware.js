const jwt = require('jsonwebtoken')
const { Session } = require('./models')
const { SECRET } = require('./util/config')

const errorHandler = (err, req, res, next) => {
    if (err.name === "SequelizeDatabaseError" || err.name === "SequelizeValidationError") {
        return res.status(400).send({error: `Database integrity error -- ${err.message}`})
    }
    next(err)
}

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            const decodedToken = jwt.verify(authorization.substring(7), SECRET)
            const session = await Session.findOne({
                where: {
                    token: authorization.substring(7)
                }
            })
            if (!session) {
                return res.status(401).json({ error: "No session found" })
            }
            req.decodedToken = decodedToken
        } catch (err) {
            return res.status(401).json({error: "Token invalid"})
        }
    } else {
        return res.status(401).json({error: "Token missing"})
    }
    next()
}

module.exports = {
    errorHandler,
    tokenExtractor
}