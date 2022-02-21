const Friend = require("../../db/model/friend")

export default async function handler(req, res) {
  if (req.method === "GET") {

    const { accessCode } = req.query;
    const data = await Friend.findOne({ where: { accessCode } })
    if (data) {
      return res.status(200).json(data)
    }
    return res.status(202).json({ message: "usuário não cadastrado!" })
  } else {
    res.status(400).json({ message: "ERRO" });
  }
}
