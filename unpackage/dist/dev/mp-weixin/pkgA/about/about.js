"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "about",
  setup(__props) {
    function onLongPress(event) {
      const imageUrl = "/static/校园大使汇公众号二维码.png";
      common_vendor.index.previewImage({
        current: imageUrl,
        // 当前要显示的图片url
        urls: [imageUrl],
        // 需要预览的图片url列表数组
        success: function(res) {
          common_vendor.index.__f__("log", "at pkgA/about/about.vue:30", "图片预览成功", res);
        },
        fail: function(err) {
          common_vendor.index.__f__("error", "at pkgA/about/about.vue:33", "图片预览失败", err);
        }
      });
    }
    function copyText(event) {
      common_vendor.index.__f__("log", "at pkgA/about/about.vue:39", event);
      const textToCopy = event.currentTarget.dataset.text;
      common_vendor.wx$1.setClipboardData({
        data: textToCopy,
        // 要复制的内容
        success: function(res) {
          common_vendor.wx$1.showToast({
            title: "复制成功",
            icon: "success",
            duration: 2e3
          });
        },
        fail: function(err) {
          common_vendor.index.__f__("error", "at pkgA/about/about.vue:51", "复制失败", err);
          common_vendor.wx$1.showToast({
            title: "复制失败",
            icon: "none",
            duration: 2e3
          });
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(copyText),
        b: common_vendor.o(copyText),
        c: common_vendor.o(copyText),
        d: common_assets._imports_0$5,
        e: common_vendor.o(onLongPress)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-afb856a3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/about/about.js.map
