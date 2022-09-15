'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            Users.hasMany(models.Messages, {
                foreignKey: 'from',
                sourceKey: 'userId',
            });
            Users.belongsToMany(models.Users, {
                foreignKey: 'userId',
                as: 'friends',
                sourceKey: 'userId',
                through: models.Friends,
            });
            Users.belongsToMany(models.Users, {
              foreignKey: 'friendUserId',
              as: 'userFriends',
              sourceKey: 'userId',
              through: models.Friends,
          });
        }
    }
    Users.init(
        {
            userId: {
                type: DataTypes.STRING,
                unique: true,
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
            },
            image: {
                type: DataTypes.STRING,
            },
            isFirstLogin: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize,
            modelName: 'Users',
        }
    );
    return Users;
};
