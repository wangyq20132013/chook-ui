<template>
	<view class="main">
		<view class="content">
			<evan-form class="form" :model="data" ref="form">
				<evan-form-item label="进鸡时间：" prop="indate">
					<picker mode="date" :value="data.indate"  @change="data.indate = $event.target.value">
						<view class="uni-input">{{ data.indate }}</view>
					</picker>
				</evan-form-item>
				<evan-form-item label="淘鸡时间：" prop="outdate">
					<picker mode="date" :value="data.outdate" >
						<view class="uni-input">{{ data.outdate }}</view>
					</picker>
				</evan-form-item>
				<evan-form-item label="品种：" prop="type"><input type="text" v-model="data.type" /></evan-form-item>
				<evan-form-item label="成长天数(天)：" prop="days"><input type="number" v-model="data.days" /></evan-form-item>
				<evan-form-item label="数量(支)：" prop="num"><input type="number" v-model="data.num" /></evan-form-item>
				<evan-form-item label="单价(元)：" prop="price"><input type="number" v-model="data.price" /></evan-form-item>
				<evan-form-item label="金额(元)：" prop="money"><input type="number" v-model="data.money" /></evan-form-item>
				<evan-form-item label="供应商：" prop="provider"><textarea v-model="data.provider" maxlength="1000" /></evan-form-item>
			</evan-form>
			<view><button type="primary" @click="save">保存</button></view>
			<view><button type="warn" @click="del">删除</button></view>
		</view>
	</view>
</template>

<script>
import navBar from '@/components/zhouWei-navBar/index.vue';
import evanForm from '@/components/evan-form/evan-form.vue';
import evanFormItem from '@/components/evan-form/evan-form-item.vue';
export default {
	components: {
		navBar,
		evanForm,
		evanFormItem
	},
	data() {
		return {
			id: '',
			data: {
				id: '',
				name: '',
				max: '',
				describe: '',
				notes: ''
			}
		};
	},
	methods: {
		goBack() {
			uni.navigateBack();
		},
		save() {
			this.$postData('/datainterface/savedata/cd92325237b14ed6a3566b4f0af3dd4f/saveHouseInfo',this.data).then(res=>{
				if (res.success) {
					//this.goBack();
					uni.showToast({
						title: '保存成功',
						duration: 2000,
						success: () => {}
					});
				}
			})
		},
		del() {
			uni.showModal({
				title: '提示',
				content: '确认删除？',
				success: res => {
					if (res.confirm) {
						this.$postData('/datainterface/savedata/cd92325237b14ed6a3566b4f0af3dd4f/deleteHouseInfo',this.data).then(res=>{
							if (res.success) {
								uni.showToast({
									title: '删除成功',
									duration: 2000,
									success: () => {
										this.goBack();
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
	onLoad(option) {
		this.id = option.id;
		if (this.id) {
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/getRegisterInfo', { id: this.id }).then(res=>{
				if (res.data && res.data.length == 1) {
					var item = res.data[0];
				
					this.data = {
						id: item.ID,
						indate: item.INDATE,
						type: item.TYPE,
						days: item.DAYS,
						num: item.NUM,
						price: item.PRICE,
						money: item.MONEY,
						provider: item.PROVIDER,
						outdate: item.OUTDATE
					};
				}
			});
		}
	}
};
</script>

<style lang="scss">
.content {
	background: none;
	.form {
		width: 100%;
		.uni-input{
			height: 24rpx;
		}
	}
}
</style>
