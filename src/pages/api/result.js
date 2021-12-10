const { decrypt } = require("../../utils/cryptografer");
const Amigo = require("../../db/model/amigo");
const DB = require('../../db/connection')

export default async function handler(req, res) {
	if (req.method === "GET") {
		const { phone } = req.query;
		const data = await Amigo.findOne({ where: { phone } })
		var amigosecreto = ''

		if (data.visualized) {
			amigosecreto = 'javisto'
		} else {
			data.friend ? amigosecreto = decrypt(data.friend) : amigosecreto = 'semsorteio'
		}

		return res.json({
			amigosecreto
		})


	} else {
		res.status(400).json({ message: "ERRO" });
	}
}
