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
			const createFriend = await Amigo.create({
				name,
				phone,
				friend: encrypt("Ainda não saiu o sorteio!"),
			});
			//
			console.log("opa", createFriend);
		} catch (error) {
			console.log(error);
		}
		res.status(200).json({ message: "John Doe" });
	} else {
		res.status(400).json({ message: "ERRO" });
	}
}
