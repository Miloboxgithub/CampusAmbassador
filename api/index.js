export const  fetchData = ()=> {
    uni.request({
      url: `https://shixi.xydsh.cn/internship/selectByContent`, // 拼接完整的 URL
      method: 'POST',
      data: {
        "page": 1,
        "pageSize": 20
      },
      header: {
        'content-type': 'application/json',
        //'token': uni.getStorageSync('v_token') // 传递 token
      },
      success: (res) => {
        if (res.statusCode === 200) {
          console.log(res)


          //console.log(this.data.coitem)
        } else {
          console.error('请求失败:', res);
        }
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
      complete: () => {
        //console.log('请求完成');
      }
    });
  }

//校园招聘岗位分页查询
export const getCampusByPage = (e) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: 'https://xydsh.cn/api/campus/page',
        data: {
          page: e.page,
          pageSize: e.pageSize,
          keyword: e.keyword || '',
          industry: e.industry || '',
          scale: e.scale || '',
          type: e.type || '',
          educationalRequire: e.educationalRequire || '',
          majorRequire: e.majorRequire || '',
          gradeRequire: e.gradeRequire || '',
        },
        header: { 'content-type': 'application/json' },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
          //console.log(result.data.data.records, 'hhhh');
          resolve(result.data.data.records); // 返回数据
        },
        fail: (error) => {
          reject(error); // 处理失败情况
        },
        complete: () => { }
      });
    });
  };
//获取校园招聘岗位详情
export const getCampusDetail = async (id) => {
    uni.request({
        url: `https://xydsh.cn/api/campus/${id}`,
        data: {
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
            console.log(result, 'ssss');
        },
        fail: () => { },
        complete: () => { }
    });

}

//投递校园招聘岗位
export const postCampusApply = async (e) => {
    uni.request({
        url: 'https://xydsh.cn/api/campus/deliver',
        data: {
            campusId: e.campusId,
            resumeId: e.resumeId,
        },
        header: { 'content-type': 'application/json' },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
            console.log(result, '投递成功');
        },
        fail: () => { },
        complete: () => { }
    });

}

//获取简历模板列表
export const getResumeTemplate = async (e) => {
    uni.request({
        url: 'https://xydsh.cn/api/templates/page',
        data: {
            page: e.page || 1,
            pageSize: e.pageSize || 10,
            type: e.type || ''
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
            console.log(result, '获取简历模板列表');
        },
        fail: () => { },
        complete: () => { }
    });
}

//获取用户简历信息
export const getResumeInfo = async (resumeid) => {
    uni.request({
        url: `https://xydsh.cn/api/resume/${resumeid}`,
        data: {
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
            console.log(result, '获取用户简历信息');
        },
        fail: () => { },
        complete: () => { }
    });
}