const DB = require("../../db/connection")
const Friend = require("../../db/model/friend");

export default async function handler(req, res) {
  if (req.method === "GET") {

    const friends = await Friend.findAll({ attributes: ['name', 'visualized'], order: ['name'] })

    const dataNames = JSON.stringify(friends, null, 2)

    return res.status(200).json(dataNames)
  } else {
    res.status(400).json({ message: "ERRO" });
  }
}
