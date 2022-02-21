const Sequelize = require("sequelize");
const database = require("../connection");

const Group = database.define("group", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  groupDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  groupCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  alreadyShuffle: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Group;
