const { decrypt } = require("../../utils/cryptografer");
const Amigo = require("../../db/model/amigo");
const DB = require("../../db/connection");

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
	if (req.method === "GET") {
		const { phone } = req.query;
		const data = await Amigo.findOne({ where: { phone } });
		var amigosecreto = "";

		if (data.visualized) {
			amigosecreto = "javisto";
		} else {
			data.friend
				? (amigosecreto = decrypt(data.friend))
				: (amigosecreto = "semsorteio");
		}

		return res.json({
			amigosecreto,
		});
	} else {
		res.status(400).json({ message: "ERRO" });
	}
}
