const { decrypt } = require("../../utils/cryptografer");
const Amigo = require("../../db/model/amigo");

export default async function handler(req, res) {
	if (req.method === "GET") {

		const { phone } = req.query;

		const data = await Amigo.findOne({ where: { phone } })
		const amigosecreto = decrypt(data.friend)
		res.json(amigosecreto)


	} else {
		res.status(400).json({ message: "ERRO" });
	}
}
