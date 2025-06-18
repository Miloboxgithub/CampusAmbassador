"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const flag = common_vendor.ref(true);
    const contents = common_vendor.ref("请输入搜索内容");
    const items = common_vendor.ref([
      "小红书",
      "什么什么有限公司"
    ]);
    const msg = common_vendor.ref("");
    const inputed = (e) => {
      let msg2 = e.detail.value;
      common_vendor.index.__f__("log", "at pkgA/search/search.vue:46", msg2);
      items.value.push(msg2);
    };
    const clear = () => {
      msg.value = "";
    };
    const shang = (e) => {
      common_vendor.index.__f__("log", "at pkgA/search/search.vue:53", e.currentTarget.dataset.s.a);
      msg.value = e.currentTarget.dataset.s.a;
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.o(inputed),
        c: contents.value,
        d: msg.value,
        e: common_vendor.o(($event) => msg.value = $event.detail.value),
        f: common_assets._imports_1$4,
        g: common_vendor.o(clear),
        h: flag.value
      }, flag.value ? {
        i: common_vendor.o(shanchu),
        j: common_assets._imports_2$4
      } : {}, {
        k: flag.value
      }, flag.value ? {
        l: common_vendor.f(items.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(shang, index)
          };
        })
      } : {}, {
        m: !flag.value
      }, !flag.value ? {
        n: common_assets._imports_3$3
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5fc04cd8"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/search/search.js.map
