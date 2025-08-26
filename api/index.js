
//校园招聘岗位分页查询
export const getCampusByPage = (e) => {
	console.log(e, '获取校园招聘岗位分页查询参数');
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://xydsh.cn/api/campus/page',
			data: {
				page: e.page,
				pageSize: e.pageSize,
				keyword: e.keyword || '',
				industries: e.industry || '',
				scale: e.scale || '',
				type: e.type || '',
				educationalRequire: e.educationalRequire || '',
				majorRequire: e.majorRequire || '',
				gradeRequire: e.gradeRequire || '',
				status: e.status || '',
				// page: 1,
				// pageSize: 20,
				// keyword: 'hhhhhhhhhhhhhhhhhh',
				// industry: '',
				// scale: '',
				// type: '',
				// educationalRequire:  '',
				// majorRequire: '',
				// gradeRequire: '',
				// status:  '',
			},
			header: {
				'content-type': 'application/json'
			},
			method: 'POST',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, 'hhhh');
				resolve(result.data.data.records); // 返回数据
			},
			fail: (error) => {
				reject(error); // 处理失败情况
			},
			complete: () => { }
		});
	});
};
//获取筛选选项
export const getFilterOptions = (e) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://xydsh.cn/api/wechat/filter/options',
			data: {
			},
			header: {
				'content-type': 'application/json'
			},
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				resolve(result); // 返回数据
			},
			fail: (error) => {
				reject(error); // 处理失败情况
			},
			complete: () => { }
		});
	});
};
//获取简历页选项
export const getResumeOptions = (e) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://xydsh.cn/api/wechat/user/form-data',
			data: {
			},
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				resolve(result); // 返回数据
			},
			fail: (error) => {
				reject(error); // 处理失败情况
			},
			complete: () => { }
		});
	});
};
//获取校园招聘岗位详情
export const getCampusDetail = (id) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://xydsh.cn/api/campus/${id}`,
			data: {},
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				//console.log(result.data.data.records, 'hhhh');
				resolve(result); // 返回数据
			},
			fail: (error) => {
				reject(error); // 处理失败情况
			},
			complete: () => { }
		});
	});
}
//收藏校园招聘岗位
export const collectCampusDetail = (e) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://api.xydsh.cn/api/wechat/favorite/campus',
			data: {
				userId: uni.getStorageSync('userId') || '', // 获取用户ID
				campusId: e,
			},
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'POST',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '收藏成功');
				if(result.data.msg=="NOT_LOGIN"){
					console.log('登录过期，请重新登录');
					uni.setStorageSync("loginStatus", false);
					uni.showModal({
						title: '登录过期，请重新登录',
						content: '',
						showCancel: false,
						cancelText: '取消',
						cancelColor: '#000000',
						confirmText: '确定',
						confirmColor: '#4F78FF',
						success: (result) => {
							if (result.confirm) {
								uni.switchTab({
									url: "/pages/personage/personage",
								  });
							}
						},
						fail: () => {},
						complete: () => {}
					});
					  
				}
				resolve(result); // 返回数据
			},
			fail: (err) => {
				reject('收藏失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}
//取消收藏校园招聘岗位
export const offCollectCampusDetail = (e) => {
	let userId = uni.getStorageSync('userId') || ''; // 获取用户ID
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://api.xydsh.cn/api/wechat/favorite/campus/${userId}/${e}`,
			data: {
			},
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'DELETE',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '取消收藏成功');

				resolve(result); // 返回数据
			},
			fail: (err) => {
				reject('取消收藏失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}
//获取用户收藏的校园大使职位列表
export const getUserCollects = (e) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://api.xydsh.cn/api/wechat/favorite/campus`,
			data: {
				userId: uni.getStorageSync('userId') || '', // 获取用户ID
				page: e.page || 1,
				pageSize: e.pageSize || 10,
			},
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				//console.log(result.data.data.records, 'hhhh');
				if(result.data.msg=="NOT_LOGIN"){
					console.log('登录过期，请重新登录');
					uni.setStorageSync("loginStatus", false);
					uni.showModal({
						title: '登录过期，请重新登录',
						content: '',
						showCancel: false,
						cancelText: '取消',
						cancelColor: '#000000',
						confirmText: '确定',
						confirmColor: '#4F78FF',
						success: (result) => {
							if (result.confirm) {
								uni.switchTab({
									url: "/pages/personage/personage",
								  });
							}
						},
						fail: () => {},
						complete: () => {}
					});
					  
				}
				resolve(result.data.data.records); // 返回数据
			},
			fail: (error) => {
				reject(error); // 处理失败情况
			},
			complete: () => { }
		});
	});
}
//获取用户收藏的简历模板列表
export const getTemplateCollects = (e) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://api.xydsh.cn/api/wechat/favorite/template/list`,
			data: {
				page: e.page || 1,
				pageSize: e.pageSize || 10,
			},
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, 'hhD大调hhjjjjjjjjjj');
				
				resolve(result.data.data.records); // 返回数据
			},
			fail: (error) => {
				reject(error); // 处理失败情况
			},
			complete: () => { }
		});
	});
}
//投递校园招聘岗位
export const postCampusApply = (e) => {
	console.log(e,'post')
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://xydsh.cn/api/campus/deliver',
			data: {
				campusId: parseInt(e),
				resumeId: uni.getStorageSync("resumeId")
			},
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'POST',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '投递成功');
				if(result.data.msg=="NOT_LOGIN"||result.data.msg=="用户未登录或token无效"){
					console.log('登录过期，请重新登录');
					uni.setStorageSync("loginStatus", false);
					uni.showModal({
						title: '登录过期，请重新登录',
						content: '',
						showCancel: false,
						cancelText: '取消',
						cancelColor: '#000000',
						confirmText: '确定',
						confirmColor: '#4F78FF',
						success: (result) => {
							if (result.confirm) {
								uni.switchTab({
									url: "/pages/personage/personage",
								  });
							}
						},
						fail: () => {},
						complete: () => {}
					});
					  return;
				}
				resolve(result); // 返回数据
			},
			fail: (err) => {
				reject('投递失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}

//获取简历模板列表
export const getResumeTemplate = (e) => {
	console.log(e)
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://api.xydsh.cn/wechat/templates/page',
			data: {
				page: e.page || 1,
				pageSize: e.pageSize || 10,
				style: e.type || ''
			},
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '获取简历模板列表');
				resolve(result.data.data.templates); // 返回数据
			},
			fail: (err) => {
				reject('获取简历模板列表失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}
//获取简历模板详情
export const getResumeTemplateDetail = (id) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://api.xydsh.cn/wechat/templates/info/${id}?includeShareLinks=true&shareType=both&incrementUsage=true`,
			data: {},
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'POST',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '获取简历模板详情');
				resolve(result); // 返回数据
			},
			fail: (err) => {
				reject('获取简历模板列表失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}
//获取模板分享链接
export const getResumeTemplateLink = (id) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://api.xydsh.cn/templates/miniapp/share/${id}`,
			data: {},
			header: {
				'content-type': 'application/json'
			},
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '获取模板分享链接');
				resolve(result); // 返回数据
			},
			fail: (err) => {
				reject('获取模板分享链接失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}
//增加简历浏览量

export const addResumeViewCount = (resumeid) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://api.xydsh.cn/wechat/resume/view/${resumeid}`,
			data: {},
			header: {
				'content-type': 'application/json'
			},
			method: 'POST',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '增加简历浏览量');
				resolve(result); // 返回数据
			},
			fail: (err) => {
				reject('增加简历浏览量失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}
//获取简历浏览量
export const getResumeViewCount = (resumeid) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://api.xydsh.cn/wechat/resume/view/${resumeid}`,
			data: {},
			header: {
				'content-type': 'application/json'

			},
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '获取简历浏览量');
				resolve(result); // 返回数据
			},
			fail: (err) => {
				reject('获取简历浏览量失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}
//增加简历模板使用次数
export const addResumeTemplateUseCount = (templateid) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://api.xydsh.cn/wechat/templates/use/${templateid}`,
			data: {},
			header: {
				'content-type': 'application/json'
			},
			method: 'POST',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '增加简历模板使用次数');
				resolve(result); // 返回数据
			},
			fail: (err) => {
				reject('增加简历模板使用次数失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}
//获取简历模板使用次数
export const getResumeTemplateUseCount = (templateid) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://api.xydsh.cn/wechat/templates/usage/${templateid}`,
			data: {},
			header: {
				'content-type': 'application/json'
			},
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '获取简历模板使用次数');
				resolve(result); // 返回数据
			},
			fail: (err) => {
				reject('获取简历模板使用次数失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}
//收藏简历模板
export const collectResumeTemplate = (resumeId) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://api.xydsh.cn/wechat/favorite/template/${resumeId}`,
			data: {
			},
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'POST',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '收藏简历模板成功');
				if(result.data.msg=="NOT_LOGIN"){
					console.log('登录过期，请重新登录');
					uni.setStorageSync("loginStatus", false);
					uni.showModal({
						title: '登录过期，请重新登录',
						content: '',
						showCancel: false,
						cancelText: '取消',
						cancelColor: '#000000',
						confirmText: '确定',
						confirmColor: '#4F78FF',
						success: (result) => {
							if (result.confirm) {
								uni.switchTab({
									url: "/pages/personage/personage",
								  });
							}
						},
						fail: () => {},
						complete: () => {}
					});
					  
				}
				resolve(result); // 返回数据
			},
			fail: (err) => {
				reject('收藏简历模板失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}
//取消收藏简历模板
export const offCollectResumeTemplate = (resumeId) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://api.xydsh.cn/wechat/favorite/template/${resumeId}`,
			data: {},
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'DELETE',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '取消收藏简历模板成功');
				resolve(result); // 返回数据
			},
			fail: (err) => {
				reject('取消收藏简历模板失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}
//获取用户简历信息
// export const getResumeInfo = async (resumeid) => {
// 	uni.request({
// 		url: `https://xydsh.cn/api/resume/${resumeid}`,
// 		data: {},
// 		header: {
// 			'content-type': 'application/json'
// 		},
// 		method: 'GET',
// 		dataType: 'json',
// 		responseType: 'text',
// 		success: (result) => {
// 			console.log(result, '获取用户简历信息');
// 		},
// 		fail: () => {},
// 		complete: () => {}
// 	});
// }

//获取用户简历信息
export const getUserResumeInfo = (userId) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://api.xydsh.cn/wechat/resume/info`,
			data: {},
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				//console.log(result, '获取用户简历信息');
				if(result.data.msg=="NOT_LOGIN"){
					console.log('登录过期，请重新登录');
					uni.setStorageSync("loginStatus", false);
					uni.showModal({
						title: '登录过期，请重新登录',
						content: '',
						showCancel: false,
						cancelText: '取消',
						cancelColor: '#000000',
						confirmText: '确定',
						confirmColor: '#4F78FF',
						success: (result) => {
							if (result.confirm) {
								uni.switchTab({
									url: "/pages/personage/personage",
								  });
							}
						},
						fail: () => {},
						complete: () => {}
					});
					  
				}
				resolve(result); // 返回数据
			},
			fail: (err) => {
				reject('获取用户简历信息失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}

//上传简历信息
export const uploadResumeInfo = (resumeData) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://api.xydsh.cn/wechat/resume/upload-info',
			data: resumeData,
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'POST',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				if(result.data.msg=="NOT_LOGIN"){
					console.log('登录过期，请重新登录');
					uni.setStorageSync("loginStatus", false);
					uni.showModal({
						title: '登录过期，请重新登录',
						content: '',
						showCancel: false,
						cancelText: '取消',
						cancelColor: '#000000',
						confirmText: '确定',
						confirmColor: '#4F78FF',
						success: (result) => {
							if (result.confirm) {
								uni.switchTab({
									url: "/pages/personage/personage",
								  });
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
				resolve(result); // 返回数据
			},
			fail: (err) => {
				reject('上传简历信息失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}

//上传简历附件
export const uploadResumeAttachment = (filePath) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: 'https://api.xydsh.cn/wechat/resume/upload-file',
			filePath: filePath,
			name: 'file',
			header: {
				'content-type': 'multipart/form-data',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			success: (result) => {
				if(result.data.msg=="NOT_LOGIN"){
					console.log('登录过期，请重新登录');
					uni.setStorageSync("loginStatus", false);
					uni.showModal({
						title: '登录过期，请重新登录',
						content: '',
						showCancel: false,
						cancelText: '取消',
						cancelColor: '#000000',
						confirmText: '确定',
						confirmColor: '#4F78FF',
						success: (result) => {
							if (result.confirm) {
								uni.switchTab({
									url: "/pages/personage/personage",
								  });
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
				resolve(result); // 返回数据
			},
			fail: (err) => {
				reject('上传简历附件失败', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}


//获取我的投递数据
export const getSubmitData = (e) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://api.xydsh.cn/wechat/mydelivers',
			data: e,
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'POST',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '获取我的投递数据成功');
				if(result.data.msg=="NOT_LOGIN"){
					console.log('登录过期，请重新登录');
					uni.setStorageSync("loginStatus", false);
					uni.showModal({
						title: '登录过期，请重新登录',
						content: '',
						showCancel: false,
						cancelText: '取消',
						cancelColor: '#000000',
						confirmText: '确定',
						confirmColor: '#4F78FF',
						success: (result) => {
							if (result.confirm) {
								uni.switchTab({
									url: "/pages/personage/personage",
								  });
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
				resolve(result.data.data.records); // 返回数据
			},
			fail: (err) => {
				reject(' ', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}

//获取省份
export const getProvinceData = (e) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://api.xydsh.cn/provinces/all',
			data: e,
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '获取省份数据成功');

				resolve(result.data.data); // 返回数据
			},
			fail: (err) => {
				reject(' ', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}

//获取城市
export const getCityData = (e) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://api.xydsh.cn/provinces/cities',
			data: {
				name: e
			},
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '获取城市数据成功');

				resolve(result.data.data); // 返回数据
			},
			fail: (err) => {
				reject(' ', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}

//获取年级
export const getGradeData = (e) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://api.xydsh.cn/grade',
			data: {
				name: e
			},
			header: {
				'content-type': 'application/json',
				Authorization: uni.getStorageSync('jwt') || ''
			},
			method: 'GET',
			dataType: 'json',
			responseType: 'text',
			success: (result) => {
				console.log(result, '获取年纪数据成功');

				resolve(result.data.data); // 返回数据
			},
			fail: (err) => {
				reject(' ', err); // 处理失败情况
			},
			complete: () => { }
		});
	});
}