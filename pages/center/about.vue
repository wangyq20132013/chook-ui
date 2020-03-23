<template>
	<view class="content">
		<view class="logo-container">
			<!-- <qrcode ref="qrcode" :val="url" :size="size" :icon="icon" loadMake></qrcode> -->
			<image class="logo" src="../../static/img/appdownload.jpg"></image>
		</view>
		<view><view class="text-center">扫描二维码下载使用</view></view>
	</view>
</template>

<script>
import { baseUrl } from '../../config.js';
export default {
	components: {},
	data() {
		return {
			providerList: [],
			url: baseUrl + "/client/interface/1.0/appdownload?appname=chook", // 要生成的二维码值
			size: 300, // 二维码大小
			unit: 'upx', // 单位
			background: '#b4e9e2', // 背景色
			foreground: '#309286', // 前景色
			pdground: '#32dbc6', // 角标色
			icon: '../../static/img/logo_40x40.png', // 二维码图标
		};
	},
	onLoad() {
		// #ifdef APP-PLUS
		this.version = plus.runtime.version;
		uni.getProvider({
			service: 'share',
			success: result => {
				const data = [];
				for (let i = 0; i < result.provider.length; i++) {
					switch (result.provider[i]) {
						case 'weixin':
							data.push({
								name: '分享到微信好友',
								id: 'weixin'
							});
							data.push({
								name: '分享到微信朋友圈',
								id: 'weixin',
								type: 'WXSenceTimeline'
							});
							break;
						case 'qq':
							data.push({
								name: '分享到QQ',
								id: 'qq'
							});
							break;
						default:
							break;
					}
				}
				this.providerList = data;
			},
			fail: error => {
				console.log('获取分享通道失败' + JSON.stringify(error));
			}
		});
		// #endif
	},
	methods: {},
	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			if (this.providerList.length === 0) {
				uni.showModal({
					title: '当前环境无分享渠道!',
					showCancel: false
				});
				return;
			}
			let itemList = this.providerList.map(function(value) {
				return value.name;
			});
			uni.showActionSheet({
				itemList: itemList,
				success: res => {
					let provider = this.providerList[res.tapIndex].id;
					uni.share({
						provider: provider,
						scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession',
						type: provider === 'qq' ? 1 : 0,
						title: '欢迎体验 智慧养鸡',
						summary: '智慧养鸡APP是一款智能信息化养鸡系统',
						imageUrl: baseUrl+ "/static/img/logo_40x40.png",
						href: url,
						success: res => {
							console.log('success:' + JSON.stringify(res));
						},
						fail: e => {
							uni.showModal({
								content: e.errMsg,
								showCancel: false
							});
						}
					});
				}
			});
		}
	}
};
</script>

<style>
.logo-container {
	width: 100%;
	text-align: center;
	padding: 50rpx 0rpx;
}

.logo {
	width: 300rpx;
	height: 300rpx;
	margin: 0 atuo;
}
</style>
