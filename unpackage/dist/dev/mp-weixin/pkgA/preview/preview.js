"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    common_vendor.onLoad(() => {
      common_vendor.wx$1.showShareMenu({
        withShareTicket: true,
        //设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
        menus: ["shareAppMessage", "shareTimeline"]
      });
    });
    const isCollected = common_vendor.ref(false);
    const collectsClick = () => {
      isCollected.value = !isCollected.value;
      if (isCollected.value)
        common_vendor.index.showToast({
          title: "收藏成功",
          icon: "success"
        });
    };
    const downloadWord = () => {
      common_vendor.index.showToast({
        title: "下载链接已复制成功请在外部浏览器中粘贴链接下载",
        icon: "none"
      });
    };
    common_vendor.onShareAppMessage(() => {
      return {
        title: "这是分享标题",
        // 分享标题
        path: "/pkgA/preview/preview"
        // 分享路径
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$3,
        b: common_assets._imports_1$3,
        c: isCollected.value ? "../../static/collected.png" : "../../static/collect.png",
        d: common_vendor.o((...args) => collectsClick && collectsClick(...args)),
        e: common_vendor.o(downloadWord)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fc71e716"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/preview/preview.js.map
