'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Messages extends Model {
        static associate(models) {
            Messages.belongsTo(models.Users, { foreignKey: 'from', targetKey: 'userId' })
        }
    }
    Messages.init(
        {
            from: {
                type: DataTypes.STRING,
            },
            to: {
                type: DataTypes.STRING,
            },
            text: {
                type: DataTypes.TEXT,
            },
        },
        {
            sequelize,
            modelName: 'Messages',
        }
    );
    return Messages;
};
