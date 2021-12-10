const DB = require("../../db/connection");
const Amigo = require("../../db/model/amigo");

import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
	methods: ["GET"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

export default async function handler(req, res) {
	await runMiddleware(req, res, cors);
	if (req.method === "POST") {
		try {
			await DB.sync();
			const { name, phone } = req.body;

			const phoneIsRegisted = await Amigo.findOne({ where: { phone } });

			if (phoneIsRegisted) {
				return res
					.status(202)
					.json({ message: "TELEFONE JÁ CADASTRADO!", ...phoneIsRegisted });
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
