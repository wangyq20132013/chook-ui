<template>
	<view class="main">
		<view class="content">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @longpress="del(value)" v-for="(value, key) in listData" :key="key">
					<view class="uni-media-list" @tap.stop="goDetail(value)">
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{ value.name }}</view>
							<view class="uni-media-list-text-bottom">
								<text>最大存栏：{{ value.max }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore,
			navBar
		},
		data() {
			return {
				listData: [],
				last_id: '',
				reload: false,
				status: 'more',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
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
			addHouse(){
				uni.navigateTo({
					url: 'houseForm'
				})
			},
			goDetail(item){
				if(item){
					uni.navigateTo({
						url: 'houseForm?id='+item.id
					})
				}
			},
			getList(){
				this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/getHouseList').then(res=>{
					uni.stopPullDownRefresh();
					this.listData = res.data.map((item)=>{
						return {
							id: item.ID,
							name: item.NAME,
							max: item.MAX,
							describe: item.DESCRIBE,
							notes: item.NOTES
						}
					});
				})
			},
			del(value) {
				uni.showModal({
					title: '提示',
					content: '确认删除？',
					success: res => {
						if (res.confirm) {
							this.$postData('/datainterface/savedata/cd92325237b14ed6a3566b4f0af3dd4f/deleteHouseInfo', { id: value.id }).then(res=>{
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
							})
						}
					}
				});
			}
			
		},
		onShow(){
			this.getList();
		},
		onNavigationBarButtonTap(e) {
			if(e.index === 0){
				this.addHouse();
			}
		}
	}
</script>

<style>

</style>
