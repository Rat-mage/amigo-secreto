function encrypt(stringToEncrypt) {
	var encrypted = btoa(stringToEncrypt);
	// var encrypted = Buffer.from(stringToEncrypt, 'base64');
	return encrypted;
}
function decrypt(stringToDecrypt) {
	var decrypted = atob(stringToDecrypt);
	// var decrypted = stringToDecrypt.toString('base64')
	return decrypted;
}

module.exports = { encrypt, decrypt };


