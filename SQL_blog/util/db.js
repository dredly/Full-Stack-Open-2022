const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "psql"
})

const migrationConf = {
    migrations: {
        glob: 'migrations/*.js'
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console
}

const runMigrations = async () => {
    const migrator = new Umzug(migrationConf)
    const migrations = await migrator.up()
    console.log('Migrations up to date', {
        files: migrations.map(m => m.name)
    })
}

const connectToDb = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        console.log("Connected to the database")
    } catch (err) {
        console.log("Failed to connect to the database")
        console.log(err)
        return process.exit(1)
    }    

    return null
}

module.exports = { connectToDb, sequelize }