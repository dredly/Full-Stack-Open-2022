const router = require('express').Router()
const { Op } = require('sequelize') 
const { Blog, User } = require('../models')
const { tokenExtractor } = require('../middleware')

router.get("/", async (req, res) => {
    let where = {}

    if (req.query.search) {
        where = {
            [Op.or]: {
                title: { [Op.iLike]: `%${req.query.search}%` },
                author: { [Op.iLike]: `%${req.query.search}%` }
            }
        }
    }

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        },
        where,
        order: [['likes', 'DESC']]
    })
    res.json(blogs)
})

router.post("/", tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({ ...req.body, userId: user.id })
        res.json(blog)
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", tokenExtractor, async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog.userId !== Number(req.decodedToken.id)) {
            return res.status(403).json({ error: "You may only delete your own blogs" })
        }
        blog.destroy()
        res.send("Blog deleted")
    } catch (err) {
        res.status(400).json({ error: err })
    }
    
})

router.put("/:id", async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    blog.likes = req.body.likes
    await blog.save()
})

module.exports = router
