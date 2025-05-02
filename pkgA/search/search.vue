<template>
	<scroll-view class="page-container" scroll-y="true">
		<!-- 搜索栏 -->
		<view class="theme">搜索</view>
		<view style="display:flex; justify-content: center; margin-top: 105px;">
			<view class="navv">
				<view class="search">
					<image bind:tap="searchs" src="../img/搜索.png" mode="" />
				</view>
				<view class="fancy-bg"></view>
				<input type="text" @confirm="inputed" class="input" :placeholder="contents" auto-focus="true"
					v-model="msg" id="search" />
				<image class="guan" src="../img/cha1.png" @click="clear" hover-stop-propagation="true" mode="" />
			</view>
		</view>
		<view class="syl" v-if="flag">搜索历史
			<image @click="shanchu" class="shanchu" src="../img/shachu.png" mode="" />
		</view>
		<view class="kuai" v-if="flag">
			<view class="items" v-for="(item ,index) in items" :key="index" @click="shang" data-s="{{item}}">
				<text>{{item}}</text>
			</view>
		</view>
	</scroll-view>
	<view class="nono" v-if="!flag">
		<image src="../img/搜索1.png" mode="" />
		<text>
			当前未找到与关键词相关的内容，建议您调整搜索词或尝试其他关键词。
		</text>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	const flag = ref(true)
	const contents = ref('请输入搜索内容')
	const items = ref([
		'小红书', '什么什么有限公司'
	])
	const msg = ref('')
	const inputed = (e) => {

		let msg = e.detail.value
		console.log(msg)
		items.value.push(msg)
	}
	const clear = () => {
		msg.value = ''
	}
	const shang = (e) => {
		console.log(e.currentTarget.dataset.s.a)
		msg.value = e.currentTarget.dataset.s.a
	}
	const shanchu = () => {
		uni.showModal({
			content: '确定清除所有记录吗?', // 对话框内容
			showCancel: true, // 是否显示取消按钮
			success: (res) => {
				if (res.confirm) {
					items.value = []
				} else if (res.cancel) {

				}
			}
		});

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

	.search {

		margin-left: 2.5vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search image {
		height: 27px;
		width: 27px;

		margin-left: 5px;
	}

	.fancy-bg {
		margin-left: 1vw;
		width: 0.9px;
		height: 17px;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.input {
		width: 70%;
		margin-left: 25px;
		margin-right: 50px;
		font-size: 15px;
		font-weight: 400;
		letter-spacing: 1.5px;
		line-height: 21.72px;
		color: rgb(0, 0, 0) !important;
		vertical-align: top;
	}

	.shanchu {
		position: absolute;
		width: 15px;
		height: 16px;
		opacity: 1;
		right: 26px;
		padding: 5px;
	}

	.navv {
		width: 92vw;
		height: 34px;
		border-radius: 17px;
		background: rgba(245, 245, 245, 1);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.syl {
		position: relative;
		margin-top: 1vh;
		margin-left: 7vw;
		font-size: 15px;
		font-weight: 500;
		letter-spacing: 0.5px;
		line-height: 21.72px;
		color: rgba(56, 56, 56, 1);
		vertical-align: top;
	}

	.kuai {

		margin-left: 7vw;
		display: flex;
		flex-wrap: wrap;
	}

	.items {
		margin-top: 1vh;
		border-radius: 15px;
		background: rgba(255, 255, 255, 1);
		height: 24px;
		border: 0.5px solid rgba(229, 229, 229, 1);
		margin-right: 8px;
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 17.38px;
		color: rgba(79, 79, 79, 1);
		text-align: left;
		vertical-align: top;
		display: flex;
		align-items: center;
		padding: 1px 8px 1px 8px;
	}

	.items text {
		margin-left: 3px;
		margin-right: 3px;
	}

	.nono image {
		position: absolute;

		left: 50%;
		transform: translateX(-50%);
		top: 30%;
		width: 66px;
		height: 68.2px;
		opacity: 1;

	}

	.nono text {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 40%;
		width: 221px;
		height: 38px;
		opacity: 1;
		/** 文本1 */
		font-size: 13px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 18.82px;
		color: rgba(128, 128, 128, 1);
		text-align: justify;
		vertical-align: top;
	}

	.guan {
		position: fixed;
		right: 20px;
		z-index: 100;
		width: 18.5px;
		height: 18.5px;
		padding: 10px;
		opacity: 1;
		z-index: 1000;

	}
</style>