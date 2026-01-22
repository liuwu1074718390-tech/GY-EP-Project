import JSEncrypt from 'jsencrypt';
// 非对称加密(RSA)

// 密钥对生成 http://web.chacuo.net/netrsakeypair

/**
 * 前端加密时需要公钥
 */
const publicKey =
	'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCn0J7WNLszJzjWnxu9CLyDVP/D/u+Kf2Y90I8KMVV7cuNY9hd0OC1i0JJFUGrMw5PgibTDWB84eeKXuvMvQaTJauq4ZwkV+QpoEW5BPwmXbNJysJm8k9+nqLTB8D08zy4cDW5KsRUvq2FtYsRa+ve6WL5L6E8Le8jVG/g4+nYjpwIDAQAB';

/**
 * 没啥用
 */
const privateKey = '';

// 加密
export function encrypt(txt) {
	const encryptor = new JSEncrypt();

	encryptor.setPublicKey(publicKey); // 设置公钥

	return encryptor.encrypt(txt); // 对数据进行加密
}

// 解密
export function decrypt(txt) {
	const encryptor = new JSEncrypt();

	encryptor.setPrivateKey(privateKey); // 设置私钥

	return encryptor.decrypt(txt); // 对数据进行解密
}
