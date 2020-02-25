<template>
	<view class="main">
		<view class="content">
			<evan-form class="form" :model="data" ref="form">
				<evan-form-item label="销售时间：" prop="selldate">
					<picker mode="date" :value="data.selldate"  @change="data.selldate = $event.target.value">
						<text class="uni-input">{{ data.selldate }}</text>
					</picker>
				</evan-form-item>
				<evan-form-item label="客户：" prop="client"><input type="text" v-model="data.client" /></evan-form-item>
				<evan-form-item label="销售单价(元/斤)：" prop="price"><input type="number" v-model="data.price" /></evan-form-item>
				<evan-form-item label="销售重量(斤)：" prop="weight"><input type="number" v-model="data.weight" /></evan-form-item>
				<evan-form-item label="应收金额(元)：">{{sumMoney()}}</evan-form-item>
				<evan-form-item label="框数：" prop="box"><input type="number" v-model="data.box" /></evan-form-item>
				<evan-form-item label="盘数：" prop="dish"><input type="number" v-model="data.dish" /></evan-form-item>
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
import {dateFormat} from '@/common/util.js'
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
				selldate: dateFormat('yyyy-mm-dd', new Date()),
				client: '',
				price: '',
				weight: ''
			}
		};
	},
	methods: {
		sumMoney(){
			if(this.data.price && this.data.weight){
				return this.data.price*this.data.weight;
			}else{
				return 0;
			}
			
		},
		goBack() {
			uni.navigateBack();
		},
		save() {
			this.$postData('/datainterface/savedata/cd92325237b14ed6a3566b4f0af3dd4f/saveSellInfo',this.data).then(res=>{
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
		
	},
	onLoad(option) {
		this.id = option.id;
		if (this.id) {
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/getSellList',{ id: this.id }).then(res=>{
				if (res.data && res.data.length == 1) {
					var item = res.data[0];
				
					this.data = {
						id: item.ID,
						selldate: item.SELLDATE,
						client: item.CLIENT,
						price: item.PRICE,
						weight: item.WEIGHT,
						paydate: item.PAYTDATE,
						money: item.MONEY
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
