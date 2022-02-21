const Sequelize = require("sequelize");
const database = require("../connection");

const Friend = database.define("friend", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	accessCode: {
		type: Sequelize.STRING,
	},
	friend: {
		type: Sequelize.STRING,
		defaultValue: null
	},
	visualized: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
});

module.exports = Friend;
