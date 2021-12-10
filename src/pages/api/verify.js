const DB = require("../../db/connection")
const Amigo = require("../../db/model/amigo")

export default async function handler(req, res) {
  if (req.method === "GET") {
    await DB.sync();
    const { phone } = req.query;

    const data = await Amigo.findOne({ where: { phone } })

    if (data) {
      return res.status(200).json(data)
    }

    return res.status(202).json({ message: "usuário não cadastrado!" })
  } else {
    res.status(400).json({ message: "ERRO" });
  }
}
