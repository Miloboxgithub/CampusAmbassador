<template>
	<view class="page-container">
		<view class="moban">
			<img class="moban-img" src="../../static/模板1@2x (1).png" alt="" />
			<view class="line"></view>
			<text class="data">500人浏览过 | 88人使用过</text>
		</view>
	</view>
	<view class="bottom">
		<button open-type="share" class="btns"><img src="../../static/share.png" alt="" class="share" />
		</button><text class="ss">分享</text>
		<img src="../../static/collect.png" @click="collectsClick" alt="" class="collects" />
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
	onLoad(() => {
		wx.showShareMenu({
			withShareTicket: true,
			//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
			menus: ["shareAppMessage", "shareTimeline"]
		})
	});

	const collectsClick = () => {
		uni.showToast({
			title: "收藏成功",
			icon: "success"
		});
	};
	const downloadWord = () => {
		uni.showToast({
			title: "下载链接已复制成功请在外部浏览器中粘贴链接下载",
			icon: "none"
		});
	}
	onShareAppMessage(() => {
		return {
			title: '这是分享标题', // 分享标题
			path: '/pkgA/preview/preview', // 分享路径
		}
	})
</script>

<style lang="scss" scoped>
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
    .btns::after{
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