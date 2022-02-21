const Friend = require("../../db/model/friend");

export default async function handler(req, res) {
  if (req.method === "PUT") {

    const { accessCode } = req.body;

    const data = await Friend.findOne({ where: { accessCode } })
    console.log(data)

    await Friend.update({
      visualized: true
    }, {
      where: {
        id: data.id
      }
    })

    return res.status(200).json({ message: "Amigo oculto" })
  } else {
    res.status(400).json({ message: "ERRO" });
  }
}
