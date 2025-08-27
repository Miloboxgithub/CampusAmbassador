// 全局请求封装
// 基础API地址
const base_url = 'http://localhost:996'

/**
 * 统一的网络请求方法
 * @param {Object} params - 请求参数对象
 * @param {string} params.url - 请求URL路径
 * @param {string} [params.method="get"] - 请求方法，默认为get
 * @param {Object} [params.data={}] - 请求数据
 * @returns {Promise} 返回Promise对象
 */
export default (params) => {
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};
	let header = {}
	
	// 设置请求头
	if (method == "post") {
		header = {
			'Content-Type': 'application/json'
		};
	}
	
	// 获取本地token并添加到请求头
	if (uni.getStorageSync("token")) {
		header['Authorization'] = 'Bearer ' + uni.getStorageSync("token");
	}
 
	return new Promise((resolve, reject) => {
		uni.request({
			url: base_url + url,
			method: method,
			header: header,
			data: data,
			success(response) {
				const res = response
				// 根据返回的状态码做出对应的操作
				console.log(res.statusCode);
				
				if (res.statusCode == 200) {
					// 请求成功，返回数据
					resolve(res.data);
				} else {
					// 清除本地存储
					uni.clearStorageSync()
					
					// 根据不同的状态码进行不同的处理
					switch (res.statusCode) {
						case 401:
							// 未授权，需要登录
							uni.showModal({
								title: "提示",
								content: "请登录",
								showCancel: false,
								success(res) {
									setTimeout(() => {
										uni.navigateTo({
											url: "/pages/login/index",
										})
									}, 1000);
								},
							});
							break;
						case 404:
							// 请求地址不存在
							uni.showToast({
								title: '请求地址不存在...',
								duration: 2000,
							})
							break;
						default:
							// 其他错误
							uni.showToast({
								title: '请重试...',
								duration: 2000,
							})
							break;
					}
				}
			},
			fail(err) {
				console.log(err)
				// 网络请求失败处理
				if (err.errMsg.indexOf('request:fail') !== -1) {
					wx.showToast({
						title: '网络异常',
						icon: "error",
						duration: 2000
					})
				} else {
					wx.showToast({
						title: '未知异常',
						duration: 2000
					})
				}
				reject(err);
 
			},
			complete() {
				// 不管成功还是失败都会执行
				// 隐藏加载提示和Toast
				uni.hideLoading();
				uni.hideToast();
			}
		});
	}).catch((e) => {});
};
