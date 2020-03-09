<template>
	<view class="content">
		<sl-filter :topFixed="true" :isTransNav="true" :navHeight="0" color="#000" themeColor="#5285c5" :menuList="menuList" @result="result"></sl-filter>
		<view class="uni-title uni-center">敬请期待</view>
		<canvas canvas-id="canvasPie" id="canvasPie" class="charts-pie" @touchstart="touchPie"></canvas>
	</view>
</template>

<script>
import uCharts from '@/components/u-charts/u-charts.js';
export default {
	components: {},
	data() {
		return {
			menuList: [
				{
					title: '客户',
					detailTitle: '子标题1',
					isMutiple: false,
					key: 'client',
					detailList: [{ title: '全部', value: '' },{ title: '张三', value: '' }]
				},
				{
					title: '菜单2',
					detailTitle: '子标题2',
					key: 'key_2',
					isMutiple: false,
					detailList: [
						{
							title: '不限',
							value: ''
						},
						{
							title: '条件_2_1',
							value: 'val_2_1'
						},
						{
							title: '条件_2_2',
							value: 'val_2_2'
						}
					]
				},
				{
					title: '菜单3',
					detailTitle: '子标题3',
					key: 'key_3',
					isSort: true,
					isMutiple: false,
					detailList: [
						{
							title: '条件_3_1',
							value: 'val_3_1'
						},
						{
							title: '条件_3_2',
							value: 'val_3_2'
						},
						{
							title: '条件_3_3',
							value: 'val_3_3'
						}
					]
				}
			],
			options: {
				series: [
					{
						name: '一班',
						data: 50
					},
					{
						name: '二班',
						data: 30
					},
					{
						name: '三班',
						data: 20
					},
					{
						name: '四班',
						data: 18
					},
					{
						name: '五班',
						data: 8
					}
				]
			}
		};
	},
	onLoad() {
		this.canvaPie = new uCharts({
			$this: this,
			canvasId: 'canvasPie',
			type: 'pie',
			fontSize: 11,
			legend: { show: true },
			background: '#FFFFFF',
			pixelRatio: 1,
			series: this.options.series,
			animation: true,
			width: uni.upx2px(1080),
			height: uni.upx2px(1920),
			dataLabel: true,
			extra: {
				pie: {
					lableWidth: 15
				}
			}
		});
	},
	methods: {
		touchPie(e) {
			this.canvaPie.showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data;
				}
			});
		},
		result(data) {
			debugger;
		}
	}
};
</script>

<style></style>
