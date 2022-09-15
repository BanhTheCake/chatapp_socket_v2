'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Friends extends Model {
        static associate(models) {
            // define association here
        }
    }
    Friends.init(
        {
            userId: {
                type: DataTypes.STRING,
            },
            friendUserId: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'Friends',
        }
    );
    return Friends;
};
