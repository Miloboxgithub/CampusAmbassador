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
  __name: "index",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    const pageInfo = store_index.pageStore();
    const items = common_vendor.ref([{
      id: 1,
      name: "振石控股集团有限公司",
      tags: ["民营", "2000人以上", "校园大使"],
      type: "汽车|机械|创造",
      status: "招募中",
      coicon: "https://picsum.photos/200",
      look: "5000"
    }]);
    common_vendor.onLoad(async () => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:86", "页面加载");
      items.value = [];
      try {
        isLoading.value = true;
        const arr = await api_index.getCampusByPage(pageInfo.indexInfo);
        common_vendor.index.__f__("log", "at pages/index/index.vue:92", "获取到的校园大使数据:", arr);
        arr.forEach((e) => {
          items.value.push({
            id: e.id,
            name: e.name,
            tags: [e.type, e.scale, "校园大使"],
            type: e.industries,
            status: e.isRecruit ? "招募中" : "已结束",
            coicon: "https://picsum.photos/200",
            look: e.pageView
          });
        });
        isLoading.value = false;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:106", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
      }
    });
    common_vendor.onShow(async () => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:126", "页面显示");
    });
    common_vendor.onReachBottom(async () => {
      pageInfo.getNewPage();
      common_vendor.index.__f__("log", "at pages/index/index.vue:131", "触底了", pageInfo.indexInfo);
      try {
        isLoading.value = true;
        const arr = await api_index.getCampusByPage(pageInfo.indexInfo);
        common_vendor.index.__f__("log", "at pages/index/index.vue:135", "获取到的校园大使数据:", arr);
        if (arr.length === 0) {
          common_vendor.index.showToast({
            title: "没有更多数据了",
            icon: "none"
          });
          isLoading.value = false;
          pageInfo.lowPage();
          return;
        }
        arr.forEach((e) => {
          items.value.push({
            id: e.id,
            name: e.name,
            tags: [e.type, e.scale, "校园大使"],
            type: e.industries,
            status: e.isRecruit ? "招募中" : "已结束",
            coicon: "https://picsum.photos/200",
            look: e.pageView
          });
        });
        isLoading.value = false;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:158", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
      }
    });
    common_vendor.onPullDownRefresh(async () => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:167", "下拉刷新了");
      pageInfo.initIndexInfo();
      items.value = [];
      try {
        isLoading.value = true;
        const arr = await api_index.getCampusByPage(pageInfo.indexInfo);
        common_vendor.index.__f__("log", "at pages/index/index.vue:174", "获取到的校园大使数据:", arr);
        arr.forEach((e) => {
          items.value.push({
            id: e.id,
            name: e.name,
            tags: [e.type, e.scale, "校园大使"],
            type: e.industries,
            status: e.isRecruit ? "招募中" : "已结束",
            coicon: "https://picsum.photos/200",
            look: e.pageView
          });
        });
        isLoading.value = false;
        common_vendor.index.stopPullDownRefresh();
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:189", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
        common_vendor.index.stopPullDownRefresh();
      }
    });
    const navs1 = () => {
      common_vendor.index.navigateTo({
        url: "/pkgA/search/search"
      });
    };
    const navs2 = () => {
      common_vendor.index.navigateTo({
        url: "/pkgA/screen/screen"
      });
    };
    const navs3 = (id) => {
      common_vendor.index.navigateTo({
        url: `/pkgA/detail/detail?id=${id}`
      });
    };
    common_vendor.onShareAppMessage(() => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:215", "分享按钮被点击");
      return {
        title: "这是分享标题",
        path: "/pages/index/index"
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          show: isLoading.value
        }),
        b: common_assets._imports_0,
        c: common_vendor.o(navs1),
        d: common_assets._imports_1,
        e: common_assets._imports_2,
        f: common_assets._imports_3,
        g: common_assets._imports_4,
        h: common_vendor.o(navs2),
        i: common_vendor.f(items.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.f(item.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag
              };
            }),
            c: common_vendor.t(item.type),
            d: common_vendor.t(item.status),
            e: item.status === "已结束" ? 1 : "",
            f: item.coicon,
            g: common_vendor.t(item.look),
            h: item.id,
            i: common_vendor.o(($event) => navs3(item.id), item.id)
          };
        }),
        j: common_assets._imports_2$1,
        k: common_assets._imports_3$1
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
