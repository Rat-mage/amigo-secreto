const crypto = require("crypto");

const secret = crypto.randomBytes(Number(process.env.SECRET_LEND)).toString("hex");

function encrypt(stringToEncrypt) {
	const iv = Buffer.from(crypto.randomBytes(Number(process.env.IV_LEN)));
	const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(secret), iv);
	let encrypted = cipher.update(stringToEncrypt);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return `${iv.toString("hex")}@${encrypted.toString("hex")}`;
}
function decrypt(stringToDecrypt) {
	const [iv, contentMessage] = stringToDecrypt.split("@");
	const ivBuffer = Buffer.from(iv, "hex");
	const decipher = crypto.createDecipheriv(
		"aes-256-cbc",
		Buffer.from(secret),
		ivBuffer
	);
	let decryptedMessage = decipher.update(Buffer.from(contentMessage, "hex"));
	decryptedMessage = Buffer.concat([decryptedMessage, decipher.final()]);
	return decryptedMessage.toString();
}

module.exports = { encrypt, decrypt };
