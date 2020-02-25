<template>
	<view class="main">
		<view class="content">
			<view class="sum-content">
				<view class="sum-row">
					<view class="sum-cell">
						<view class="sum-title">累计采购</view>
						<view class="sum-num-1">8000元</view>
					</view>
				</view>
				<view class="sum-row">
					<view class="sum-cell">
						<span class="sum-title">已支付</span>
						<span class="sum-num-2">5000元</span>
					</view>
					<view class="sum-cell">
						<span class="sum-title">未支付</span>
						<span class="sum-num-2">5000元</span>
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
			listData: [],
		};
	},
	onLoad() {
		
	},
	methods: {
		manage(){
			uni.navigateTo({
				url: 'sellList'
			})
		}
	},
	onNavigationBarButtonTap(e) {
		if(e.index === 0){
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
</style>
