const db = require("../database");
const { DataTypes, Sequelize } = require("sequelize");

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  threshold: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

User.sync();
module.exports = User;
