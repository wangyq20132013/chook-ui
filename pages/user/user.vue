<template>
	<view class="main">
		<view class="content">
			<evan-form class="form" ref="form">
				<evan-form-item label="昵称：" prop="usertitle"><input type="text" v-model="data.usertitle" /></evan-form-item>
				<evan-form-item label="账号：" prop="username"><input type="number" v-model="data.username" /></evan-form-item>
				<evan-form-item label="手机号：" prop="phone"><input type="text" v-model="data.phone" /></evan-form-item>
			</evan-form>
			<view class="btn-row"><button v-if="login" type="warn" @tap="bindLogout">退出登录</button></view>
		</view>
	</view>
</template>

<script>
import navBar from '@/components/zhouWei-navBar/index.vue';
import evanForm from '@/components/evan-form/evan-form.vue';
import evanFormItem from '@/components/evan-form/evan-form-item.vue';
export default {
	components: {
		navBar,
		evanForm,
		evanFormItem
	},
	data() {
		return {
			data: {
				login : false
			}
		};
	},
	onLoad() {
		if(this.$store.getters.token){
			this.login = true;
			this.$store.dispatch("getUserInfo").then(res=>{
				this.userInfo = JSON.parse(res.data);
			})
		}
	},
	computed: {
	},
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
			this.$store.dispatch("LogOut").then(()=>{
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				uni.reLaunch({
					url: '../login/login'
				});
			})

		}
	}
};
</script>

<style></style>
