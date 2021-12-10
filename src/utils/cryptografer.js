function encrypt(stringToEncrypt) {

	let encrypted = Buffer.from(stringToEncrypt, 'utf8').toString('hex');

	return encrypted;
}
function decrypt(stringToDecrypt) {
	var hex = stringToDecrypt.toString();
	var decrypted = '';
	for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
		decrypted += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	return decrypted;
}

module.exports = { encrypt, decrypt };


