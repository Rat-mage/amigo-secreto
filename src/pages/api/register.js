const DB = require("../../db/connection");
const Friend = require("../../db/model/friend");

import NextCors from "nextjs-cors";

export default async function handler(req, res) {
	await NextCors(req, res, {
		// Options
		methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
		origin: "*",
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	});
	if (req.method === "POST") {
		try {
			const { name, accessCode } = req.body;

			const accessCodeAlreadyRegistered = await Friend.findOne({ where: { accessCode } });

			if (accessCodeAlreadyRegistered) {
				return res
					.status(202)
					.json({ message: "CÓDIGO SECRETO JÁ CADASTRADO!", ...accessCodeAlreadyRegistered });
			}

			const data = await Friend.create({
				name,
				accessCode,
			});

			return res.status(200).json({ message: "Salvo com sucesso", ...data });
		} catch (error) {
			console.log(error);
		}
	} else {
		res.status(400).json({ message: "ERRO" });
	}
}
