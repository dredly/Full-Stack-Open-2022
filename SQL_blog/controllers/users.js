const router = require('express').Router();
const { User, Blog, Session } = require('../models');
const { tokenExtractor } = require('../middleware');

const isAdmin = async (req, res, next) => {
    const user = await User.findByPk(req.decodedToken.id)
    if (!user.admin) {
        return res.status(401).json({ error: 'operation not allowed' })
    }
    next()
}

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] }
        }
    })
    res.json(users)
})

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (err) {
        next(err)
    }
})

router.put('/:username', async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })
    if (!user) {
        return res.status(404).json({ error: "User not found" })
    }
    try {
        const updatedUser = await user.update({
            username: req.body.username
        }, {
            returning: true
        })
        return res.json(updatedUser)
    } catch (err) {
        return res.status(400).json({ error: err })
    }
})

router.put('/:id/disable', tokenExtractor, isAdmin, async (req, res) => {
    const user = await User.findByPk(req.params.id)

    if (user) {
        user.disabled = req.body.disabled
        await user.save()

        if (req.body.disabled) {
            await Session.destroy({
                where: {
                    userId: user.id
                }
            })
        }

        res.json(user)
    } else {
        res.status(404).end()
    }
})

router.get('/:id', async (req, res) => {
    const where = {}

    if (req.query.read) {
        where.read = req.query.read === "true"
    }

    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: [''] },
        include: [
            {
                model: Blog,
                attributes: { exclude: ['userId'] }
            },
            {
                model: Blog,
                as: 'read_blogs',
                attributes: { exclude: ['userId'] },
                through: {
                    attributes: ['id', 'read'],
                    where
                },
                include: {
                    model: User,
                    attributes: ['name']
                }, 
            }
        ]
    })

    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

module.exports = router;