const Sequelize = require("sequelize");
const database = require("../connection");

const Amigo = database.define("Amigo", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	phone: {
		type: Sequelize.INTEGER,
	},
	friend: {
		type: Sequelize.STRING,
		defaultValue: "Ainda não saiu o sorteio!",
	},
	visualized: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
});

module.exports = Amigo;
