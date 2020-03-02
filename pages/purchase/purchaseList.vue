<template>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" @longpress="del(value)" v-for="(value, key) in listData" :key="key">
				<view class="uni-media-list" @tap.stop="goDetail(value)">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">
							<span>{{ value.provider }}</span>
							<span style="float: right;">
								<uni-tag :text="value.status === 1 ? '已结清' : '未结清'" :type="value.status === 1 ? 'success' : 'error'" size="small" :circle="true"></uni-tag>
							</span>
						</view>
						<view class="uni-media-list-text-bottom">
							<text>{{ value.buydate }}</text>
							<text>{{ value.type }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
var dateUtils = require('../../common/util.js').dateUtils;
export default {
	data() {
		return {
			fid: '',
			listData: [],
			page: 1,
			rows: 10,
			reload: false,
			status: 'more',
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			}
		};
	},
	onLoad(option) {
		this.fid = option.fid;
		this.getList();
	},
	onPullDownRefresh() {
		this.reload = true;
		this.page = 1;
		this.getList();
	},
	onReachBottom() {
		this.status = 'more';
		this.getList();
	},
	methods: {
		add() {
			uni.navigateTo({
				url: 'purchaseForm?fid=' + this.fid
			});
		},
		getList() {
			var data = Object.assign(
				{
					fid: this.fid
				},
				{
					page: this.page,
					rows: this.rows
				}
			);
			
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/getPurchaseList', data).then(res => {
				uni.stopPullDownRefresh();
				if (res.rows) {
					let list = res.rows.map(e => {
						return {
							provider: e.PROVIDER,
							type: e.TYPE,
							id: e.ID,
							buydate: e.BUYDATE,
							status: e.STATUS
						};
					});
					this.listData = this.reload ? list : this.listData.concat(list);
					this.reload = false;
					if (list.length < 10) {
						this.status = 'noMore';
					} else {
						this.status = 'more';
					}
					this.page++;
				}
			});
		},
		goDetail: function(value) {
			uni.navigateTo({
				url: 'purchaseForm?id=' + value.id
			});
		},

		del(value) {
			uni.showModal({
				title: '提示',
				content: '确认删除？',
				success: res => {
					if (res.confirm) {
						this.$postData('/datainterface/savedata/cd92325237b14ed6a3566b4f0af3dd4f/delBuyInfo', { id: value.id }).then(res => {
							if (res.success) {
								uni.showToast({
									title: '删除成功',
									duration: 2000,
									success: () => {
										let index = this.listData.indexOf(value);
										this.listData.splice(index, 1);
									}
								});
							} else {
								uni.showToast({
									title: '删除失败',
									duration: 2000
								});
							}
						});
					}
				}
			});
		}
	},
	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			this.add();
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
