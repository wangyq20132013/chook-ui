<template>
	<view class="content">
		<uni-list><uni-list-item :title="item.name" @longpress="del(item)" v-for="(item, key) in listData" :key="key" @tap="goDetail(item)"></uni-list-item></uni-list>
		<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			listData: [],
			last_id: '',
			reload: false,
			status: 'more',
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多数据了'
			}
		};
	},
	onPullDownRefresh() {
		this.reload = true;
		this.getList();
	},
	methods: {
		goBack() {
			uni.navigateBack();
		},
		addHouse() {
			uni.navigateTo({
				url: 'factoryForm'
			});
		},
		goDetail(item) {
			if (item) {
				uni.navigateTo({
					url: 'factoryForm?id=' + item.id
				});
			}
		},
		getList() {
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/queryMyChookFactory').then(res => {
				uni.stopPullDownRefresh();
				this.listData = res.data.map(item => {
					return {
						id: item.ID,
						name: item.NAME,
						max: item.MAX,
						describe: item.DESCRIBE,
						notes: item.NOTES
					};
				});
				if(this.listData.length<10){
					this.status ="noMore"
				}
			});
		},
		del(value) {
			uni.showModal({
				title: '提示',
				content: '确认删除？',
				success: res => {
					if (res.confirm) {
						this.$postData('/datainterface/savedata/cd92325237b14ed6a3566b4f0af3dd4f/deleteHouseInfo', { id: value.id }).then(res => {
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
	onShow() {
		this.getList();
	},
	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			this.addHouse();
		}
	}
};
</script>

<style scoped lang="scss">
.m-list-item {
	font-size: 17px;
	position: relative;
	padding-left: 15px;
	.m-list-item_container {
		padding: 12px 15px;
		font-size: 14px;
		color: #3b4144;
		overflow: hidden;
		border-bottom: 1rpx solid #bbb;
		.m-list-item__extra {
			display: flex;
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			-webkit-flex-direction: row;
			flex-direction: row;
			-webkit-box-pack: end;
			-webkit-justify-content: flex-end;
			justify-content: flex-end;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
		}
	}
}
</style>
