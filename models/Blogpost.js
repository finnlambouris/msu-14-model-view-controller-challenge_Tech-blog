const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blogpost extends Model {
  comment() {

  }
}

Blogpost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    freezeTableName: true,
    underscored: true,
    createdAt: true,
    modelName: 'blogposts',
    hooks: {},
  }
);

module.exports = Blogpost;
