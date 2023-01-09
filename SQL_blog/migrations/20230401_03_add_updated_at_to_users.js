const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('users', 'updated_at', {
            type: DataTypes.DATE,
            default: Date.now()
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('users', 'updated_at')
    }
}