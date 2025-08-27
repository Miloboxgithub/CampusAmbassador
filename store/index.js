// store/index.js
// Pinia 状态管理配置文件
import {
	defineStore
} from 'pinia';

/**
 * 页面信息状态管理
 * 用于管理不同页面的分页和筛选条件
 */
export const pageStore = defineStore('pageInfo', {
	state: () => ({
		// 首页信息状态
		indexInfo:{
            page: 1,                    // 当前页码
            pageSize: 20,               // 每页显示数量
            keyword:'',                 // 搜索关键词
            industry: '',               // 行业筛选条件
            scale:  '',                 // 公司规模筛选条件
            type: '',                   // 职位类型筛选条件
            educationalRequire:  '',    // 学历要求筛选条件
            majorRequire: '',           // 专业要求筛选条件
            gradeRequire: '',           // 年级要求筛选条件
            status: '',                 // 状态筛选条件
            isFilter: false,            // 是否有筛选条件
        },
        // 模板页面信息状态
        templateInfo:{
            page: 1,                    // 当前页码
            pageSize: 20,               // 每页显示数量
            type: "通用",               // 模板类型
        },
        // 收藏页面信息状态
        collectCampusInfo: {
            page: 1,                    // 当前页码
            pageSize: 20,               // 每页显示数量
        },
        // 我的提交页面信息状态
        mySubmitInfo:{
            page: 1,                    // 当前页码
            pageSize: 20,               // 每页显示数量
        }
	}),
	actions: {
		/**
		 * 首页页码增加
		 */
		getNewPage(){
            this.indexInfo.page ++;
        },
        
        /**
         * 首页页码减少
         */
        lowPage(){
            this.indexInfo.page --;
        },
        
        /**
         * 筛选首页数据
         * @param {Object} e - 筛选条件对象
         */
        filterIndexPage(e){
            this.indexInfo.page = 1;
            this.indexInfo.pageSize = 20;
            this.indexInfo.keyword = e.keyword || '';
            this.indexInfo.industry = e.industry || '';
            this.indexInfo.scale = e.scale || '';
            this.indexInfo.type = e.type || '';
            this.indexInfo.educationalRequire = e.educationalRequire || '';
            this.indexInfo.majorRequire = e.majorRequire || '';
            this.indexInfo.gradeRequire = e.gradeRequire || '';
            this.indexInfo.status = e.status || '';
            this.indexInfo.isFilter = true; // 设置筛选条件存在
        },
        
        /**
         * 初始化首页信息
         */
        initIndexInfo()
        {
            this.indexInfo = {
                page: 1,
                pageSize: 20,
                keyword:'',
                industry: '',
                scale:  '',
                type: '',
                educationalRequire:  '',
                majorRequire: '',
                gradeRequire: '',
                status: '',
            };
        },
        
        /**
         * 模板页面页码增加
         */
        getTemplatePage(){
            this.templateInfo.page ++;
        },
        
        /**
         * 模板页面页码减少
         */
        lowTemplatePage(){
            this.templateInfo.page --;
        },
        
        /**
         * 筛选模板页面数据
         * @param {Object} e - 筛选条件对象
         */
        filterTemplatePage(e){
            this.templateInfo.page = 1;
            this.templateInfo.pageSize = 20;
            this.templateInfo.type = e.type || "通用";
        },
        
        /**
         * 初始化模板页面信息
         */
        initTemplateInfo()
        {
            this.templateInfo = {
                page: 1,
                pageSize: 20,
            };
        },
        
        /**
         * 收藏页面页码增加
         */
        getCollectCampusPage(){
            this.collectCampusInfo.page ++;
        },
        
        /**
         * 收藏页面页码减少
         */
        lowCollectCampusPage(){
            this.collectCampusInfo.page --;
        },
        
        /**
         * 初始化收藏页面信息
         */
        initCollectCampusInfo()
        {
            this.collectCampusInfo = {
                page: 1,
                pageSize: 20,
            };
        },
        
        /**
         * 我的提交页面页码增加
         */
        getMySubmitPage(){
            this.mySubmitInfo.page ++;
        },
        
        /**
         * 我的提交页面页码减少
         */
        lowMySubmitPage(){
            this.mySubmitInfo.page --;
        },
        
        /**
         * 初始化我的提交页面信息
         */
        initMySubmitInfo()
        {
            this.mySubmitInfo = {
                page: 1,
                pageSize: 20,
            };
        },
	},
});
