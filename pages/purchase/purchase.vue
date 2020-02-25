<template>
	<view class="main">
		<view class="content">
			<view class="sum-content">
				<view class="sum-row">
					<view class="sum-cell">
						<view class="sum-title">累计采购</view>
						<view class="sum-num-1">{{ money }}元</view>
					</view>
				</view>
				<view class="sum-row">
					<view class="sum-cell">
						<span class="sum-title">已支付</span>
						<span class="sum-num-2">{{ payMoney }}元</span>
					</view>
					<view class="sum-cell">
						<span class="sum-title">未支付</span>
						<span class="sum-num-2">{{ noPayMoney }}元</span>
					</view>
				</view>
			</view>
			<view class=" uni-table uni-list">
				<view class="uni-table-row">
					<view class="uni-table-cell">
						<text>饲料名称</text>
					</view>
					<view class="uni-table-cell">
						<text>总金额</text>
					</view>
					<view class="uni-table-cell">
						<text>已支付</text>
					</view>
					<view class="uni-table-cell">
						<text>未支付</text>
					</view>
				</view>
					<view class="uni-table-row" hover-class="uni-list-cell-hover" @longpress="del(value)" v-for="(value, key) in listData" :key="key">
						<view class="uni-table-cell">
							<text>{{ value.type }}</text>
						</view>
						<view class="uni-table-cell">
							<text>{{ value.money }}元</text>
						</view>
						<view class="uni-table-cell">
							<text>{{ value.paymoney }}元</text>
						</view>
						<view class="uni-table-cell">
							<text>{{ value.nopaymoney }}元</text>
						</view>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import navBar from '@/components/zhouWei-navBar/index.vue';
import uniCard from '@/components/uni-card/uni-card.vue';
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
var dateUtils = require('../../common/util.js').dateUtils;

export default {
	components: {
		navBar,
		uniCard,
		uniList,
		uniListItem,
		uniLoadMore
	},
	data() {
		return {
			money: 0,
			payMoney: 0,
			noPayMoney: 0,
			listData: []
		};
	},
	onLoad() {
		this.loadMoney();
		this.getList();
	},
	onPullDownRefresh() {
		this.loadMoney();
		this.getList();
	},
	methods: {
		getList() {
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
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/getBuyInfoByType').then(res => {
				uni.stopPullDownRefresh();
				let list = this.setTime(res.data);
				this.listData = list;
				this.last_id = list[list.length - 1].id;
				this.reload = false;
			});
		},
		setTime: function(items) {
			var newItems = [];
			items.forEach(e => {
				newItems.push({
					type: e.TYPE,
					money: e.MONEY,
					paymoney: e.PAYMONEY,
					nopaymoney: e.MONEY-e.PAYMONEY
				});
			});
			return newItems;
		},
		loadMoney() {
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/queryBuyCountInfo').then(res => {
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
				url: 'purchaseList'
			});
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
	.sum-row {
		&:nth-child(1n + 2) {
			margin-top: 15upx;
		}
		width: 100%;
		display: table;
		.sum-cell {
			&:nth-child(1n + 2) {
				border-left: 1px solid #000000;
			}
			display: table-cell;
			text-align: center;
			.sum-title {
				font-size: 18upx;
				padding: 0px 10px;
			}
			.sum-num-1 {
				font-size: 48upx;
			}
			.sum-num-1 {
				font-size: 38upx;
			}
		}
	}
}
.uni-table{
	.uni-table-row {
		padding: 15px;
		border-bottom: 1rpx solid #000000;
		.uni-table-cell{
			
		}
	}
}

</style>
