const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.sequelize.query('UPDATE readings SET read=false;')
        await queryInterface.changeColumn('readings', 'read', {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.changeColumn('readings', 'read', {
            type: DataTypes.BOOLEAN,
            default: false
        })
    }
}