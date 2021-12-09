// const { decrypt } = require("../../utils/cryptografer");
const Amigo = require("../../db/model/amigo");
const DB = require('../../db/connection')

export default async function handler(req, res) {
	if (req.method === "GET") {

		const { phone } = req.query;

		const data = await Amigo.findOne({ where: { phone } })

		// const amigosecreto = decrypt(data.friend)

		DB.query(`update amigos set visualized = true where id = ${data.id}`)
		//ideal seria colocar isso numa rota a parte, pra pessoa clicar num botão OK e não permitir mais ver quem ela pegou.

		return res.json(data)


	} else {
		res.status(400).json({ message: "ERRO" });
	}
}
