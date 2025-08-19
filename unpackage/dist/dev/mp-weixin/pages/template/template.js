"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_index = require("../../api/index.js");
const store_index = require("../../store/index.js");
if (!Math) {
  Loading();
}
const Loading = () => "../../components/Loading.js";
const _sfc_main = {
  __name: "template",
  setup(__props) {
    const isLoading = common_vendor.ref(true);
    const pageInfo = store_index.pageStore();
    const types = common_vendor.ref([
      {
        name: "通用",
        flag: true
      },
      {
        name: "简约",
        flag: false
      },
      {
        name: "现代",
        flag: false
      },
      {
        name: "经典",
        flag: false
      },
      {
        name: "创意",
        flag: false
      },
      {
        name: "专业",
        flag: false
      },
      {
        name: "英文",
        flag: false
      }
    ]);
    const mobans = common_vendor.ref([
      // {
      //   img: "../../static/模板1@2x.png",
      //   sum: 5000,
      //   isCollected: false,
      // },
    ]);
    common_vendor.onLoad(async () => {
      common_vendor.index.__f__("log", "at pages/template/template.vue:90", "页面加载");
      mobans.value = [];
      try {
        isLoading.value = true;
        const arr = await api_index.getResumeTemplate(pageInfo.templateInfo);
        common_vendor.index.__f__("log", "at pages/template/template.vue:96", "获取到的简历模板数据:", arr);
        arr.forEach((e) => {
          mobans.value.push({
            id: e.id,
            img: e.templateSampleGraph,
            sum: e.downloadNumber,
            isCollected: e.isFavorite
            // 添加收藏状态
          });
        });
        isLoading.value = false;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/template/template.vue:107", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
      }
    });
    common_vendor.onShow(() => {
      common_vendor.index.__f__("log", "at pages/template/template.vue:117", "页面显示");
    });
    common_vendor.onReachBottom(async () => {
      pageInfo.getTemplatePage();
      common_vendor.index.__f__("log", "at pages/template/template.vue:122", "触底了", pageInfo.templateInfo);
      try {
        isLoading.value = true;
        const arr = await api_index.getResumeTemplate(pageInfo.templateInfo);
        common_vendor.index.__f__("log", "at pages/template/template.vue:126", "获取到的更多简历模板数据:", arr);
        if (arr.length === 0) {
          common_vendor.index.showToast({
            title: "没有更多数据了",
            icon: "none"
          });
          isLoading.value = false;
          pageInfo.lowTemplatePage();
          return;
        }
        arr.forEach((e) => {
          mobans.value.push({
            id: e.id,
            img: e.templateSampleGraph || "https://picsum.photos/400",
            // 如果没有图片则使用默认图片
            sum: e.downloadNumber,
            isCollected: e.isFavorite
            // 添加收藏状态
          });
        });
        isLoading.value = false;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/template/template.vue:146", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
      }
    });
    common_vendor.onPullDownRefresh(async () => {
      common_vendor.index.__f__("log", "at pages/template/template.vue:156", "下拉刷新了");
      pageInfo.initTemplateInfo();
      mobans.value = [];
      try {
        isLoading.value = true;
        const arr = await api_index.getResumeTemplate(pageInfo.templateInfo);
        common_vendor.index.__f__("log", "at pages/template/template.vue:163", "获取到的简历模板数据:", arr);
        arr.forEach((e) => {
          mobans.value.push({
            id: e.id,
            img: e.templateSampleGraph || "https://picsum.photos/400",
            sum: e.downloadNumber,
            isCollected: e.isFavorite
            // 添加收藏状态
          });
        });
        isLoading.value = false;
        common_vendor.index.stopPullDownRefresh();
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/template/template.vue:175", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
        common_vendor.index.stopPullDownRefresh();
      }
    });
    const changeType = async (i) => {
      types.value.forEach((item) => {
        item.flag = false;
      });
      i.flag = true;
      pageInfo.filterTemplatePage({
        type: i.name
      });
      mobans.value = [];
      try {
        isLoading.value = true;
        const arr = await api_index.getResumeTemplate(pageInfo.templateInfo);
        common_vendor.index.__f__("log", "at pages/template/template.vue:197", "获取到的新简历模板数据:", arr);
        arr.forEach((e) => {
          mobans.value.push({
            id: e.id,
            img: e.templateSampleGraph || "https://picsum.photos/400",
            sum: e.downloadNumber,
            isCollected: e.isFavorite
            // 添加收藏状态
          });
        });
        isLoading.value = false;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/template/template.vue:208", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
      }
    };
    const navs = (id) => {
      common_vendor.index.navigateTo({
        url: `/pkgA/preview/preview?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          show: isLoading.value
        }),
        b: common_assets._imports_0$1,
        c: common_assets._imports_1$1,
        d: common_assets._imports_2$2,
        e: common_vendor.f(types.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.flag ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => changeType(item), index)
          };
        }),
        f: common_vendor.f(mobans.value, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.sum),
            c: item.isCollected ? "../../static/collected.png" : "../../static/collect.png",
            d: index,
            e: common_vendor.o(($event) => navs(item.id), index)
          };
        }),
        g: common_assets._imports_6
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-754db3c2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/template/template.js.map
