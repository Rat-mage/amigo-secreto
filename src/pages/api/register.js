const DB = require("../../db/connection")
const Amigo = require("../../db/model/amigo")

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			await DB.sync();
			const { name, phone } = req.body;

			const phoneIsRegisted = await Amigo.findOne({ where: { phone } })

			if (phoneIsRegisted) {
				return res.status(202).json({ message: "TELEFONE JÁ CADASTRADO!", ...phoneIsRegisted })
			}

			const data = await Amigo.create({
				name,
				phone,
			});

			return res.status(200).json({ message: "Salvo com sucesso", ...data });
		} catch (error) {
			console.log(error);
		}
	} else {
		res.status(400).json({ message: "ERRO" });
	}
}
