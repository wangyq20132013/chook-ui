import request from '@/utils/request'
function encode64(input) {
	// 将Ansi编码的字符串进行Base64编码
	var extendEncryptKey = "1E65E6163E2D38BAD19299679F6387EC";
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	//input = input + extendEncryptKey;
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
			+ keyStr.charAt(enc3) + keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);
	return output;
}
export function login(name, passwd) {
	return request({
		url: '/client/login',
		method: 'POST',
		headers: {'Content-Type': "application/x-www-form-urlencoded"},
		data: {
			"username": name,
			"password": encode64(passwd)
		}
	})
}

export function getInfo() {
	return request({
		url: '/getInfo',
		method: 'POST',
		//headers: {'Content-Type': "application/x-www-form-urlencoded"},
	})
}

export function logout() {
	return request({
		url: '/logout',
		method: 'GET',
	})
}