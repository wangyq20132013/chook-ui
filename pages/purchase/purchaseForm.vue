<template>
	<view class="content">
		<m-form class="form" :model="data" ref="form">
			<m-form-item label="采购时间：" prop="buydate">
				<picker mode="date" :value="data.buydate" @change="data.buydate = $event.target.value">
					<text class="uni-input">{{ data.buydate }}</text>
				</picker>
			</m-form-item>
			<m-form-item label="原材料种类：" prop="type"><input type="text" v-model="data.type" /></m-form-item>
			<m-form-item label="供应商：" prop="provider"><input type="text" v-model="data.provider" /></m-form-item>
			<m-form-item label="采购单价(元/斤)：" prop="price"><input type="number" v-model="data.price" /></m-form-item>
			<m-form-item label="采购重量(斤)：" prop="weight"><input type="number" v-model="data.weight" /></m-form-item>
			<m-form-item label="应支付金额(元)：">{{ sumMoney() }}</m-form-item>
			<!-- <m-form-item label="当面结清："><switch :checked="data.status == 1" @change="switchStatus" style="float: right;" /></m-form-item> -->
			<view>
				<m-form-item label="支付时间1: ">
					<picker mode="date" :value="data.paydate1" @change="data.paydate1 = $event.target.value">
						<text class="uni-input">{{ data.paydate1 }}</text>
					</picker>
				</m-form-item>
				<m-form-item label="支付金额1: "><input type="digit" v-model="data.paymoney1" /></m-form-item>
			</view>
			<view v-if="data.paydate2">
				<m-form-item label="支付时间2: ">
					<picker mode="date" :value="data.paydate2" @change="data.paydate2 = $event.target.value">
						<text class="uni-input">{{ data.paydate2 }}</text>
					</picker>
				</m-form-item>
				<m-form-item label="支付金额2: "><input type="digit" v-model="data.paymoney2" /></m-form-item>
			</view>
			<view v-if="data.paydate3">
				<m-form-item label="支付时间3: ">
					<picker mode="date" :value="data.paydate3" @change="data.paydate3 = $event.target.value">
						<text class="uni-input">{{ data.paydate3 }}</text>
					</picker>
				</m-form-item>
				<m-form-item label="支付金额3: "><input type="digit" v-model="data.paymoney3" /></m-form-item>
			</view>
			<m-form-item><button type="default" @click="addPay">添加支付信息</button></m-form-item>
		</m-form>
		<view><button type="primary" @click="save">保存</button></view>
	</view>
</template>

<script>
import { dateFormat } from '@/common/util.js';
export default {
	data() {
		return {
			id: '',
			data: {
				id: '',
				buydate: dateFormat('yyyy-mm-dd', new Date()),
				max: '',
				describe: '',
				notes: '',
				status: 0,
				paydate1: dateFormat('yyyy-mm-dd', new Date())
			}
		};
	},
	methods: {
		switchStatus(e) {
			this.data.status = e.target.value ? 1 : 0;
			if ((this.data.status = 1)) {
				this.data.paydate1 = dateFormat('yyyy-mm-dd', new Date());
				this.data.paymoney1 = this.sumMoney();
			}
		},
		sumMoney() {
			if (this.data.price && this.data.weight) {
				return new Number(this.data.price * this.data.weight).toFixed(2);
			} else {
				return 0;
			}
		},
		goBack() {
			uni.navigateBack();
		},
		save() {
			var total = this.sumMoney();
			var sum = 0;
			if (this.data.paymoney1) {
				sum += new Number(this.data.paymoney1);
			}
			if (this.data.paymoney2) {
				sum += new Number(this.data.paymoney2);
			}
			if (this.data.paymoney3) {
				sum += new Number(this.data.paymoney3);
			}
			if (sum <= total) {
				if (sum == total) {
					this.status = 1;
				}
				this.$postData('/datainterface/savedata/cd92325237b14ed6a3566b4f0af3dd4f/savePurchaseInfo', this.data).then(res => {
					if (res.success) {
						//this.goBack();
						uni.showToast({
							title: '保存成功',
							duration: 2000,
							success: () => {}
						});
					}
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: '填写的支付金额大于应支付额'
				});
			}
		},
		addPay() {
			if (!this.data.paydate1) {
				this.data.paydate1 = dateFormat('yyyy-mm-dd', new Date());
			} else if (!this.data.paydate2) {
				this.data.paydate2 = dateFormat('yyyy-mm-dd', new Date());
			} else if (!this.data.paydate3) {
				this.data.paydate3 = dateFormat('yyyy-mm-dd', new Date());
			} else {
				uni.showToast({
					icon: 'none',
					title: '只支持添加三次支付信息'
				});
			}
		}
	},
	onLoad(option) {
		this.data.fid = option.fid;
		this.id = option.id;
		if (this.id) {
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/getPurchaseList', { id: this.id }).then(res => {
				if (res.data && res.data.length == 1) {
					var item = res.data[0];

					this.data = {
						id: item.ID,
						buydate: item.BUYDATE,
						type: item.TYPE,
						provider: item.PROVIDER,
						price: item.PRICE,
						weight: item.WEIGHT,
						status: item.STATUS,
						paydate1: item.PAYDATE1,
						paydate2: item.PAYDATE2,
						paydate3: item.PAYDATE3,
						paymoney1: item.PAYMONEY1,
						paymoney2: item.PAYMONEY2,
						paymoney3: item.PAYMONEY3
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

.navbar-bottom {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>
