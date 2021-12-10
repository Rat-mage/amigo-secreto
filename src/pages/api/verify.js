const DB = require("../../db/connection")
const Amigo = require("../../db/model/amigo")

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { phone } = req.query;
    const data = await Amigo.findOne({ where: { phone } })

    return res.json(data)
  } else {
    res.status(400).json({ message: "ERRO" });
  }
}
