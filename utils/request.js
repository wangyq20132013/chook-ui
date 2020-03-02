import {
	TokenKey,
	getToken
} from '@/utils/auth'
import store from '../store/index.js'
import {
	baseUrl
} from '../config.js'

function service(option) {
	return new Promise((resolve, reject) => {
		let header = Object.assign({
			[TokenKey]: getToken()
		}, option.headers)
		uni.request({
			url: baseUrl + option.url,
			method: option.method,
			header: header,
			data: option.data,
			success: res => {
				if(res.statusCode === 200){
					resolve(res.data);
				}else if(res.statusCode === 401){
					store.dispatch("LogOut")
				}
			},
			fail: (error) => {
				uni.stopPullDownRefresh();
				console.log(error);
				uni.showToast({
					icon: 'none',
					title: '网络错误',
					position: "bottom"
					
				});
				reject(error);
			}
		})
	})
}

export default service
