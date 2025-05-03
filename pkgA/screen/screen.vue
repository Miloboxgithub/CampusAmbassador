<template>
	<view class="choice">
		<text class="title">状态筛选</text>
		<view class="status">
			<view :class="{ 'st1': std, 'st2': !std }" @click="switchs(true)">招募中</view>
			<view :class="{ 'st2': std, 'st1': !std }" @click="switchs(false)">已结束</view>
		</view>
	</view>
	<view class="choice" @click="openPopup('学历要求')">
		<text class="title">学历要求</text>
		<view class="option">
			<text class="nnn">{{edu}}</text>
			<img src="../img/xia.png" alt="" class="icon" />
		</view>
	</view>
	<view class="choice" @click="openPopup('专业要求')">
		<text class="title">专业要求</text>
		<view class="option">
			<text class="nnn">{{major}}</text>
			<img src="../img/xia.png" alt="" class="icon" />
		</view>
	</view>
	<view class="choice" @click="openPopup('年级要求')">
		<text class="title">年级要求</text>
		<view class="option">
			<text class="nnn">{{grade}}</text>
			<img src="../img/xia.png" alt="" class="icon" />
		</view>
	</view>
	<view class="choice" @click="openPopup('行业要求')">
		<text class="title">行业要求</text>
		<view class="option">
			<text class="nnn">{{ind}}</text>
			<img src="../img/xia.png" alt="" class="icon" />
		</view>
	</view>
	<view class="choice" @click="openPopup('企业要求')">
		<text class="title">企业要求</text>
		<view class="option">
			<text class="nnn">{{company}}</text>
			<img src="../img/xia.png" alt="" class="icon" />
		</view>
	</view>
	<view class="choice" @click="openPopup('公司规模')">
		<text class="title">公司规模</text>
		<view class="option">
			<text class="nnn">{{guimo}}</text>
			<img src="../img/xia.png" alt="" class="icon" />
		</view>
	</view>
	<view class="kong"></view>
	<view class="footer">
		<image src="../img/Combined Shape@2x.png" class="chong" mode=""></image>
		<text class="zhi">重置</text>
		<view class="res">确认</view>
	</view>
	<uni-popup ref="popups" type="bottom" mask="true" @change="change">
		<view class="popup-content">
			<view class="quxiao" @click="closePopup">取消</view>
			<view class="queren" @click="queren">确认</view>
			<text class="theme">请选择{{theme}}</text>
			<view class="content">
				<view v-for="(item,index) in items">
					<view class="op" :class="{'lan':item.f==true}" @click="select(index)">{{item.n}}</view>
					<view class="line" v-if="index != items.length - 1 "></view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	const std = ref(true)
	const items = ref([])
	const edu = ref('')
	const major = ref('')
	const grade = ref('')
	const ind = ref('')
	const company = ref('')
	const guimo = ref('')
	const xueli = ref([{
		n: '学历不限',
		f: false
	}, {
		n: '专科',
		f: false
	}, {
		n: '本科',
		f: false
	}, {
		n: '硕士',
		f: false
	}, {
		n: '博士',
		f: false
	}])

	const popups = ref();
	const theme = ref('')
	// 打开弹窗
	const openPopup = (e) => {
		theme.value = e
		if (e == '学历要求') {
			items.value = xueli.value
		}
		if (popups.value) {
			popups.value.open();
		}
	};

	// 关闭弹窗
	const closePopup = () => {
		if (popups.value) {
			popups.value.close();
		}
	};

	const change = () => {
		console.log("Popup state changed");
	};
	const select = (e) => {
		items.value.forEach((i) => {
			i.f = false
		})
		items.value[e].f = true
	}
	const queren = () => {
		if (theme.value == '学历要求') {
			items.value.forEach((i) => {
				if (i.f) {
					edu.value = i.n
				}
			})
		}
		closePopup()
	}
	const switchs = (e) => {
		std.value = e
	}
</script>

<style lang="scss" scoped>
	.kong {
		width: 100vw;
		height: 100px;
	}

	.title {
		display: block;
		margin-left: 10%;
		margin-top: 13px;
		margin-bottom: 12px;
		font-size: 16px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 23.17px;
		color: rgba(20, 74, 250, 1);
		text-align: left;
		vertical-align: top;
	}

	.status {
		width: 80%;
		height: 40px;
		opacity: 1;
		border-radius: 10px;
		background: rgba(240, 244, 252, 1);
		margin-left: 10%;
		display: flex;
	}

	.st1 {
		width: 50%;
		height: 40px;
		opacity: 1;
		border-radius: 10px;
		background: rgba(88, 127, 255, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 23.17px;
		color: rgba(255, 255, 255, 1);
		text-align: left;
		vertical-align: top;
	}

	.st2 {
		width: 50%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 23.17px;
		color: rgba(166, 166, 166, 1);
		text-align: left;
		vertical-align: top;
	}

	.option {
		width: 80%;
		margin-left: 10%;
		height: 40px;
		opacity: 1;
		border-radius: 10px;
		background: rgba(240, 244, 252, 1);
		position: relative;
	}

	.icon {
		position: absolute;
		right: 14.5px;
		top: 50%;
		transform: translateY(-50%);
		width: 19.27px;
		height: 10px;
		opacity: 1;
	}

	.popup-content {
		background-color: #fff;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		min-height: 240px;
		width: 100%;
		padding-top: 56px;
	}

	.quxiao {
		position: absolute;
		top: 16px;
		left: 25px;
		font-size: 16px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 23.17px;
		color: rgba(166, 166, 166, 1);
		text-align: left;
		vertical-align: top;
	}

	.queren {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 13px;
		right: 13px;
		width: 56px;
		height: 30px;
		opacity: 1;
		border-radius: 15px;
		background: rgba(79, 120, 255, 1);
		font-size: 16px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 23.17px;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		vertical-align: top;

	}

	.theme {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 16px;
		font-size: 16px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 23.17px;
		color: rgba(56, 56, 56, 1);
		text-align: center;
		vertical-align: top;
	}

	.content {
		width: 100%;
		padding-bottom: 20px;
	}

	.op {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 26.06px;
		color: rgba(166, 166, 166, 1);
		text-align: center;
		vertical-align: top;
		transition: font-size 0.3s ease, color 0.3s ease;
	}

	.lan {
		color: rgba(79, 120, 255, 1) !important;
		font-size: 20px !important;
	}

	.nnn {
		color: rgba(79, 120, 255, 1);
		font-size: 18px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 25px;
	}

	.line {
		margin-left: 5%;
		width: 90%;
		height: 0px;
		opacity: 1;
		margin-top: 10px;
		margin-bottom: 8px;
		border: 0.5px solid rgba(229, 229, 229, 1);
	}

	.chong {
		width: 19.48px;
		height: 19.5px;
		opacity: 1;
		position: absolute;
		left: 20%;
		bottom: 45px;
	}

	.zhi {
		font-size: 18px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 26.06px;
		color: rgba(56, 56, 56, 1);
		text-align: left;
		vertical-align: top;
		position: absolute;
		left: 18%;
		bottom: 15px;
	}

	.res {
		position: absolute;
		right: 10%;
		bottom: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200px;
		height: 38px;
		opacity: 1;
		border-radius: 19px;
		background: linear-gradient(90deg, rgba(79, 120, 255, 1) 0%, rgba(79, 120, 255, 0.7) 100%);
		font-size: 18px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 26.06px;
		color: rgba(255, 255, 255, 1);
		text-align: left;
		vertical-align: top;
	}

	.footer {
		position: fixed;
		width: 100vw;
		min-height: 50px;
		bottom: 0;
	}
</style>