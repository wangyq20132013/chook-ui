<template>
	<view class="content">
		<!-- 头部logo -->
		<view class="header"><image :src="logoImage"></image></view>
		<!-- 主体表单 -->
		<view class="main">
			<wInput v-model="phoneData" type="text" maxlength="11" placeholder="用户名/电话"></wInput>
			<wInput v-model="passData" type="password" maxlength="11" placeholder="密码"></wInput>
		</view>
		<wButton text="登 录" :rotate="isRotate" @click.native="startLogin()" :bgColor="bgColor"></wButton>

		<!-- 其他登录 -->
		<view class="other_login cuIcon">
			<view class="login_icon"><view class="cuIcon-weixin" @tap="login_weixin"></view></view>
			<view class="login_icon"><view class="cuIcon-weibo" @tap="login_weibo"></view></view>
		</view>

		<!-- 底部信息 -->
		<view class="footer">
			<navigator url="forget" open-type="navigate">找回密码</navigator>
			<text>|</text>
			<navigator url="register" open-type="navigate">注册账号</navigator>
		</view>
	</view>
</template>

<script>
import wInput from '../../components/watch-login/watch-input.vue'; //input
import wButton from '../../components/watch-login/watch-button.vue'; //button

export default {
	data() {
		return {
			//logo图片 base64
			logoImage: require('@/static/img/logo.png'),
			phoneData: '', //用户/电话
			passData: '', //密码
			isRotate: false ,//是否加载旋转,
			bgColor: "linear-gradient(to right, rgba(82, 133, 197, 1), rgba(82, 133, 197, 0.9))"
		};
	},
	components: {
		wInput,
		wButton
	},
	mounted() {
		//_this = this;
		//this.isLogin();
	},
	methods: {
		isLogin() {
			//判断缓存中是否登录过，直接登录
			// try {
			// 	const value = uni.getStorageSync('setUserData');
			// 	if (value) {
			// 		//有登录信息
			// 		console.log("已登录用户：",value);
			// 		_this.$store.dispatch("setUserData",value); //存入状态
			// 		uni.reLaunch({
			// 			url: '../../../pages/index',
			// 		});
			// 	}
			// } catch (e) {
			// 	// error
			// }
		},
		startLogin() {
			//登录
			if (this.isRotate) {
				//判断是否加载中，避免重复点击请求
				return false;
			}
			if (this.phoneData.length == '') {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '用户名不能为空'
				});
				return;
			}
			if (this.passData.length < 1) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '密码不正确'
				});
				return;
			}

			this.isRotate = true;

			this.$store.dispatch('Login', {
					loginname: this.phoneData,
					password: this.passData
				})
				.then(() => {
					this.isRotate = false;
					uni.reLaunch({
						url: '../../pages/main/main'
					});
				})
				.catch(() => {
					this.isRotate = false;
				});

			// uni.request({
			// 	url: this.$baseUrl + '/login',
			// 	method: 'get',

			// 	data: {
			// 		username: this.phoneData,
			// 		password: this.encode64(this.passData)
			// 	},
			// 	success: res => {
			// 		debugger;
			// 		this.isRotate = false;
			// 		if (res.data.success) {
			// 			console.log('登录成功');

			// 			this.login({
			// 				userName: res.data.data.loginname,
			// 				userTitle: res.data.data.logintitle,
			// 				token: res.data.data.token,
			// 				avatarUrl: '../../static/uni-center/logo.png'
			// 			});

			// 			uni.reLaunch({
			// 				url: '../../pages/main/main'
			// 			});
			// 		}
			// 	},
			// 	fail: res => {
			// 		this.isRotate = false;
			// 	}
			// });

			// getLogin()
			// .then(res => {
			// 	//console.log(res)
			// 	//简单验证下登录（不安全）
			// 	if(_this.phoneData==res.data.username && _this.passData==res.data.password){
			// 		let userdata={
			// 			"username":res.data.username,
			// 			"nickname":res.data.nickname,
			// 			"accesstoken":res.data.accesstoken,
			// 		} //保存用户信息和accesstoken
			// 		_this.$store.dispatch("setUserData",userdata); //存入状态
			// 		try {
			// 			uni.setStorageSync('setUserData', userdata); //存入缓存
			// 		} catch (e) {
			// 			// error
			// 		}
			// 		uni.showToast({
			// 			icon: 'success',
			// 			position: 'bottom',
			// 			title: '登录成功'
			// 		});
			// 		uni.reLaunch({
			// 			url: '../../../pages/index',
			// 		});
			// 	}else{
			// 		_this.passData=""
			// 		uni.showToast({
			// 			icon: 'error',
			// 			position: 'bottom',
			// 			title: '账号或密码错误，账号admin密码admin'
			// 		});
			// 	}
			// 	uni.hideLoading();
			// }).catch(err => {
			// 	uni.hideLoading();
			// })
		},
		login_weixin() {
			//微信登录
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: '暂不支持...'
			});
		},
		login_weibo() {
			//微博登录
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: '暂不支持...'
			});
		},
		login_github() {
			//github登录
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: '暂不支持...'
			});
		}
	}
};
</script>

<style>
@import url('../../components/watch-login/css/icon.css');
@import url('./css/main.css');
</style>
