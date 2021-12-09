// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const DB = require("../../db/connection");
// const { encrypt } = require("../../utils/cryptografer");
const shuffle = require('../../utils/shuffle');
const Amigo = require("../../db/model/amigo");


export default async function handler(req, res) {
	if (req.method === "PUT") {
		const [results, metadata] = await DB.query('select * from amigos')
		shuffle(results)
		const amigos = results.length - 1
		const primeiroSorteado = results[0]
		let index = 0
		while (amigos > index) {
			let sorteado = results.shift()
			await DB.query(`update amigos set friend = '${results[0].name}' where id = ${sorteado.id}`)
			index++
		}
		await DB.query(`update amigos set friend = '${primeiroSorteado.name}' where id = ${results[0].id}`)

		await DB.query(`update amigos set visualized = false`)
		// Deixar esse update para se foi visualizado, para se alguem ver o resultado antes do resultado oficial não vai ter problema de não cosneguir ver mais.

		res.status(200).json({
			"message": "Nomes embaralhados!"
		})


	} else {
		res.status(400).json({ message: "ERRO" });
	}
}
