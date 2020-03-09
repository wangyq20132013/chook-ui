<template>
	<view class="content">
		<m-form class="form" :model="data" ref="form">
			<m-form-item label="销售时间：" prop="selldate">
				<picker mode="date" :value="data.selldate" @change="data.selldate = $event.target.value">
					<text class="uni-input">{{ data.selldate }}</text>
				</picker>
			</m-form-item>
			<m-form-item label="客户：" prop="client"><input type="text" v-model="data.client" /></m-form-item>
			<m-form-item label="销售单价(元/斤)：" prop="price"><input type="number" v-model="data.price" /></m-form-item>
			<m-form-item label="销售重量(斤)：" prop="weight"><input type="number" v-model="data.weight" /></m-form-item>
			<m-form-item label="应收金额(元)：">{{ sumMoney() }}</m-form-item>
			<m-form-item label="框数：" prop="box"><input type="number" v-model="data.box" /></m-form-item>
			<m-form-item label="盘数：" prop="dish"><input type="number" v-model="data.dish" /></m-form-item>
			<view>
				<m-form-item label="收款时间1: ">
					<picker mode="date" :value="data.indate1" @change="data.indate1 = $event.target.value">
						<text class="uni-input">{{ data.indate1 }}</text>
					</picker>
				</m-form-item>
				<m-form-item label="收款金额1: "><input type="digit" v-model="data.inmoney1" /></m-form-item>
			</view>
			<view v-if="data.indate2">
				<m-form-item label="收款时间2: ">
					<picker mode="date" :value="data.indate1" @change="data.indate1 = $event.target.value">
						<text class="uni-input">{{ data.indate1 }}</text>
					</picker>
				</m-form-item>
				<m-form-item label="收款金额2: "><input type="digit" v-model="data.inmoney2" /></m-form-item>
			</view>
			<view v-if="data.indate3">
				<m-form-item label="收款时间3: ">
					<picker mode="date" :value="data.indate1" @change="data.indate1 = $event.target.value">
						<text class="uni-input">{{ data.indate1 }}</text>
					</picker>
				</m-form-item>
				<m-form-item label="收款金额3: "><input type="digit" v-model="data.inmoney3" /></m-form-item>
			</view>
			<m-form-item><button type="default" size="mini" @click="addIn">添加收款信息</button></m-form-item>
			<m-form-item label="备注：" prop="notes"><textarea v-model="data.notes" maxlength="1000" /></m-form-item>

			<m-form-item>
				<view style="width: 100%;"><button type="primary" @click="save">保存</button></view>
			</m-form-item>
		</m-form>
	</view>
</template>

<script>
import { dateFormat } from '@/common/util.js';
export default {
	components: {},
	data() {
		return {
			fid: '',
			id: '',
			data: {
				id: '',
				selldate: dateFormat('yyyy-mm-dd', new Date()),
				client: '',
				price: '',
				weight: '',
				indate1: dateFormat('yyyy-mm-dd', new Date())
			}
		};
	},
	methods: {
		sumMoney() {
			if (this.data.price && this.data.weight) {
				return this.data.price * this.data.weight;
			} else {
				return 0;
			}
		},
		goBack() {
			uni.navigateBack();
		},
		save() {
			var data = Object.assign({ fid: this.fid }, this.data);
			this.$postData('/datainterface/savedata/cd92325237b14ed6a3566b4f0af3dd4f/saveSellInfo', data).then(res => {
				if (res.success) {
					//this.goBack();
					uni.showToast({
						title: '保存成功',
						duration: 2000,
						success: () => {}
					});
				}
			});
		},
		addIn() {
			if (!this.data.indate1) {
				this.data.indate1 = dateFormat('yyyy-mm-dd', new Date());
			} else if (!this.data.indate2) {
				this.data.indate2 = dateFormat('yyyy-mm-dd', new Date());
			} else if (!this.data.indate3) {
				this.data.indate3 = dateFormat('yyyy-mm-dd', new Date());
			} else {
				uni.showToast({
					icon: 'none',
					title: '只支持添加三次收款信息'
				});
			}
		}
	},
	onLoad(option) {
		this.fid = option.fid;
		this.id = option.id;
		if (this.id) {
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/getSellList', { id: this.id }).then(res => {
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
	}
}
</style>
