<template>
	<view class="content">
		<uni-nav-bar status-bar fixed background-color="rgb(82, 133, 197)" color="#ffffff">
			<picker :range="factoryList" range-key="NAME" @change="prickChange" style="width: 100%;">
				<view class="uni-nav-bar-title">
					<text>{{ factoryList.length ? factoryTitle : '我的养殖场' }}</text>
					<uni-icons v-if="factoryList.length" type="arrowdown" color="#ffffff"></uni-icons>
				</view>
			</picker>
		</uni-nav-bar>
		<scroll-view scroll-y="true">
			<view v-if="factoryMsg">
				<uni-notice-bar @getmore="createFactory" :showGetMore="true" moreText="快速创建" single="true" text="您还没有养殖场！快去创建吧！"></uni-notice-bar>
			</view>
			<view v-else-if="houseMsg">
				<uni-notice-bar @getmore="createHouse" :showGetMore="true" moreText="快速创建" single="true" text="当前养殖场没有鸡舍！快去创建吧!"></uni-notice-bar>
			</view>
			<view>
				<uni-grid :column="3" :show-border="false" :square="false">
					<uni-grid-item>
						<view class="flex-item uni-bg-red text-center">
							<text class="uni-text">当前存栏数</text>
							<text class="uni-text">12000 只</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="flex-item uni-bg-green text-center">
							<text class="uni-text">日消耗量</text>
							<text class="uni-text">12000 kg</text>
						</view>
					</uni-grid-item>
					<uni-grid-item>
						<view class="flex-item uni-bg-blue text-center">
							<text class="uni-text">日产蛋量</text>
							<text class="uni-text">12000 kg</text>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell" v-for="(value, key) in listData" :key="key">
					<uni-card :title="value.NAME" @tap="openHenhouse(value)" extra=">" is-shadow>
						<view v-if="value.REMAIN">
							<view class="uni-table">
								<view class="uni-table-row">
									<view class="uni-table-cell">
										<text>入栏日期：{{ value.INDATE }}</text>
									</view>
									<view class="uni-table-cell">
										<text>日龄：{{ ageOfDays(value.INDATE, value.DAYS) }} 天</text>
									</view>
								</view>
								<view class="uni-table-row">
									<view class="uni-table-cell">
										<text>当前存栏：{{ value.REMAIN }}</text>
									</view>
									<view class="uni-table-cell">
										<text>累计死亡：{{ value.NUM - value.REMAIN }}只</text>
									</view>
								</view>
							</view>
						</view>
					</uni-card>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<uni-card title="采购台账" extra=">" is-shadow @click="toPurchase">
						<view class="uni-table">
							<view class="uni-table-row">
								<view class="uni-table-cell">
									<text>本月累计采购：</text>
									<text class="pull-right">
										<text>1200.00</text>
										<text>元</text>
									</text>
								</view>
							</view>
						</view>
					</uni-card>
				</view>
				<view class="uni-list-cell">
					<uni-card title="销售台账" extra=">" is-shadow @click="toSell">
						<view class="uni-table">
							<view class="uni-table-row">
								<view class="uni-table-cell">
									<text>本月累计销售：</text>
									<text class="pull-right">
										<text>1200.00</text>
										<text>元</text>
									</text>
								</view>
							</view>
						</view>
					</uni-card>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			fid: '',
			factoryTitle: '',
			factoryIndex: 0,
			factoryList: [],
			factoryArray: [],
			listData: [],
			visable: false,
			factoryMsg: false,
			houseMsg: false
		};
	},
	onLoad() {},
	onShow() {
		this.initMyFactory();
	},
	methods: {
		houseManage() {
			uni.navigateTo({
				url: '../house/house'
			});
		},
		openHenhouse(option) {
			var id = option.ID;
			var name = option.NAME;
			if (option.REGISTER_ID) {
				uni.navigateTo({
					url: 'henhouse?id=' + option.REGISTER_ID + '&name=' + name
				});
			} else {
				uni.navigateTo({
					url: 'register?name=' + name
				});
			}
		},
		initHenhouse() {
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/getHouse', { fid: this.fid }).then(res => {
				uni.stopPullDownRefresh();
				this.listData = res.data;
				if (!this.listData.length) {
					this.houseMsg = true;
				}
			});
		},
		ageOfDays(date, days) {
			var _days = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24) + days;
			return Math.ceil(_days);
		},
		initMyFactory() {
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/queryMyChookFactory', {}).then(res => {
				uni.stopPullDownRefresh();
				this.factoryList = res.data;
				if (this.factoryList.length) {
					this.selectFactory(this.factoryList[0]);
				} else {
					this.factoryMsg = true;
				}
			});
		},
		prickChange(e) {
			this.selectFactory(this.factoryList[e.detail.value]);
		},
		selectFactory(data) {
			this.fid = data.ID;
			this.factoryTitle = data.NAME;
		},
		toPurchase() {
			uni.navigateTo({
				url: '../purchase/purchase?fid=' + this.fid
			});
		},
		toSell() {
			uni.navigateTo({
				url: '../sell/sell?fid=' + this.fid
			});
		},
		createFactory() {
			uni.navigateTo({
				url: '../house/factoryForm'
			});
		},
		createHouse() {
			uni.navigateTo({
				url: '../house/houseForm?fid=' + this.fid
			});
		}
	},
	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			this.$refs.popup.open();
		}
	},
	onPullDownRefresh() {
		if (this.fid) {
			this.initHenhouse();
		} else {
			this.initMyFactory();
		}
	},
	watch: {
		fid() {
			this.initHenhouse();
		}
	}
};
</script>

<style scoped lang="scss">
.uni-media-list-logo {
	width: 180upx;
	height: 140upx;
}

.uni-media-list-body {
	height: auto;
	justify-content: space-around;
}

.uni-media-list-text-top {
	height: 74upx;
	font-size: 28upx;
	overflow: hidden;
}

.uni-media-list-text-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.uni-nav-bar-title {
	display: fiex;
	text-align: center;
	margin: 0 auto;
}
.flex-item {
	padding: 25upx;
	margin: 20upx;
	border-radius: 10upx;
	&:first-child{
		margin-left: 20upx;
	}
	&:last-child{
		margin-right: 20upx;
	}
}

</style>
