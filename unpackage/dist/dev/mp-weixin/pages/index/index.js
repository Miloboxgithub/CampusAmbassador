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
    const items = common_vendor.ref([]);
    const isRolled = common_vendor.ref(false);
    common_vendor.onLoad(async () => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:92", "页面加载");
      items.value = [];
      try {
        isLoading.value = true;
        const arr = await api_index.getCampusByPage(pageInfo.indexInfo);
        common_vendor.index.__f__("log", "at pages/index/index.vue:98", "获取到的校园大使数据:", arr);
        arr.forEach((e) => {
          items.value.push({
            id: e.id,
            name: e.name,
            tags: [e.type, e.scale, "校园大使"],
            type: e.industries,
            status: e.isRecruit ? "招募中" : "已结束",
            coicon: "https://api.xydsh.cn/enterpriseLogo/" + e.logo,
            look: e.pageView
          });
        });
        isLoading.value = false;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:112", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
      }
    });
    common_vendor.onShow(async () => {
      if (pageInfo.indexInfo.isFilter) {
        items.value = [];
        try {
          isLoading.value = true;
          const arr = await api_index.getCampusByPage(pageInfo.indexInfo);
          common_vendor.index.__f__("log", "at pages/index/index.vue:129", "获取到的筛选校园大使数据:", arr);
          arr.forEach((e) => {
            items.value.push({
              id: e.id,
              name: e.name,
              tags: [e.type, e.scale, "校园大使"],
              type: e.industries,
              status: e.isRecruit ? "招募中" : "已结束",
              coicon: "https://api.xydsh.cn/enterpriseLogo/" + e.logo,
              look: e.pageView
            });
          });
          isLoading.value = false;
        } catch (error) {
          common_vendor.index.__f__("error", "at pages/index/index.vue:143", "获取数据失败:", error);
          isLoading.value = false;
          common_vendor.index.showToast({
            title: "加载数据失败",
            icon: "error"
          });
        }
        pageInfo.indexInfo.isFilter = false;
      } else {
        common_vendor.index.__f__("log", "at pages/index/index.vue:152", "没有筛选条件，保持当前数据");
      }
      common_vendor.index.__f__("log", "at pages/index/index.vue:156", "页面显示");
    });
    common_vendor.onReachBottom(async () => {
      pageInfo.getNewPage();
      common_vendor.index.__f__("log", "at pages/index/index.vue:161", "触底了", pageInfo.indexInfo);
      try {
        isLoading.value = true;
        const arr = await api_index.getCampusByPage(pageInfo.indexInfo);
        common_vendor.index.__f__("log", "at pages/index/index.vue:165", "获取到的校园大使数据:", arr);
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
            coicon: "https://api.xydsh.cn/enterpriseLogo/" + e.logo,
            look: e.pageView
          });
        });
        isLoading.value = false;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:188", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
      }
    });
    common_vendor.onPullDownRefresh(async () => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:197", "下拉刷新了");
      pageInfo.initIndexInfo();
      items.value = [];
      try {
        isLoading.value = true;
        common_vendor.index.__f__("log", "at pages/index/index.vue:202", pageInfo.indexInfo, "下拉刷新时的页码信息");
        const arr = await api_index.getCampusByPage(pageInfo.indexInfo);
        common_vendor.index.__f__("log", "at pages/index/index.vue:205", "获取到的校园大使数据:", arr);
        arr.forEach((e) => {
          items.value.push({
            id: e.id,
            name: e.name,
            tags: [e.type, e.scale, "校园大使"],
            type: e.industries,
            status: e.isRecruit ? "招募中" : "已结束",
            coicon: "https://api.xydsh.cn/enterpriseLogo/" + e.logo,
            look: e.pageView
          });
        });
        isLoading.value = false;
        common_vendor.index.stopPullDownRefresh();
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:220", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
        common_vendor.index.stopPullDownRefresh();
      }
    });
    common_vendor.onPageScroll((e) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:230", e.scrollTop);
      if (e.scrollTop > 300) {
        isRolled.value = true;
      } else {
        isRolled.value = false;
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
      return {
        title: "找校园大使，就上校园大使汇！",
        path: "/pages/index/index"
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          show: isLoading.value
        }),
        b: isRolled.value
      }, isRolled.value ? {
        c: common_assets._imports_0,
        d: common_vendor.o(navs1),
        e: common_assets._imports_1,
        f: common_vendor.o(navs2)
      } : {}, {
        g: common_assets._imports_0,
        h: common_vendor.o(navs1),
        i: common_assets._imports_2,
        j: common_assets._imports_3,
        k: common_assets._imports_4,
        l: common_assets._imports_1,
        m: common_vendor.o(navs2),
        n: common_vendor.f(items.value, (item, k0, i0) => {
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
        o: common_assets._imports_2$1,
        p: common_assets._imports_3$1
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
_sfc_main.__runtimeHooks = 3;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
