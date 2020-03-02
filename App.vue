<script>
import { TokenKey, getToken } from 'utils/auth.js';
import { upgrade } from 'utils/upgrade.js';
export default {
	onLaunch: function() {
		console.log('App Launch');
		if (getToken()) {
			this.$store.commit('SET_TOKEN', getToken());
		} else {
			uni.reLaunch({
				url: 'pages/login/login'
			});
		}
		//upgrade();
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {}
};
</script>

//
<style lang="scss">
// 	@import "colorui/main.css";
// 	@import "colorui/icon.css";
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import 'common/uni.css';
/* 头条小程序需要把 iconfont 样式放到组件外 */
@import 'components/m-icon/m-icon.css';

/*每个页面公共css */
page {
	min-height: 100%;
	display: flex;
	font-size: 16px;
}

/* #ifdef MP-BAIDU */
page {
	width: 100%;
	height: 100%;
	display: block;
}

swan-template {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
	min-height: 100vh;
}

/* #endif */

/* 原生组件模式下需要注意组件外部样式 */
m-input {
	width: 100%;
	/* min-height: 100%; */
	display: flex;
	flex: 1;
}

.content {
	display: flex;
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	flex-direction: column;
	padding: 0px;
	background-color: #ffffff;
}

.input-group {
	background-color: #ffffff;
	margin-top: 20px;
	position: relative;
}

.input-group::before {
	position: absolute;
	right: 0;
	top: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-group::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-row {
	display: flex;
	flex-direction: row;
	position: relative;
	font-size: 18px;
	line-height: 40px;
}

.input-row .title {
	width: 72px;
	padding-left: 15px;
}

.input-row.border::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 8px;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.btn-row {
	margin-top: 25px;
	padding: 10px;
}

button.primary {
	background-color: #0faeff;
}

.uni-table {
	display: table;
	width: 100%;

	.uni-table-row {
		display: table-row;
		padding: 30upx;
		border-bottom: 1rpx solid #000000;

		.uni-table-cell {
			display: table-cell;
			padding: 20upx 20upx;
		}
	}
}

.text-left {
	text-align: left;
}
.text-center {
	text-align: center;
}
.text-right {
	text-align: right;
}
.pull-left {
	float: left;
}
.pull-right {
	float: right;
}
.picker-text {
	padding: 10px;
}
</style>
