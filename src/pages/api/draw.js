// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import DB from "../../db/connection";
import { encrypt } from "../../utils/cryptografer";
import { shuffle } from "../../utils/shuffle";

export default async function handler(req, res) {
	if (req.method === "PUT") {
		const results = await DB.query("select * from amigos");
		shuffle(results);
		const amigos = results.length - 1;
		const primeiroSorteado = results[0];
		let index = 0;
		while (amigos > index) {
			let sorteado = results.shift();
			await DB.query(
				`update amigos set friend = '${encrypt(results[0].name)}' where id = ${
					sorteado.id
				}`
			);
			index++;
		}
		await DB.query(
			`update amigos set friend = '${encrypt(
				primeiroSorteado.name
			)}' where id = ${results[0].id}`
		);

		res.status(200).json({
			message: "Nomes embaralhados!",
		});
	} else {
		res.status(400).json({ message: "ERRO" });
	}
}
