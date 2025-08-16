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
  __name: "mysubmit",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    common_vendor.onLoad(async () => {
      try {
        isLoading.value = true;
        const response = await api_index.getSubmitData({
          page: 1,
          pageSize: 20,
          status: "all"
        });
        let arr = response.data.data.records;
        isLoading.value = false;
      } catch (error) {
        common_vendor.index.__f__("error", "at pkgA/mysubmit/mysubmit.vue:52", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
      }
    });
    common_vendor.onReachBottom(async () => {
      pageInfo.getNewPage();
      common_vendor.index.__f__("log", "at pkgA/mysubmit/mysubmit.vue:63", "触底了", pageInfo.indexInfo);
      try {
        isLoading.value = true;
        const arr = await getCampusByPage(pageInfo.indexInfo);
        common_vendor.index.__f__("log", "at pkgA/mysubmit/mysubmit.vue:67", "获取到的校园大使数据:", arr);
        if (arr.length === 0) {
          common_vendor.index.showToast({
            title: "没有更多数据了",
            icon: "none"
          });
          isLoading.value = false;
          pageInfo.lowPage();
          return;
        }
        isLoading.value = false;
      } catch (error) {
        common_vendor.index.__f__("error", "at pkgA/mysubmit/mysubmit.vue:80", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
      }
    });
    common_vendor.onPullDownRefresh(async () => {
      common_vendor.index.__f__("log", "at pkgA/mysubmit/mysubmit.vue:89", "下拉刷新了");
      pageInfo.initIndexInfo();
      items.value = [];
      try {
        isLoading.value = true;
        common_vendor.index.__f__("log", "at pkgA/mysubmit/mysubmit.vue:94", pageInfo.indexInfo, "下拉刷新时的页码信息");
        const arr = await getCampusByPage(pageInfo.indexInfo);
        common_vendor.index.__f__("log", "at pkgA/mysubmit/mysubmit.vue:97", "获取到的校园大使数据:", arr);
        arr.forEach((e) => {
          items.value.push({
            id: e.id,
            name: e.name,
            tags: [e.type, e.scale, "校园大使"],
            type: e.industries,
            status: e.isRecruit ? "招募中" : "已结束",
            coicon: e.logo,
            look: e.pageView
          });
        });
        isLoading.value = false;
        common_vendor.index.stopPullDownRefresh();
      } catch (error) {
        common_vendor.index.__f__("error", "at pkgA/mysubmit/mysubmit.vue:112", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
        common_vendor.index.stopPullDownRefresh();
      }
    });
    common_vendor.onShow(() => {
    });
    const pageInfo = store_index.pageStore();
    const items = common_vendor.ref([
      {
        id: 1,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "招募中",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 2,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "已结束",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 3,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "招募中",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 4,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "已结束",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 5,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "招募中",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 6,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "已结束",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 6,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "已结束",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 6,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "已结束",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 6,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "已结束",
        coicon: "https://picsum.photos/200",
        look: "5000"
      }
    ]);
    const navs3 = () => {
      common_vendor.index.navigateTo({
        url: "/pkgA/detail/detail"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          show: isLoading.value
        }),
        b: common_vendor.f(items.value, (item, k0, i0) => {
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
            i: common_vendor.o(navs3, item.id)
          };
        }),
        c: common_assets._imports_2$1,
        d: common_assets._imports_3$1
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f33b20de"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/mysubmit/mysubmit.js.map
