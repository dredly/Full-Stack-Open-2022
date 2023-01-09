const { Session } = require('../models')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const authorization = req.get('authorization')
    if (!authorization) {
        return res.status(401).json({
            error: 'No authorisation'
        })
    }
    const numSessionsDeleted = await Session.destroy({
        where: {
            token: authorization.substring(7)
        }
    })
    if (numSessionsDeleted === 0) {
        return res.status(400).json({
            error: 'already logged out'
        })
    }
    return res.status(200).json({
        logout: 'logged out successully'
    })
})

module.exports = router