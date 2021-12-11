const { decrypt } = require("../../utils/cryptografer");
const DB = require('../../db/connection')
const Amigo = require("../../db/model/amigo");

export default async function handler(req, res) {
  if (req.method === "PUT") {

    const { phone } = req.body;

    const data = await Amigo.findOne({ where: { phone } })

    DB.query(`update amigos set visualized = true where id = ${data.id}`)

    return res.status(200).json({ message: "Amigo oculto" })
  } else {
    res.status(400).json({ message: "ERRO" });
  }
}
