const Blog = require('./blog')
const User = require('./user')
const Reading = require('./reading')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(Session)
Session.belongsTo(User)

User.belongsToMany(Blog, { through: Reading, as: 'read_blogs' })
Blog.belongsToMany(User, { through: Reading, as: 'read_by_users' })

module.exports = {
    Blog,
    User,
    Reading,
    Session
}