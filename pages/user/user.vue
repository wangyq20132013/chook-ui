<template>
	<view class="content">
		<m-form :model="data" ref="form">
			<m-form-item label="昵称：" prop="name"><input type="text" v-model="data.usertitle" /></m-form-item>
			<m-form-item label="账号：" prop="name"><input type="text" v-model="data.username" /></m-form-item>
			<m-form-item label="手机号：" prop="name"><input type="text" v-model="data.phone" /></m-form-item>
			<m-form-item><button type="warn" @click="bindLogout()">退出登录</button></m-form-item>
		</m-form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			data: {
				login: false
			}
		};
	},
	onLoad() {
		if (this.$store.getters.token) {
			this.login = true;
			this.$store.dispatch('getUserInfo').then(res => {
				this.userInfo = JSON.parse(res.data);
			});
		}
	},
	computed: {},
	methods: {
		goBack() {
			uni.navigateBack();
		},
		bindLogin() {
			uni.navigateTo({
				url: '../login/login'
			});
		},
		bindLogout() {
			this.$store.dispatch('LogOut').then(() => {
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				uni.reLaunch({
					url: '../login/login'
				});
			});
		}
	}
};
</script>

<style></style>
