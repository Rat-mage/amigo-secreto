// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { encrypt } = require("../../utils/cryptografer");
const shuffle = require('../../utils/shuffle');
const Friend = require('../../db/model/friend')

export default async function handler(req, res) {
	if (req.method === "PUT") {
		const results = await Friend.findAll()
		const amigos = results.length - 1

		let resultsArray = []
		let indexA = 0

		while (amigos >= indexA) {
			resultsArray.push(results[indexA].dataValues)
			indexA++
		}

		shuffle(resultsArray)
		const primeiroSorteado = resultsArray[0]
		let index = 0

		while (amigos > index) {
			let sorteado = resultsArray.shift()
			await Friend.update({ friend: `${encrypt(resultsArray[0].name)}`, visualized: false }, { where: { id: sorteado.id } })
			index++
		}
		await Friend.update({
			friend: `${encrypt(primeiroSorteado.name)}`,
			visualized: false
		}, {
			where: {
				id: resultsArray[0].id
			}
		})

		res.status(200).json({
			"message": "Nomes embaralhados!"
		})

	} else {
		res.status(400).json({ message: "ERRO" });
	}
}
