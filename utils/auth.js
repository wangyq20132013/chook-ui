export const TokenKey = 'Authorization'

export function getToken() {
	return uni.getStorageSync(TokenKey);
}

export function setToken(token) {
	uni.setStorageSync(TokenKey, token);
}

export function removeToken() {
	uni.removeStorageSync(TokenKey);
}
