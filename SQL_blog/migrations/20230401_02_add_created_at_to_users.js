const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('users', 'created_at', {
            type: DataTypes.DATE,
            default: Date.now()
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('users', 'created_at')
    }
}