const { Reading } = require('../models')
const { tokenExtractor } = require('../middleware')

const router = require('express').Router()

router.post("/", async (req, res, next) => {
    try {
        const reading = await Reading.create(req.body)
        res.json(reading)
    } catch (err) {
        next(err)
    }
})

router.put("/:id", tokenExtractor, async (req, res, next) => {
    const reading = await Reading.findByPk(req.params.id)
    if (!reading) {
        return res.status(404).json({ error: "Reading not found" })
    }
    if (reading.userId !== Number(req.decodedToken.id)) {
        return res.status(403).json({ error: "You may only update your own readings" })
    }
    try {
        const updatedReading = await reading.update({
            read: req.body.read
        }, {
            returning: true
        })
        return res.json(updatedReading)
    } catch (err) {
        next(err)
    }
})

module.exports = router