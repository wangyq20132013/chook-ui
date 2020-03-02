<template>
	<view class="content">
		<view>
			<uni-grid :column="2" :show-border="true" :square="false">
				<uni-grid-item class="text-center">
					<wing-time-selector showType="year" @btnConfirm="selectYear">
						<view class="picker-text">
							{{ filter.year }}年
							<uni-icons type="arrowdown"></uni-icons>
						</view>
					</wing-time-selector>
				</uni-grid-item>
				<uni-grid-item class="text-center">
					<picker :value="filter.month" :range="monthData" @change="selectMonth">
						<view class="picker-text">
							{{ monthData[filter.month] }}
							<uni-icons type="arrowdown"></uni-icons>
						</view>
					</picker>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="sum-content">
			<uni-grid :column="1" :show-border="false" :square="false">
				<uni-grid-item class="text-center">
					<view class="sum-title">累计采购</view>
					<view class="sum-num-1">{{ money }}元</view>
				</uni-grid-item>
			</uni-grid>
			<view class="sum-row"><view class="sum-cell"></view></view>
			<uni-grid :column="2" :show-border="false" :square="false">
				<uni-grid-item class="text-center">
					<span class="sum-title">已支付</span>
					<span class="sum-num-2">{{ payMoney }}元</span>
				</uni-grid-item>
				<uni-grid-item class="text-center">
					<span class="sum-title">未支付</span>
					<span class="sum-num-2">{{ noPayMoney }}元</span>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="uni-table uni-list">
			<view class="uni-table ">
				<view class="uni-table-row">
					<view class="uni-table-cell"><text>名称</text></view>
					<view class="uni-table-cell text-right"><text>总金额</text></view>
					<view class="uni-table-cell text-right"><text>已支付</text></view>
					<view class="uni-table-cell text-right"><text>未支付</text></view>
				</view>
				<view class="uni-table-row" hover-class="uni-list-cell-hover" @longpress="del(value)" v-for="(value, key) in listData" :key="key">
					<view class="uni-table-cell">
						<text>{{ value.type }}</text>
					</view>
					<view class="uni-table-cell text-right">
						<text>{{ value.money }}元</text>
					</view>
					<view class="uni-table-cell text-right">
						<text>{{ value.paymoney }}元</text>
					</view>
					<view class="uni-table-cell text-right">
						<text>{{ value.nopaymoney }}元</text>
					</view>
				</view>
			</view>
			<uni-load-more :status="status"></uni-load-more>
		</view>
	</view>
</template>

<script>
import { dateFormat } from '../../common/util.js';

export default {
	data() {
		return {
			fid: '',
			money: 0,
			payMoney: 0,
			noPayMoney: 0,
			filter: {
				year: new Date().getFullYear().toString(),
				month: new Date().getMonth() + 1
			},
			listData: [],
			monthData: ['全年', '01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '02月', '11月', '12月'],
			status: 'noMore'
		};
	},
	onLoad(option) {
		this.fid = option.fid;
		this.load();
	},
	onPullDownRefresh() {
		this.load();
	},
	methods: {
		getList(params) {
			var data = {
				column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
			};
			if (this.last_id) {
				//说明已有数据，目前处于上拉加载
				this.status = 'loading';
				data.minId = this.last_id;
				data.time = new Date().getTime() + '';
				data.pageSize = 10;
			}
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/getBuyInfoByType', params).then(res => {
				uni.stopPullDownRefresh();
				if (res.data) {
					let list = res.data.map(e => {
						return {
							type: e.TYPE,
							money: e.MONEY,
							paymoney: e.PAYMONEY,
							nopaymoney: e.MONEY - e.PAYMONEY
						};
					});
					this.listData = list;
					this.reload = false;
				}
			});
		},
		loadMoney(params) {
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/queryBuyCountInfo', params).then(res => {
				uni.stopPullDownRefresh();
				if (res.data && res.data.length) {
					var data = res.data[0];
					this.money = data.MONEY || 0;
					this.payMoney = data.PAYMONEY || 0;
					this.noPayMoney = this.money - this.payMoney;
				}
			});
		},
		manage() {
			uni.navigateTo({
				url: 'purchaseList?fid=' + this.fid
			});
		},
		load() {
			var params = Object.assign({ fid: this.fid }, this.filter);
			this.loadMoney(params);
			this.getList(params);
		},
		selectYear(e) {
			this.filter.year = e.key;
			this.load();
		},
		selectMonth(e) {
			this.filter.month = e.detail.value;
			this.load();
		}
	},
	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			this.manage();
		}
	}
};
</script>

<style lang="scss">
.sum-content {
	padding: 20upx;
	display: block;
	.sum-title {
		font-size: 28upx;
		padding: 0px 10upx;
		line-height: 1.5;
	}
	.sum-num-1 {
		font-size: 48upx;
	}
	.sum-num-2 {
		font-size: 42upx;
	}
}
.uni-table {
	.uni-table-row {
		padding: 25upx;

		.uni-table-cell {
			border-bottom: 1px solid #d0d0d0;
		}
	}
}
</style>
