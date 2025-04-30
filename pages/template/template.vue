<template>
	<scroll-view class="page-container" scroll-y="true">
		<view class="theme">简历模板</view>
		<img class="tu1" src="../../static/Vertical@2x.png" alt="" />
		<img class="tu2" src="../../static/_recruitment@2x.png" alt="" />
		<img class="tu3" src="../../static/简历制作神器@2x.png" alt="" />
		<text class="tu4">— — 丰富模版 · 文档编辑 · 实时预览 · 免费下载 — — </text>
		<view class="ke">
			<view style="width: 100%;display: flex; justify-content: space-between; ">
				<view class="type" :class="{'activeType':item.flag}" v-for="(item ,index) in types" :key="index"
					@click="changeType(item)">{{ item.name }}</view>
			</view>
			<view class="mobans">
				<view class="moban" v-for="(item ,index) in mobans" :key="index" @click="navs">
					<img class="moban-img" :src="item.img" alt="" />
					<view class="line"></view>
					<img src="../../static/下载@2x.png" alt="" class="download">
					<text class="sum">{{ item.sum }}</text>
					<img src="../../static/collect.png" alt="" class="collect">
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	const types = ref([{
			name: "通用",
			flag: true
		},
		{
			name: "简约",
			flag: false
		},
		{
			name: "现代",
			flag: false
		},
		{
			name: "经典",
			flag: false
		},
		{
			name: "创意",
			flag: false
		},
		{
			name: "专业",
			flag: false
		},
		{
			name: "英文",
			flag: false
		},
	])
	const mobans = ref([{
			img: "../../static/模板1@2x.png",
			sum: 5000
		},
		{
			img: "../../static/模板1@2x (1).png",
			sum: 5000
		},
		{
			img: "../../static/模板1@2x (2).png",
			sum: 5000
		},
		{
			img: "../../static/模板1@2x (3).png",
			sum: 5000
		},

	])
	const changeType = (i) => {
		types.value.forEach((item) => {
			item.flag = false;
		});
		i.flag = true;
	};
  const navs = () => {
		uni.navigateTo({
			url: '/pkgA/preview/preview'
		})
  }
</script>

<style lang="scss" scoped>
	.page-container {
		background: linear-gradient(to bottom, #dbe8ff, #f5f5f5 50%);
		backdrop-filter: blur(87px);
		height: 100vh;
		/* 使用视口高度确保填充整个页面 */
		width: 100vw;
		/* 使用视口宽度确保填充整个页面 */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.theme {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 53.79px;
		width: 90px;
		height: 27px;
		opacity: 0.9;
		/** 文本1 */
		font-size: 18px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 26.06px;
		color: rgba(0, 0, 0, 1);
		text-align: center;
		vertical-align: top;
	}

	.tu1 {
		position: absolute;
		left: 31px;
		top: 99px;
		width: 114px;
		height: 28px;
		opacity: 1;
		/** 文本1 */
		font-size: 20px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 31.13px;
		color: rgba(0, 79, 168, 1);
		text-align: left;
		vertical-align: top;
	}

	.tu2 {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 127px;
		width: 134px;
		height: 24px;
		opacity: 1;
		/** 文本1 */
		font-size: 16px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 24.91px;
		color: rgba(2, 85, 181, 1);
		text-align: left;
		vertical-align: top;
	}

	.tu3 {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 155px;
		width: 198px;
		height: 41px;
		opacity: 1;
		/** 文本1 */
		font-size: 32px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 38.4px;
		color: rgba(0, 79, 168, 1);
		text-align: left;
		vertical-align: top;
	}

	.tu4 {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 203px;
		width: 320px;
		height: 13px;
		opacity: 1;
		/** 文本1 */
		font-size: 11px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 15.93px;
		color: rgba(112, 122, 128, 1);
		text-align: center;
		vertical-align: top;
	}

	.ke {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 92vw;
		top: 240px;
		padding-bottom: 30px;
	}

	.type {
		width: 46px;
		height: 24px;
		opacity: 1;
		border-radius: 12.5px;
		background: rgb(255, 255, 255);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0px;
		color: rgb(0, 0, 0);
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.activeType {
		background: rgba(79, 120, 255, 1);
		color: rgba(255, 255, 255, 1);
	}

	.mobans {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.moban {
		width: 48%;
		margin-top: 12px;
		height: 261.51px;
		opacity: 1;
		border-radius: 5px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
		position: relative;
		overflow: hidden;
	}

	.line {
		position: absolute;
		bottom: 22px;
		top: 239.52px;
		width: 100%;
		height: 0px;
		opacity: 1;
		border: 0.01px solid rgba(0, 0, 0, 0.3);
	}

	.moban-img {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 5px;
		width: 96%;
		height: 231px;
		opacity: 1;
	}

	.download {
		position: absolute;
		left: 14px;
		bottom: 5.5px;
		width: 12px;
		height: 12px;
		opacity: 1;
	}

	.sum {
		position: absolute;
		left: 31px;
		bottom: 5.5px;
		font-size: 7px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 10.14px;
		color: rgba(67, 79, 120, 1);
		text-align: left;
		vertical-align: top;
	}

	.collect {
		position: absolute;
		width: 11px;
		height: 11px;
		right: 13px;
		bottom: 5.5px;
	}
</style>