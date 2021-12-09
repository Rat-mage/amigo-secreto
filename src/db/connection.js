const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: path.resolve("C:\\www\\amigo-secreto\\web-next\\src\\db\\dbamigosecreto.sqlite"),
});

module.exports = sequelize;
