<template>
	<view>
		<button @click="aa">aa</button>
		<uni-popup ref="popup" type="bottom">
			<view class="uni-popup-contet">
				<view class="uni-picker-view__hd">
					<div class="uni-picker-view__action" @click="pickerCancel">取消</div>
					<div class="uni-picker-view__action" @click="pickerConfirm">确定</div>
				</view>
				<!-- <picker-view v-if="true" class="uni-picker-view" indicator-style="height: 40px;" :value="pickerValue" @change="pickerChange">
					<picker-view-column>
						<view class="picker-item" v-for="(item, index) in factoryArray" :key="index">{{ item }}</view>
					</picker-view-column>
				</picker-view> -->
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			fid: '',
			factoryIndex: 0,
			pickerValue: [0],
			factoryArray: [],
			factoryList: [],
			visable: false
		};
	},
	methods: {
		initMyFactory() {
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/queryMyChookFactory', {}).then(res => {
				uni.stopPullDownRefresh();
				this.factoryList = res.data;
				if (this.factoryList.length) {
					this.factoryArray = this.factoryList.map(item => {
						return item.NAME;
					});
					this.factoryIndex = 0;
				}
			});
		},
		pickerConfirm(e) {
			var factoryIndex = this.pickerValue[0];
			this.$refs.popup.close();
		},
		pickerCancel() {
			this.$refs.popup.close();
		},
		pickerChange(e) {
			//this.pickerValue = e.detail.value;
		}
	},
	onShow() {
		this.initMyFactory();
	},
	onNavigationBarButtonTap(e) {
		if (e.index == 0) {
			this.$nextTick(() => {
				this.$refs.popup.open();
			});
		}
	},
	watch: {
		factoryIndex() {
			if (this.factoryIndex > -1) {
				this.fid = this.factoryList[this.factoryIndex].ID;
				uni.setNavigationBarTitle({
					title: this.factoryList[this.factoryIndex].NAME
				});
			}
		}
	}
};
</script>

<style scoped lang="scss">
.uni-popup-contet {
	height: 300px;
	background-color: #ffffff;
	.uni-picker-view__hd {
		display: flex;
		padding: 9px 15px;
		background-color: #efefef;
		position: relative;
		text-align: center;
		font-size: 17px;
		&:after {
			content: ' ';
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			border-bottom: 1px solid #e5e5e5;
			color: #e5e5e5;
			transform-origin: 0 100%;
			transform: scaleY(0.5);
		}
		.uni-picker-view__action {
			display: block;
			flex: 1;
			color: #1aad19;

			&:first-child {
				text-align: left;
				color: #888;
			}
			&:last-child {
				text-align: right;
			}
		}
	}
	.uni-picker-view {
		height: 200px;
		.picker-item {
			text-align: center;
			line-height: 40px;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 16px;
		}
	}
}
</style>
