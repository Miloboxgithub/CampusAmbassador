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
  __name: "collection",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    const pageInfo = store_index.pageStore();
    const activeindex = common_vendor.ref(false);
    const numbs = common_vendor.ref(0);
    common_vendor.ref(0);
    const quanxuan = common_vendor.ref(false);
    const st = common_vendor.ref("校园大使");
    const items = common_vendor.ref([
      // {
      //   id: 1,
      //   name: "振石控股集团有限公司",
      //   tags: ["民营", "2000人以上", "校园大使"],
      //   type: "汽车|机械|创造",
      //   status: "招募中",
      //   coicon: "https://picsum.photos/200",
      //   look: "5000",
      //   isdian: false,
      // }
    ]);
    common_vendor.onLoad(async () => {
      common_vendor.index.__f__("log", "at pkgA/collection/collection.vue:123", "页面加载");
      items.value = [];
      try {
        isLoading.value = true;
        const arr = await api_index.getUserCollects(pageInfo.collectCampusInfo);
        const res = await api_index.getTemplateCollects(pageInfo.collectCampusInfo);
        common_vendor.index.__f__("log", "at pkgA/collection/collection.vue:129", "获取用户收藏的校园大使职位数据:", arr);
        arr.forEach((e) => {
          items.value.push({
            id: e.id,
            name: e.name,
            tags: [e.type, e.scale, "校园大使"],
            type: e.industries,
            status: e.isRecruit ? "招募中" : "已结束",
            coicon: e.logo,
            look: e.pageView,
            isdian: false
          });
        });
        isLoading.value = false;
      } catch (error) {
        common_vendor.index.__f__("error", "at pkgA/collection/collection.vue:144", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
      }
    });
    common_vendor.onShow(async () => {
      common_vendor.index.__f__("log", "at pkgA/collection/collection.vue:155", "页面显示");
    });
    common_vendor.onReachBottom(async () => {
      pageInfo.getCollectCampusPage();
      try {
        isLoading.value = true;
        const arr = await api_index.getUserCollects(pageInfo.collectCampusInfo);
        common_vendor.index.__f__("log", "at pkgA/collection/collection.vue:163", "获取用户收藏的校园大使职位数据:", arr);
        if (arr.length === 0) {
          common_vendor.index.showToast({
            title: "没有更多数据了",
            icon: "none"
          });
          isLoading.value = false;
          pageInfo.lowCollectCampusPage();
          return;
        }
        arr.forEach((e) => {
          items.value.push({
            id: e.id,
            name: e.name,
            tags: [e.type, e.scale, "校园大使"],
            type: e.industries,
            status: e.isRecruit ? "招募中" : "已结束",
            coicon: e.logo,
            look: e.pageView,
            isdian: false
          });
        });
        isLoading.value = false;
      } catch (error) {
        common_vendor.index.__f__("error", "at pkgA/collection/collection.vue:187", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
      }
    });
    common_vendor.onPullDownRefresh(async () => {
      common_vendor.index.__f__("log", "at pkgA/collection/collection.vue:196", "下拉刷新了");
      pageInfo.initCollectCampusInfo();
      items.value = [];
      try {
        isLoading.value = true;
        const arr = await api_index.getUserCollects(pageInfo.collectCampusInfo);
        common_vendor.index.__f__("log", "at pkgA/collection/collection.vue:203", "获取用户收藏的校园大使职位数据:", arr);
        arr.forEach((e) => {
          items.value.push({
            id: e.id,
            name: e.name,
            tags: [e.type, e.scale, "校园大使"],
            type: e.industries,
            status: e.isRecruit ? "招募中" : "已结束",
            coicon: e.logo,
            look: e.pageView,
            isdian: false
          });
        });
        isLoading.value = false;
        common_vendor.index.stopPullDownRefresh();
      } catch (error) {
        common_vendor.index.__f__("error", "at pkgA/collection/collection.vue:219", "获取数据失败:", error);
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
        common_vendor.index.stopPullDownRefresh();
      }
    });
    const changeTab = async (flag) => {
      activeindex.value = flag;
      if (flag) {
        st.value = "简历模板";
        pageInfo.initCollectCampusInfo();
        items.value = [];
        try {
          isLoading.value = true;
          const arr = await api_index.getUserCollects(pageInfo.collectCampusInfo);
          common_vendor.index.__f__("log", "at pkgA/collection/collection.vue:238", "获取用户收藏的校园大使职位数据:", arr);
          arr.forEach((e) => {
            items.value.push({
              id: e.id,
              name: e.name,
              tags: [e.type, e.scale, "校园大使"],
              type: e.industries,
              status: e.isRecruit ? "招募中" : "已结束",
              coicon: e.logo,
              look: e.pageView,
              isdian: false
            });
          });
          isLoading.value = false;
        } catch (error) {
          common_vendor.index.__f__("error", "at pkgA/collection/collection.vue:253", "获取数据失败:", error);
          isLoading.value = false;
          common_vendor.index.showToast({
            title: "加载数据失败",
            icon: "error"
          });
        }
      } else {
        st.value = "校园大使";
        pageInfo.initCollectCampusInfo();
        items.value = [];
        try {
          isLoading.value = true;
          const arr = await api_index.getTemplateCollects(pageInfo.collectCampusInfo);
          common_vendor.index.__f__("log", "at pkgA/collection/collection.vue:268", "获取用户收藏的校园大使职位数据:", arr);
          arr.forEach((e) => {
            items.value.push({
              id: e.id,
              name: e.name,
              tags: [e.type, e.scale, "校园大使"],
              type: e.industries,
              status: e.isRecruit ? "招募中" : "已结束",
              coicon: e.logo,
              look: e.pageView,
              isdian: false
            });
          });
          isLoading.value = false;
        } catch (error) {
          common_vendor.index.__f__("error", "at pkgA/collection/collection.vue:283", "获取数据失败:", error);
          isLoading.value = false;
          common_vendor.index.showToast({
            title: "加载数据失败",
            icon: "error"
          });
        }
      }
      items.value.forEach((item) => {
        item.isdian = false;
      });
      mobans.value.forEach((item) => {
        item.isdian = false;
      });
      numbs.value = 0;
    };
    const navs3 = (id) => {
      common_vendor.index.navigateTo({
        url: `/pkgA/detail/detail?id=${id}`
      });
    };
    const dianji = (e) => {
      const index = parseInt(e.currentTarget.dataset.id, 10);
      if (items.value[index]) {
        items.value[index].isdian = !items.value[index].isdian;
        if (items.value[index].isdian) {
          numbs.value++;
        } else {
          numbs.value--;
        }
      } else {
        common_vendor.index.__f__("error", "at pkgA/collection/collection.vue:314", `Item at index ${index} is undefined`);
      }
      if (numbs.value == mobans.value.length) {
        quanxuan.value = true;
      } else {
        quanxuan.value = false;
      }
    };
    const dianji2 = (e) => {
      const index = parseInt(e.currentTarget.dataset.id, 10);
      if (mobans.value[index]) {
        mobans.value[index].isdian = !mobans.value[index].isdian;
        if (mobans.value[index].isdian) {
          numbs.value++;
        } else {
          numbs.value--;
        }
      } else {
        common_vendor.index.__f__("error", "at pkgA/collection/collection.vue:332", `Item at index ${index} is undefined`);
      }
      if (numbs.value == mobans.value.length) {
        quanxuan.value = true;
      } else {
        quanxuan.value = false;
      }
    };
    function quanxuans() {
      quanxuan.value = !quanxuan.value;
      if (quanxuan.value) {
        if (st.value == "校园大使") {
          items.value.forEach((item) => {
            item.isdian = true;
          });
        }
        if (st.value == "简历模板") {
          mobans.value.forEach((item) => {
            item.isdian = true;
          });
        }
        numbs.value = items.value.length;
      } else {
        items.value.forEach((item) => {
          item.isdian = false;
        });
        mobans.value.forEach((item) => {
          item.isdian = false;
        });
        numbs.value = 0;
      }
    }
    function deletes() {
      items.value.forEach((item) => {
        item.isdian = false;
      });
      mobans.value.forEach((item) => {
        item.isdian = false;
      });
      numbs.value = 0;
      common_vendor.index.showToast({
        title: "取消成功",
        icon: "success",
        image: "",
        duration: 1500,
        mask: false,
        success: (result) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    }
    const mobans = common_vendor.ref([
      {
        img: "../../static/模板1@2x.png",
        sum: 5e3,
        isdian: false
      },
      {
        img: "../../static/模板1@2x (1).png",
        sum: 5e3,
        isdian: false
      },
      {
        img: "../../static/模板1@2x (2).png",
        sum: 5e3,
        isdian: false
      },
      {
        img: "../../static/模板1@2x (3).png",
        sum: 5e3,
        isdian: false
      }
    ]);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          show: isLoading.value
        }),
        b: common_vendor.o(($event) => changeTab(false)),
        c: common_vendor.n(!activeindex.value ? "tabactive" : ""),
        d: common_vendor.o(($event) => changeTab(true)),
        e: common_vendor.n(activeindex.value ? "tabactive" : ""),
        f: common_vendor.n(activeindex.value ? "tabtrue" : ""),
        g: !activeindex.value
      }, !activeindex.value ? {
        h: common_vendor.f(items.value, (item, index, i0) => {
          return {
            a: item.isdian ? "" : "none",
            b: common_vendor.o(dianji, index),
            c: common_vendor.t(item.name),
            d: common_vendor.f(item.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag
              };
            }),
            e: common_vendor.t(item.type),
            f: common_vendor.t(item.status),
            g: item.status === "已结束" ? 1 : "",
            h: item.coicon,
            i: common_vendor.t(item.look),
            j: index,
            k: common_vendor.o(($event) => navs3(item.id), index)
          };
        }),
        i: common_assets._imports_8,
        j: common_assets._imports_9,
        k: common_assets._imports_2$1,
        l: common_assets._imports_3$1
      } : {}, {
        m: activeindex.value
      }, activeindex.value ? {
        n: common_vendor.f(mobans.value, (item, index, i0) => {
          return {
            a: item.img,
            b: item.isdian ? "" : "none",
            c: common_vendor.o(dianji2, index),
            d: common_vendor.t(item.sum),
            e: index
          };
        }),
        o: common_assets._imports_8,
        p: common_assets._imports_9,
        q: common_assets._imports_6,
        r: common_assets._imports_7$1
      } : {}, {
        s: numbs.value != 0
      }, numbs.value != 0 ? {
        t: common_vendor.t(numbs.value),
        v: common_vendor.t(st.value),
        w: common_assets._imports_8,
        x: quanxuan.value ? "" : "none",
        y: common_assets._imports_9,
        z: common_vendor.o(quanxuans),
        A: common_vendor.o(deletes)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-414d0f43"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/collection/collection.js.map
