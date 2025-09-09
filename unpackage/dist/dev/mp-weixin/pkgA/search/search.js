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
  __name: "search",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    store_index.pageStore();
    const flag = common_vendor.ref(true);
    const isShou = common_vendor.ref(true);
    const contents = common_vendor.ref("请输入搜索内容");
    const items = common_vendor.ref([]);
    const coitems = common_vendor.ref([
      //   {
      //     id: 1,
      //     name: "振石控股集团有限公司",
      //     tags: ["民营", "2000人以上", "校园大使"],
      //     type: "汽车|机械|创造",
      //     status: "招募中",
      //     coicon: "https://picsum.photos/200",
      //     look: "5000",
      //   },
    ]);
    const msg = common_vendor.ref("");
    const winH = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      const sys = common_vendor.index.getSystemInfoSync();
      winH.value = sys.windowHeight;
    });
    const inputed = async (e) => {
      common_vendor.index.__f__("log", "at pkgA/search/search.vue:143", msg.value);
      if (msg.value === "") {
        common_vendor.index.showToast({
          title: "请输入搜索内容",
          icon: "error"
        });
        flag.value = true;
        isShou.value = true;
        coitems.value = [];
        return;
      }
      const idx = items.value.indexOf(msg.value);
      if (idx > -1)
        items.value.splice(idx, 1);
      items.value.push(msg.value);
      if (items.value.length > 20)
        items.value.shift();
      isLoading.value = true;
      const res = await api_index.getCampusByPage({
        page: 1,
        pageSize: 100,
        keyword: msg.value
      });
      if (res.length === 0) {
        coitems.value = [];
        flag.value = false;
        isLoading.value = false;
        return;
      }
      flag.value = true;
      isShou.value = false;
      coitems.value = [];
      res.forEach((e2) => {
        coitems.value.push({
          id: e2.id,
          name: e2.name,
          tags: [e2.type, e2.scale, "校园大使"],
          type: e2.industries,
          status: e2.isRecruit ? "招募中" : "已结束",
          coicon: "https://api.xydsh.cn/enterpriseLogo/" + e2.logo,
          look: e2.pageView
        });
      });
      isLoading.value = false;
    };
    const clear = () => {
      msg.value = "";
      flag.value = true;
      isShou.value = true;
      coitems.value = [];
    };
    const shang = (e) => {
      common_vendor.index.__f__("log", "at pkgA/search/search.vue:201", e.currentTarget.dataset.s.a);
      msg.value = e.currentTarget.dataset.s.a;
      inputed();
    };
    const shanchu = () => {
      common_vendor.index.showModal({
        content: "确定清除所有记录吗?",
        // 对话框内容
        showCancel: true,
        // 是否显示取消按钮
        success: (res) => {
          if (res.confirm) {
            items.value = [];
          } else if (res.cancel)
            ;
        }
      });
    };
    common_vendor.watch(
      items,
      (newVal) => {
        common_vendor.index.setStorageSync("myItems", JSON.stringify(newVal));
      },
      { deep: true }
      // 数组内部变化也触发
    );
    common_vendor.onShow(() => {
      const storedItems = common_vendor.index.getStorageSync("myItems");
      if (storedItems) {
        items.value = JSON.parse(storedItems);
      }
    });
    common_vendor.onPullDownRefresh(async () => {
      common_vendor.index.__f__("log", "at pkgA/search/search.vue:232", "下拉刷新了");
      flag.value = true;
      isShou.value = true;
      msg.value = "";
      common_vendor.index.stopPullDownRefresh();
    });
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
    const goToback = () => {
      common_vendor.index.switchTab({
        url: "/pages/index/index",
        success: (result) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          show: isLoading.value
        }),
        b: common_vendor.o(goToback),
        c: common_assets._imports_0$3,
        d: common_vendor.o(inputed),
        e: common_assets._imports_1$3,
        f: common_vendor.o(inputed),
        g: contents.value,
        h: msg.value,
        i: common_vendor.o(($event) => msg.value = $event.detail.value),
        j: common_assets._imports_2$5,
        k: common_vendor.o(clear),
        l: flag.value && isShou.value
      }, flag.value && isShou.value ? {
        m: common_vendor.o(shanchu),
        n: common_assets._imports_3$3
      } : {}, {
        o: flag.value && isShou.value
      }, flag.value && isShou.value ? {
        p: common_vendor.f(items.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(shang, index)
          };
        })
      } : {}, {
        q: isShou.value ? "220px" : "170px",
        r: isShou.value ? "" : "linear-gradient(to bottom, #dbe8ff, #f5f5f5 159%)",
        s: common_vendor.f(coitems.value, (item, k0, i0) => {
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
        t: common_assets._imports_2$1,
        v: common_assets._imports_3$1,
        w: !isShou.value,
        x: winH.value + "px",
        y: !flag.value
      }, !flag.value ? {
        z: common_assets._imports_6$2
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5fc04cd8"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/search/search.js.map
