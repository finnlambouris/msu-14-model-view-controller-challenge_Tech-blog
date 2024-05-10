const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    freezeTableName: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
    modelName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        return user;
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
        return user;
      },
    },
  }
);

module.exports = User;