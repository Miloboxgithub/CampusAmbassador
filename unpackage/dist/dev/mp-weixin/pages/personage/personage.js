"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "personage",
  setup(__props) {
    function navigate(e) {
      common_vendor.index.__f__("log", "at pages/personage/personage.vue:71", e.currentTarget.dataset);
      common_vendor.index.navigateTo({
        url: e.currentTarget.dataset.url
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_vendor.t(_ctx.username),
        c: common_assets._imports_1$2,
        d: common_vendor.o(navigate),
        e: common_assets._imports_2$3,
        f: common_vendor.o(navigate),
        g: common_assets._imports_3$2,
        h: common_vendor.o(navigate),
        i: common_assets._imports_4$1,
        j: common_vendor.o(navigate),
        k: common_assets._imports_5,
        l: common_vendor.o(navigate),
        m: common_assets._imports_6$1,
        n: common_vendor.o(navigate),
        o: common_assets._imports_7,
        p: common_vendor.o(navigate)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d78f6be3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/personage/personage.js.map
