// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DB from "../../db/connection";
import { encrypt } from "../../utils/cryptografer";
import Amigo from "../../db/model/amigo";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { name, phone } = req.body;
		console.log(name, phone);
		try {
			await DB.sync();
			//Caso não exista a tabela de amigos, ele cria a tabela.
			const data = await Amigo.create({
				name,
				phone,
				friend: encrypt("Ainda não saiu o sorteio!"),
			});

			//
			console.log("opa", data);
			res.status(200).json({ message: "Salvo com sucesso", ...data });
		} catch (error) {
			console.log(error);
		}
	} else {
		res.status(400).json({ message: "ERRO" });
	}
}
