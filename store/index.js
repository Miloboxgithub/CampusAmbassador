// store/index.js
import {
	defineStore
} from 'pinia';

export const pageStore = defineStore('pageInfo', {
	state: () => ({
		indexInfo:{
            page: 1,
            pageSize: 20,
            keyword:'',
            industry: '',
            scale:  '',
            type: '',
            educationalRequire:  '',
            majorRequire: '',
            gradeRequire: '',
        },
        templateInfo:{
            page: 1,
            pageSize: 20,
            type: "通用",
        }
	}),
	actions: {
		getNewPage(){
            this.indexInfo.page ++;
        },
        lowPage(){
                this.indexInfo.page --;
        },
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
        },
        getTemplatePage(){
            this.templateInfo.page ++;
        },
        lowTemplatePage(){
            this.templateInfo.page --;
        },
        filterTemplatePage(e){
            this.templateInfo.page = 1;
            this.templateInfo.pageSize = 20;
            this.templateInfo.type = e.type || "通用";
        }
	},
});