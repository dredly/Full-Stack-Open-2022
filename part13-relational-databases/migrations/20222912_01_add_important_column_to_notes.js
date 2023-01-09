const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('notes', 'important', {
            type: DataTypes.BOOLEAN,
            default: false
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('notes', 'important')
    }
}