// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import DB from "../../db/connection";
import { encrypt } from "../../utils/cryptografer";
import Amigo from "../../db/model/amigo";
type Data = {
	message: string;
	id?: number;
	name?: string;
	phone?: string;
	friend?: string;
	updatedAt?: object;
	createdAt?: object;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method == "POST") {
		const { name, phone } = req.body;
		try {
			await DB.sync();
			//Caso não exista a tabela de amigos, ele cria a tabela.
			const data = await Amigo.create({
				name,
				phone,
				friend: encrypt("Ainda não saiu o sorteio!"),
			});
			const { dataValues<Data> } = data;
			//
			console.log("opa", dataValues);
			res.status(200).json({ message: "Salvo com sucesso", ...dataValues });
		} catch (error) {
			console.log(error);
		}
	} else {
		res.status(400).json({ message: "ERRO" });
	}
}
