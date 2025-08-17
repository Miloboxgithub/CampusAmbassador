<template>
	<view class="page-container">
		<view class="moban">
			<img class="moban-img" :src="TemplateImg" alt="" />
			<view class="line"></view>
			<text class="data"> {{viewCount}} 人浏览过 | {{downloadNumber}} 人使用过</text>
		</view>
	</view>
	<view class="bottom">
		<button open-type="share" class="btns"><img src="../../static/share.png" alt="" class="share" />
		</button><text class="ss">分享</text>
		<img :src="isCollected ? '../../static/collected.png' : '../../static/collect.png'" @click=" collectsClick"
			alt="" class="collects" />
		<text class="cc">收藏</text>
		<view class="btn" @click="downloadWord"> 下载word模板 </view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		onLoad,
		onShareAppMessage
	} from '@dcloudio/uni-app';
	import {
		getResumeTemplateDetail,
		getResumeTemplateLink,
		getResumeTemplateUseCount,
		addResumeTemplateUseCount,
		getResumeViewCount,
		addResumeViewCount,
		collectResumeTemplate,
		offCollectResumeTemplate
	} from "@/api/index.js";
	import {
		pageStore
	} from "@/store";
	import Loading from "@/components/Loading.vue";
import Template from "../../pages/template/template.vue";
	const isLoading = ref(false);
	const id = ref(null);
	const TemplateImg = ref("../../static/template.png"); // 模板图片路径
	const downloadNumber = ref(0); // 下载次数
	const isCollected = ref(false); // 是否已收藏
	const downloadUrl = ref(""); // 下载链接
	const shareData = ref()
	const viewCount = ref(0); // 浏览次数
	onLoad(async (option) => {
		wx.showShareMenu({
			withShareTicket: true,
			//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
			menus: ["shareAppMessage", "shareTimeline"]
		})
		isLoading.value = true; // 显示加载状态
		id.value = option.id; // 获取传递的 id
		console.log("接收到的 id:", id.value);
		const res = await getResumeTemplateDetail(id.value);
		console.log("获取到的详情:", res);
		if (res.statusCode === 200&&res.data.code==1) {
			isLoading.value = false; // 隐藏加载状态
			// 处理获取到的模板详情数据
			let info = res.data.data;
			TemplateImg.value = info.templateSampleGraph; // 设置模板图片路径
			downloadNumber.value = info.usageCount; // 设置下载次数
			isCollected.value = info.isFavorite; // 设置收藏状态
			downloadUrl.value = info.shareLinks.web.shareLink; // 设置下载链接
			shareData.value = info.shareLinks.miniapp; // 设置分享数据
			viewCount.value = info.viewCount; // 设置浏览次数
		} else {
			isLoading.value = false; // 隐藏加载状态
			uni.showToast({
				title: "获取详情失败",
				icon: "error",
			});
		}
		// 增加浏览次数
		await addResumeViewCount(id.value);
	});
	
	const collectsClick = async () => {
		if(!isCollected.value){
			// 如果当前未收藏，则执行收藏操作
			const res  = await collectResumeTemplate(id.value);
			if(res.statusCode == 200 || res.data.code == 1) {
				isCollected.value = !isCollected.value; // 切换收藏状态
				uni.showToast({
					title: "收藏成功",
					icon: "success"
				});
				return;
			}
		} else {
			// 如果当前已收藏，则执行取消收藏操作
			const res  = await offCollectResumeTemplate(id.value);
			if(res.statusCode == 200 || res.data.code == 1) {
				isCollected.value = !isCollected.value; // 切换收藏状态
				uni.showToast({
					title: "取消收藏成功",
					icon: "success"
				});
				return;
			}
		}
		
		

	};
	const downloadWord = () => {
		if (!downloadUrl.value) {
			uni.showToast({
				title: "下载链接不存在",
				icon: "none"
			});
			return;
		}
		// 将下载链接复制到剪贴板
		uni.setClipboardData({
			data: downloadUrl.value,
			success: () => {
				uni.showToast({
					title: "下载链接已复制成功，请在外部浏览器中粘贴链接下载",
					icon: "none"
				});
			},
			fail: () => {
				uni.showToast({
					title: "复制链接失败，请手动复制",
					icon: "none"
				});
			}
		});
	}
	onShareAppMessage(async() => {
		
		return {
			title: shareData.value.templateName, // 分享标题
			path: `/pkgA/preview/preview?id=${id.value}`, // 分享路径
			imageUrl: shareData.value.templateSampleGraph, // 分享图片
		}
	})
</script>

<style lang="scss" scoped>
	.collects:active {
		transform: scale(1.3);
		/* 点击时的放大效果 */
	}

	.page-container {
		background: rgb(245, 245, 245);
		height: 100vh;
		/* 使用视口高度确保填充整个页面 */
		width: 100vw;
		/* 使用视口宽度确保填充整个页面 */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.moban {
		width: 92%;
		height: 524px;
		opacity: 1;
		position: absolute;
		overflow: hidden;
		top: 8px;
		border-radius: 15px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
	}

	.line {
		position: absolute;
		bottom: 31.5px;
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
		height: 475.24px;
		opacity: 1;
	}

	.data {
		/** 文本1 */
		font-size: 10px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 14.48px;
		color: rgba(166, 166, 166, 1);
		text-align: center;
		vertical-align: top;
		position: absolute;
		left: 18px;
		bottom: 9px;
	}

	.line {
		position: absolute;
		bottom: 32px;

		width: 100%;
		height: 0px;
		opacity: 1;
		border: 0.01px solid rgba(0, 0, 0, 0.3);
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100vw;
		height: 79px;
		opacity: 1;
		background: rgba(255, 255, 255, 1);
	}

	.share {
		position: absolute;
		left: 0px;
		bottom: 0px;
		width: 23px;
		height: 23px;
	}

	.btns {
		position: absolute;
		left: 41px;
		bottom: 37px;
		background-color: rgba(255, 255, 255, 1);
		width: 30px;
		height: 30px;
		/* 移除默认样式 */
		border: none;
		border-radius: 0;
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btns::after {
		border: none;
	}

	.ss {
		position: absolute;
		left: 41px;
		bottom: 17px;
		font-size: 13px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 18.82px;
		color: rgba(56, 56, 56, 0.8);
		text-align: left;
		vertical-align: top;
	}

	.collects {
		transition: transform 0.3s ease, color 0.3s ease;
		position: absolute;
		left: 30%;
		bottom: 37px;
		width: 25px;
		height: 23.97px;
		opacity: 1;
	}

	.cc {
		position: absolute;
		left: 30%;
		bottom: 17px;
		font-size: 13px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 18.82px;
		color: rgba(56, 56, 56, 0.8);
		text-align: left;
		vertical-align: top;
	}

	.btn {
		position: absolute;
		bottom: 22px;
		right: 19px;
		width: 40%;
		height: 38px;
		opacity: 1;
		border-radius: 19px;
		background: linear-gradient(90deg,
				rgba(79, 120, 255, 1) 0%,
				rgba(79, 120, 255, 0.7) 100%);
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 20.27px;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		vertical-align: top;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>