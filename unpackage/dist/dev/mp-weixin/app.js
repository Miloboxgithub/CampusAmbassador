"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const plugins_index = require("./plugins/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/template/template.js";
  "./pages/personage/personage.js";
  "./pkgA/preview/preview.js";
  "./pkgA/search/search.js";
  "./pkgA/screen/screen.js";
  "./pkgA/detail/detail.js";
  "./pkgA/about/about.js";
  "./pkgA/privacy/privacy.js";
  "./pkgA/service/service.js";
  "./pkgA/law/law.js";
  "./pkgA/mysubmit/mysubmit.js";
  "./pkgA/collection/collection.js";
  "./pkgA/resume/resume.js";
  "./pkgA/msg/msg.js";
  "./pkgA/contact/contact.js";
}
const _sfc_main = {
  /**
   * 应用启动时触发
   */
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Launch - 应用启动");
  },
  /**
   * 应用显示时触发（从后台进入前台）
   */
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:25", "App Show - 应用显示");
  },
  /**
   * 应用隐藏时触发（从前台进入后台）
   */
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:32", "App Hide - 应用隐藏");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  const pinia = common_vendor.createPinia();
  app.mixin(plugins_index.sharePlugin);
  app.use(pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
