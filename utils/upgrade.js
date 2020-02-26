import {
	getData
} from '../api/datainterface.js'
import {
	TokenKey,
	getToken
} from 'utils/auth.js';
import {
	baseUrl
} from 'config.js';
export function upgrade() {
	getData('/client/interface/1.0/checkappversion', {
		filetype: 'appapk',
		appname: 'chook'
	}).then(res => {
		if (res.success && res.data && res.data.length) {
			var id = res.data[0].ID;
			uni.showModal({
				title: '提示',
				cancelText: '否',
				confirmText: '是',
				content: '发现新版本! 是否更新?',
				success: res => {
					if (res.confirm) {
						console.log(baseUrl + '/client/interface/1.0/speciafiledownload?id=' + id)
						plus.runtime.openURL(baseUrl + '/client/interface/1.0/speciafiledownload?id=' + id); 
					}
				}
			});
		}else{
			uni.showToast({
				title: "已经是最新版本了"
			})
		}
	});
}
