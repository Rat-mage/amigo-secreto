const DB = require("../../db/connection")
const Amigo = require("../../db/model/amigo")

export default async function handler(req, res) {
  if (req.method === "GET") {
    const [data, result] = await DB.query(`select name, visualized from amigos order by name ASC`)
    return res.status(200).json(data)
  } else {
    res.status(400).json({ message: "ERRO" });
  }
}
