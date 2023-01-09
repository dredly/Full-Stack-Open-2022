const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.sequelize.query('UPDATE users SET admin=false;')
        await queryInterface.sequelize.query('UPDATE users SET disabled=false;')
        await queryInterface.changeColumn('users', 'admin', {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        })
        await queryInterface.changeColumn('users', 'disabled', {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.changeColumn('users', 'admin', {
            type: DataTypes.BOOLEAN,
            default: false,
        })
        await queryInterface.changeColumn('users', 'disabled', {
            type: DataTypes.BOOLEAN,
            default: false,
        })
    }
}