<template>
	<view class="img-container">
		<image class="img" @longpress="onLongPress1" src="/static/20250731160028.png" mode="widthFix" />
	</view>
	<text class="sts">洽谈合作</text>
	<text class="ttt">欢迎垂询，请长按识别二维码添加</text>
	<text class="tst">（添加时请备注：校园大使汇合作）</text>
	<view class="img-container">
		<image class="img" @longpress="onLongPress2" src="/static/20250731160046.png" mode="widthFix" />
	</view>
	<text class="sts">联系客服</text>
	<text class="ttt">随时为您服务，请长按识别二维码添加</text>

</template>

<script setup>
	function onLongPress1(event) {
		const imageUrl = '/static/20250731160028.png'; // 获取图片的路径
		wx.previewImage({
			current: imageUrl, // 当前要显示的图片url
			urls: [imageUrl], // 需要预览的图片url列表数组
			success: function(res) {
				//console.log('图片预览成功', res);
			},
			fail: function(err) {
				console.error('图片预览失败', err);
			}
		});
	}

	function onLongPress2(event) {
		const imageUrl = '/static/20250731160046.png'; // 获取图片的路径
		wx.previewImage({
			current: imageUrl, // 当前要显示的图片url
			urls: [imageUrl], // 需要预览的图片url列表数组
			success: function(res) {
				//console.log('图片预览成功', res);
			},
			fail: function(err) {
				console.error('图片预览失败', err);
			}
		});
	}
</script>

<style lang="scss" scoped>
	.img-container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.img {

		width: 65%;
		height: auto;
	}

	.ttt {
		width: 100%;
		text-align: center;
		display: block;
		opacity: 1;
		/** 文本1 */
		font-size: 16px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 23.17px;
		color: rgba(25, 25, 25, 1);

	}

	.tst {
		width: 100%;
		text-align: center;
		display: block;
		opacity: 1;
		/** 文本1 */
		font-size: 16px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 23.17px;
		color: rgba(42, 130, 228, 1);

	}

	.sts {
		width: 100%;
		text-align: center;
		font-size: 18px;
		font-weight: 700;
		letter-spacing: 0px;
		line-height: 26.06px;
		color: rgba(25, 25, 25, 1);
		display: block;
	}
</style>