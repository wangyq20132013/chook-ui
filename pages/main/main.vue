<template>
	<view class="main">
		<view class="">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value, key) in listData" :key="key">
					<uni-card :title="value.NAME" @tap="openHenhouse(value)" :extra="value.REMAIN ? value.REMAIN + '' : '空闲'" is-shadow>
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
										<text>死淘：{{ value.MAX - value.REMAIN }}只</text>
									</view>
								</view>
							</view>
						</view>
					</uni-card>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import navBar from '@/components/zhouWei-navBar/index.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniCard from '@/components/uni-card/uni-card.vue';
import uniBadge from '@/components/uni-badge/uni-badge.vue';
import { mapState } from 'vuex';

export default {
	components: {
		uniCard,
		uniNavBar,
		navBar,
		uniBadge
	},
	data() {
		return {
			listData: []
		};
	},
	onLoad() {
		this.initHenhouse();
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
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/getHouse', {}).then(res => {
				this.listData = res.data;
			});
		},
		ageOfDays(date, days) {
			var _days = (new Date() - new Date(date)) / (1000 * 60 * 60 * 24) + days;
			return Math.ceil(_days);
		}
	}
};
</script>

<style>
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
