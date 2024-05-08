const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    blogpost_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "blogposts",
        key: "id",
      },
    },
  },
  {
    sequelize: sequelize,
    freezeTableName: true,
    underscored: true,
    createdAt: true,
    modelName: 'comments',
    hooks: {},
  }
);

module.exports = Comment;
