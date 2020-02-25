<template>
	<view class="main">
		<uni-calendar :insert="true" :lunar="true" @change="select" :selected="selected"></uni-calendar>
		<view style="margin-top: 15rpx; padding: 10rpx;">
			<evan-form :model="info" ref="form">
				<evan-form-item label="日期：" prop="recordeddate"><input type="text" v-model="info.recordeddate" /></evan-form-item>
				<evan-form-item label="采食量(kg)：" prop="fodder"><input type="number" v-model="info.fodder" /></evan-form-item>
				<evan-form-item label="产蛋量(kg)：" prop="egg"><input type="number" v-model="info.egg" /></evan-form-item>
				<evan-form-item label="死亡数(支)：" prop="die"><input type="number" v-model="info.die" /></evan-form-item>
				<evan-form-item label="今日价格(元)：" prop="price"><input type="number" v-model="info.price" /></evan-form-item>
				<evan-form-item label="药物防疫：" prop="medicine"><textarea v-model="info.medicine" /></evan-form-item>
			</evan-form>
			<button type="primary" @click="save">保存</button>
		</view>
	</view>
</template>

<script>
import navBar from '@/components/zhouWei-navBar/index.vue';
import uniCalendar from '@/components/uni-calendar/uni-calendar.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import evanForm from '@/components/evan-form/evan-form.vue';
import evanFormItem from '@/components/evan-form/evan-form-item.vue';
export default {
	components: {
		uniNavBar,
		uniCalendar,
		uniList,
		uniListItem,
		evanForm,
		evanFormItem,
		navBar
	},
	data() {
		return {
			id: '',
			name: '',
			selected: [],
			info: {}
		};
	},

	onLoad: function(option) {
		this.id = option.id;
		this.name = option.name;
		this.initExistDate();
	},
	methods: {
		initExistDate() {
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/getLogDate', {id: this.id}).then(res => {
				this.selected = res.data.map(item => {
					return {
						date: item.RECORDEDDATE,
						data: {
							id: item.ID
						},
						name: 'fadsf'
					};
				});
			});
		},
		goBack() {
			uni.navigateBack();
		},
		openRegister() {
			uni.navigateTo({
				url: 'register?id='+this.id
			});
		},
		select(e) {
			console.log(e);
			if (e.extraInfo.data && e.extraInfo.data.id) {
				var id = e.extraInfo.data.id;
				this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/getLogInfo', {id: id}).then(res => {
					if (res.data && res.data.length) {
						var item = res.data[0];
						this.info = {
							id: item.ID,
							egg: item.EGG,
							fodder: item.FODDER,
							die: item.DIE,
							price: item.PRICE,
							medicine: item.MEDICINE
						};
					}
				});
				
			} else {
				this.info = {
					recordeddate: e.fulldate,
					register_id: this.id
				};
			}
		},
		save() {
			console.log(this.info);
			this.$postData('/datainterface/savedata/cd92325237b14ed6a3566b4f0af3dd4f/saveChookLog', this.info).then(res => {
				if (res.success) {
					//this.goBack();
					uni.showToast({
						title: '保存成功',
						duration: 2000,
						success: () => {}
					});
					this.initExistDate();
				}
			});
			
		},
		openPage() {}
	},
	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			this.openRegister();
		}
	}
};
</script>

<style>
	.icon_right{
		padding: 0px 10px;
	}
</style>
