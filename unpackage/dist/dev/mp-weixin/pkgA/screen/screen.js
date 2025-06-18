"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "screen",
  setup(__props) {
    const std = common_vendor.ref(true);
    const items = common_vendor.ref([]);
    const edu = common_vendor.ref("");
    const major = common_vendor.ref("");
    const grade = common_vendor.ref("");
    const ind = common_vendor.ref("");
    const company = common_vendor.ref("");
    const guimo = common_vendor.ref("");
    const xueli = common_vendor.ref([{
      n: "学历不限",
      f: false
    }, {
      n: "专科",
      f: false
    }, {
      n: "本科",
      f: false
    }, {
      n: "硕士",
      f: false
    }, {
      n: "博士",
      f: false
    }]);
    const popups = common_vendor.ref();
    const theme = common_vendor.ref("");
    const openPopup = (e) => {
      theme.value = e;
      if (e == "学历要求") {
        items.value = xueli.value;
      }
      if (popups.value) {
        popups.value.open();
      }
    };
    const closePopup = () => {
      if (popups.value) {
        popups.value.close();
      }
    };
    const change = () => {
      common_vendor.index.__f__("log", "at pkgA/screen/screen.vue:126", "Popup state changed");
    };
    const select = (e) => {
      items.value.forEach((i) => {
        i.f = false;
      });
      items.value[e].f = true;
    };
    const queren = () => {
      if (theme.value == "学历要求") {
        items.value.forEach((i) => {
          if (i.f) {
            edu.value = i.n;
          }
        });
      }
      closePopup();
    };
    const switchs = (e) => {
      std.value = e;
    };
    return (_ctx, _cache) => {
      return {
        a: std.value ? 1 : "",
        b: !std.value ? 1 : "",
        c: common_vendor.o(($event) => switchs(true)),
        d: std.value ? 1 : "",
        e: !std.value ? 1 : "",
        f: common_vendor.o(($event) => switchs(false)),
        g: common_vendor.t(edu.value),
        h: common_assets._imports_0$4,
        i: common_vendor.o(($event) => openPopup("学历要求")),
        j: common_vendor.t(major.value),
        k: common_assets._imports_0$4,
        l: common_vendor.o(($event) => openPopup("专业要求")),
        m: common_vendor.t(grade.value),
        n: common_assets._imports_0$4,
        o: common_vendor.o(($event) => openPopup("年级要求")),
        p: common_vendor.t(ind.value),
        q: common_assets._imports_0$4,
        r: common_vendor.o(($event) => openPopup("行业要求")),
        s: common_vendor.t(company.value),
        t: common_assets._imports_0$4,
        v: common_vendor.o(($event) => openPopup("企业要求")),
        w: common_vendor.t(guimo.value),
        x: common_assets._imports_0$4,
        y: common_vendor.o(($event) => openPopup("公司规模")),
        z: common_assets._imports_1$5,
        A: common_vendor.o(closePopup),
        B: common_vendor.o(queren),
        C: common_vendor.t(theme.value),
        D: common_vendor.f(items.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.n),
            b: item.f == true ? 1 : "",
            c: common_vendor.o(($event) => select(index)),
            d: index != items.value.length - 1
          }, index != items.value.length - 1 ? {} : {});
        }),
        E: common_vendor.sr(popups, "b817f397-0", {
          "k": "popups"
        }),
        F: common_vendor.o(change),
        G: common_vendor.p({
          type: "bottom",
          mask: "true"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b817f397"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/screen/screen.js.map
