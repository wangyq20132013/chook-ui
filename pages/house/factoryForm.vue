<template>
	<view class="content">
		<m-form :model="data" ref="form">
			<m-form-item label="名称：" prop="name"><input type="text" v-model="data.name" /></m-form-item>
			<m-form-item>
				<button type="primary" size="mini" @click="save">保存</button>
				<button type="primary" v-show="id" size="mini" @click="house">鸡舍管理</button>
				<button type="default" size="mini" @click="remove">删除</button>
			</m-form-item>
		</m-form>
		<view>
			
		</view>
	</view>
</template>

<script>
export default {
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
			this.$postData('/datainterface/savedata/cd92325237b14ed6a3566b4f0af3dd4f/saveMyChookFactory', this.data).then(res => {
				if (res.success) {
					//this.goBack();
					uni.showToast({
						title: '保存成功',
						duration: 2000,
						success: () => {}
					});
					this.id = res.data.uuid;
				}
			});
		},
		house(){
			uni.navigateTo({
				url: "house?fid="+this.id
			})
		},
		remove(){
			uni.showModal({
				title: '提示',
				content: '确认删除？',
				success: res => {
					if (res.confirm) {
						this.$postData('/datainterface/savedata/cd92325237b14ed6a3566b4f0af3dd4f/deleteMyChookFactory', { id: this.id }).then(res => {
							if (res.success) {
								uni.showToast({
									title: '删除成功',
									duration: 2000,
									success: () => {
										uni.navigateBack({
											
										})
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
	onLoad(option) {
		this.id = option.id;
		if (this.id) {
			this.$getData('/datainterface/getdata/list/cd92325237b14ed6a3566b4f0af3dd4f/queryMyChookFactory', { id: this.id }).then(res => {
				if (res.data && res.data.length == 1) {
					var item = res.data[0];

					this.data = {
						id: item.ID,
						name: item.NAME
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
