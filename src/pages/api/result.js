// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DB from "../../db/connection";
import { decrypt } from "../../utils/cryptografer";
import Amigo from "../../db/model/amigo";

export default async function handler(req, res) {
	if (req.method === "GET") {
		const { phone } = req.query;

		const data = await Amigo.findOne({ where: { phone } });
		// const amigosecreto = decrypt(data.friend)
		res.json(data);
	} else {
		res.status(200).json({ message: "ERRO" });
	}
}
