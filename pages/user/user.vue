<template>
	<form>
		<view class="cu-form-group margin-top">
			<view class="title">昵称</view>
			<input placeholder="两字短标题" v-model="data.usertitle"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">账号</view>
			<input placeholder="三字标题" v-model="data.username"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<input placeholder="三字标题" v-model="data.phone"></input>
		</view>


		<view class="btn-row"><button v-if="login" type="warn" @tap="bindLogout">退出登录</button></view>

	</form>

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
					login: false
				}
			};
		},
		onLoad() {
			if (this.$store.getters.token) {
				this.login = true;
				this.$store.dispatch("getUserInfo").then(res => {
					this.userInfo = JSON.parse(res.data);
				})
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
				this.$store.dispatch("LogOut").then(() => {
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
