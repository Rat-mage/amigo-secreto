const DB = require("../../db/connection")

export default async function handler(req, res) {
  if (req.method === "GET") {
    const [dataNames, metaDataName] = await DB.query(`select name, visualized from amigos order by name ASC`)
    return res.status(200).json(dataNames)
  } else {
    res.status(400).json({ message: "ERRO" });
  }
}
