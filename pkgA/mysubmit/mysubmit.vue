<template>
	<scroll-view class="page-container" scroll-y="true">
		<view class="items">
			<view class="item" v-for="item in items" :key="item.id" @click="navs3">
				<view class="name">{{ item.name }}</view>
				<view class="tags">
					<view class="tag" v-for="tag in item.tags" :key="tag">
						{{ tag }}
					</view>
				</view>
				<img class="icon" src="../../static/行业@2x.png" alt="" />
				<text class="type">{{ item.type }}</text>
				<text class="status" :class="{ ended: item.status === '已结束' }">{{ item.status }}</text>
				<view class="coicon">
					<img :src="item.coicon" alt="aspectFit" />
				</view>
				<img src="../../static/浏览@2x.png" alt="" class="eye" />
				<text class="look">{{ item.look }}</text>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	const items = ref([{
			id: 1,
			name: "振石控股集团有限公司",
			tags: ["民营", "2000人以上", "校园大使"],
			type: "汽车|机械|创造",
			status: "招募中",
			coicon: "https://picsum.photos/200",
			look: "5000",
		},
		{
			id: 2,
			name: "振石控股集团有限公司",
			tags: ["民营", "2000人以上", "校园大使"],
			type: "汽车|机械|创造",
			status: "已结束",
			coicon: "https://picsum.photos/200",
			look: "5000",
		},
		{
			id: 3,
			name: "振石控股集团有限公司",
			tags: ["民营", "2000人以上", "校园大使"],
			type: "汽车|机械|创造",
			status: "招募中",
			coicon: "https://picsum.photos/200",
			look: "5000",
		},
		{
			id: 4,
			name: "振石控股集团有限公司",
			tags: ["民营", "2000人以上", "校园大使"],
			type: "汽车|机械|创造",
			status: "已结束",
			coicon: "https://picsum.photos/200",
			look: "5000",
		},
		{
			id: 5,
			name: "振石控股集团有限公司",
			tags: ["民营", "2000人以上", "校园大使"],
			type: "汽车|机械|创造",
			status: "招募中",
			coicon: "https://picsum.photos/200",
			look: "5000",
		},
		{
			id: 6,
			name: "振石控股集团有限公司",
			tags: ["民营", "2000人以上", "校园大使"],
			type: "汽车|机械|创造",
			status: "已结束",
			coicon: "https://picsum.photos/200",
			look: "5000",
		},
		{
			id: 6,
			name: "振石控股集团有限公司",
			tags: ["民营", "2000人以上", "校园大使"],
			type: "汽车|机械|创造",
			status: "已结束",
			coicon: "https://picsum.photos/200",
			look: "5000",
		},
		{
			id: 6,
			name: "振石控股集团有限公司",
			tags: ["民营", "2000人以上", "校园大使"],
			type: "汽车|机械|创造",
			status: "已结束",
			coicon: "https://picsum.photos/200",
			look: "5000",
		},
		{
			id: 6,
			name: "振石控股集团有限公司",
			tags: ["民营", "2000人以上", "校园大使"],
			type: "汽车|机械|创造",
			status: "已结束",
			coicon: "https://picsum.photos/200",
			look: "5000",
		},
	]);
	const navs3 = () => {
		uni.navigateTo({
			url: '/pkgA/detail/detail'
		})
	}
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

	.items {
		position: absolute;
		top: 10px;
		width: 100vw;
		height: auto;
		padding-bottom: 20px;
	}

	.item {
		position: relative;
		width: 90%;
		margin-left: 5%;
		height: 112px;
		opacity: 1;
		border-radius: 15px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
		margin-bottom: 8px;
	}

	.kong {
		width: 100vw;
		text-align: center;
		font-size: 12px;
		margin-top: 5px;
		font-weight: 400;
		color: rgb(143, 141, 141);
	}

	.name {
		position: absolute;
		left: 18px;
		top: 13px;

		opacity: 1;
		/** 文本1 */
		font-size: 14px;
		font-weight: 700;
		letter-spacing: 0px;
		line-height: 20.27px;
		color: rgba(56, 56, 56, 1);
		text-align: left;
		vertical-align: top;
	}

	.tags {
		position: absolute;
		left: 18px;
		top: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tags>.tag:nth-child(1) {
		background: rgba(255, 224, 194, 1);
		color: rgba(212, 106, 0, 1);
	}

	.tags>.tag:nth-child(2) {
		background: rgba(249, 255, 194, 1);
		color: rgba(166, 184, 11, 1);
	}

	.tags>.tag:nth-child(3) {
		background: rgba(255, 224, 254, 1);
		color: rgba(176, 33, 171, 1);
	}

	.tag {
		margin-right: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5px 7px;
		height: 14px;
		opacity: 1;
		border-radius: 5px;
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 15.93px;
		text-align: center;
		vertical-align: top;
	}

	.icon {
		position: absolute;
		left: 18px;
		top: 62px;
		width: 12px;
		height: 12px;
	}

	.type {
		font-size: 11px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 15.93px;
		color: rgba(56, 56, 56, 1);
		text-align: left;
		vertical-align: top;
		position: absolute;
		left: 37px;
		top: 60px;
	}

	.status {
		position: absolute;
		left: 18px;
		bottom: 10px;
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 15.83px;
		color: rgba(77, 100, 179, 1);
		text-align: left;
		vertical-align: top;
	}

	.coicon {
		position: absolute;
		right: 10px;
		top: 12px;
		width: 63px;
		height: 63px;
		opacity: 1;
		border-radius: 10px;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(166, 166, 166, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.coicon image {
		width: 100%;
		height: 100%;
	}

	.eye {
		width: 16px;
		height: 16px;
		position: absolute;
		right: 48px;
		bottom: 13px;
	}

	.look {
		font-size: 8px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 11.58px;
		color: rgba(56, 56, 56, 0.86);
		text-align: left;
		vertical-align: top;
		position: absolute;
		right: 26px;
		bottom: 15px;
	}
</style>