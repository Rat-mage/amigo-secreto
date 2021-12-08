const { Sequelize } = require("sequelize");
const { resolve } = require("path");

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: resolve(__dirname, "amigosecreto.sqlite"),
});

module.exports = sequelize;
