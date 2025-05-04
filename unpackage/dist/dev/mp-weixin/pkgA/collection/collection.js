"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "collection",
  setup(__props) {
    const activeindex = common_vendor.ref(false);
    const numbs = common_vendor.ref(0);
    common_vendor.ref(0);
    const quanxuan = common_vendor.ref(false);
    const st = common_vendor.ref("校园大使");
    const items = common_vendor.ref([
      {
        id: 1,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "招募中",
        coicon: "https://picsum.photos/200",
        look: "5000",
        isdian: false
      },
      {
        id: 2,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "已结束",
        coicon: "https://picsum.photos/200",
        look: "5000",
        isdian: false
      },
      {
        id: 3,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "招募中",
        coicon: "https://picsum.photos/200",
        look: "5000",
        isdian: false
      },
      {
        id: 4,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "已结束",
        coicon: "https://picsum.photos/200",
        look: "5000",
        isdian: false
      }
    ]);
    const changeTab = (flag) => {
      activeindex.value = flag;
      if (flag) {
        st.value = "简历模板";
      } else {
        st.value = "校园大使";
      }
      items.value.forEach((item) => {
        item.isdian = false;
      });
      mobans.value.forEach((item) => {
        item.isdian = false;
      });
      numbs.value = 0;
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
        common_vendor.index.__f__("error", "at pkgA/collection/collection.vue:168", `Item at index ${index} is undefined`);
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
        common_vendor.index.__f__("error", "at pkgA/collection/collection.vue:186", `Item at index ${index} is undefined`);
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
        a: common_vendor.o(($event) => changeTab(false)),
        b: common_vendor.n(!activeindex.value ? "tabactive" : ""),
        c: common_vendor.o(($event) => changeTab(true)),
        d: common_vendor.n(activeindex.value ? "tabactive" : ""),
        e: common_vendor.n(activeindex.value ? "tabtrue" : ""),
        f: !activeindex.value
      }, !activeindex.value ? {
        g: common_vendor.f(items.value, (item, index, i0) => {
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
            j: index
          };
        }),
        h: common_assets._imports_8,
        i: common_assets._imports_9,
        j: common_assets._imports_2$1,
        k: common_assets._imports_3$1
      } : {}, {
        l: activeindex.value
      }, activeindex.value ? {
        m: common_vendor.f(mobans.value, (item, index, i0) => {
          return {
            a: item.img,
            b: item.isdian ? "" : "none",
            c: common_vendor.o(dianji2, index),
            d: common_vendor.t(item.sum),
            e: index
          };
        }),
        n: common_assets._imports_8,
        o: common_assets._imports_9,
        p: common_assets._imports_6,
        q: common_assets._imports_7$1
      } : {}, {
        r: numbs.value != 0
      }, numbs.value != 0 ? {
        s: common_vendor.t(numbs.value),
        t: common_vendor.t(st.value),
        v: common_assets._imports_8,
        w: quanxuan.value ? "" : "none",
        x: common_assets._imports_9,
        y: common_vendor.o(quanxuans),
        z: common_vendor.o(deletes)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-414d0f43"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/collection/collection.js.map
