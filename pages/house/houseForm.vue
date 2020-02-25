<template>
	<view class="main">
		<view class="content">
			<evan-form class="form" :model="data" ref="form">
				<evan-form-item label="鸡舍名称：" prop="name"><input type="text" v-model="data.name" /></evan-form-item>
				<evan-form-item label="最大存笼数：" prop="max"><input type="number" v-model="data.max" /></evan-form-item>
				<evan-form-item label="描述：" prop="describe"><input type="text" v-model="data.describe" /></evan-form-item>
				<evan-form-item label="备注：" prop="notes"><textarea v-model="data.notes" maxlength="1000" /></evan-form-item>
			</evan-form>
			<view><button type="primary" @click="save">保存</button></view>
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
			
		}
	},
	onLoad(option) {
		this.id = option.id;
		if (this.id) {
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/getHouseList',{ id: this.id }).then(res=>{
				if (res.data && res.data.length == 1) {
					var item = res.data[0];
				
					this.data = {
						id: item.ID,
						name: item.NAME,
						max: item.MAX,
						describe: item.DESCRIBE,
						notes: item.NOTES
					};
				}
			})
		}
	}
};
</script>

<style lang="scss">
.content {
	background: none;
	.form {
		width: 100%;
	}
}
</style>
