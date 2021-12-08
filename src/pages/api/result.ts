// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import DB from "../../db/connection";
import { decrypt } from "../../utils/cryptografer";
import Amigo from "../../db/model/amigo";

type amigoProps = {
	message: string;
	id?: number;
	name?: string;
	phone?: string;
	friend?: string;
	updatedAt?: object;
	createdAt?: object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {

		const { phone } = req.query;

		const data = await Amigo.findOne({ where: { phone } })
		// const amigosecreto = decrypt(data.friend)
		res.json(data)


	} else {
		res.status(400).json({ message: "ERRO" });
	}
}
