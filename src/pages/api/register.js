// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const DB = require("../../db/connection")
const { encrypt } = require("../../utils/cryptografer")
const Amigo = require("../../db/model/amigo")

export default async function handler(req, res) {
	if (req.method === "POST") {
		await DB.sync();

		const { name, phone } = req.body;

		const phoneIsRegisted = await Amigo.findOne({ where: { phone } })

		if (phoneIsRegisted) {
			res.status(400).json({ message: "TELEFONE JÁ CADASTRADO!" })
		}


		try {
			const data = await Amigo.create({
				name,
				phone,
				friend: encrypt("Ainda não saiu o sorteio!"),
			});

			res.status(200).json({ message: "Salvo com sucesso", ...data });
		} catch (error) {
			console.log(error);
		}
	} else {
		res.status(400).json({ message: "ERRO" });
	}
}
