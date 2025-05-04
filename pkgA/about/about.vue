<template>
	<view class="containers">
		<text
			class="no">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;深圳市垂直招聘科技有限公司是一家深耕于人力资源领域的互联网科技企业，旗下拥有『校园大使汇』、『实习大全』、『内推码』等一系列新生代求职品牌，全面覆盖“校园大使——实习——校招”三大关键求职环节。公司产品影响力辐射全国33个省级行政区、269个城市，覆盖海内外千余所高校，并在海外多所知名高校享有盛誉。</text>
		<view class="tst">联系方式：<text style="font-weight: 400;" @click="copyText"
				data-text="18718513415">18718513415</text></view>
		<view class="tst">电子邮箱：<text style="font-weight: 400;" @click="copyText"
				data-text="bd@xydsh.cn">bd@xydsh.cn</text></view>
		<view class="tst">官网：<text style="font-weight: 400;" @click="copyText"
				data-text="www.xydsh.cn">www.xydsh.cn</text></view>
		<view class="scan">
			<image src="../img/校园大使汇公众号二维码.png" @longpress="onLongPress" mode="" />
		</view>
		<text class="last">公众号：校园大使汇</text>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	function onLongPress(event) {
		const imageUrl = 'https://shixi.xydsh.cn/images/companyLogo/3ab27cae-54b1-490d-82db-134005ae7760.png'
		wx.previewImage({
			current: imageUrl, // 当前要显示的图片url
			urls: [imageUrl], // 需要预览的图片url列表数组
			success: function(res) {
				console.log('图片预览成功', res);
			},
			fail: function(err) {
				console.error('图片预览失败', err);
			}
		});
	}

	function copyText(event) {
		console.log(event)
		const textToCopy = event.currentTarget.dataset.text; // 获取需要复制的文本
		wx.setClipboardData({
			data: textToCopy, // 要复制的内容
			success: function(res) {
				wx.showToast({
					title: '复制成功',
					icon: 'success',
					duration: 2000
				});
			},
			fail: function(err) {
				console.error('复制失败', err);
				wx.showToast({
					title: '复制失败',
					icon: 'none',
					duration: 2000
				});
			}
		});
	}
</script>

<style lang="scss" scoped>
	.no {
		display: block;
		margin-top: 15px;
		width: 100%;
		opacity: 1;
		/** 文本1 */
		font-size: 16.8px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 24.33px;
		color: rgba(25, 25, 25, 1);
		text-align: justify;
		white-space: pre-wrap;
		margin-bottom: 20px;
	}

	.scan {
		margin-top: 18px;
		width: 100%;
		display: flex;
		justify-content: center;
		opacity: 1;
	}

	.scan image {
		width: 190px;
		height: 190px;
		opacity: 1;
	}

	.tst {
		opacity: 1;
		/** 文本1 */
		font-size: 16px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 23.17px;
		color: rgba(25, 25, 25, 1);
		text-align: justify;
		vertical-align: top;
		font-weight: 600;
	}

	.containers {
		padding-left: 10px;
		padding-right: 10px;
	}

	.last {
		display: block;
		width: 100%;
		text-align: center;
		opacity: 1;
		/** 文本1 */
		font-size: 16px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 23.17px;
		color: rgba(25, 25, 25, 1);


	}
</style>