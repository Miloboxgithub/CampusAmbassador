"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
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
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
    const fs = common_vendor.wx$1.getFileSystemManager();
    fs.access({
      path: "wxfile://usr/miniprogramLog/log2",
      success: function(res) {
        common_vendor.index.__f__("log", "at App.vue:9", "文件存在");
      },
      fail: function(err) {
        common_vendor.index.__f__("error", "at App.vue:12", "文件不存在", err);
      }
    });
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:17", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:20", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
