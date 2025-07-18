"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_index = require("../../api/index.js");
require("../../store/index.js");
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    const id = common_vendor.ref(null);
    const TemplateImg = common_vendor.ref("../../static/template.png");
    const downloadNumber = common_vendor.ref(0);
    const isCollected = common_vendor.ref(false);
    const downloadUrl = common_vendor.ref("");
    const shareData = common_vendor.ref();
    common_vendor.onLoad(async (option) => {
      common_vendor.wx$1.showShareMenu({
        withShareTicket: true,
        //设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
        menus: ["shareAppMessage", "shareTimeline"]
      });
      isLoading.value = true;
      id.value = option.id;
      common_vendor.index.__f__("log", "at pkgA/preview/preview.vue:57", "接收到的 id:", id.value);
      const res = await api_index.getResumeTemplateDetail(id.value);
      common_vendor.index.__f__("log", "at pkgA/preview/preview.vue:59", "获取到的详情:", res);
      if (res.statusCode === 200 && res.data.code == 1) {
        isLoading.value = false;
        let info = res.data.data;
        TemplateImg.value = info.templateSampleGraph;
        downloadNumber.value = info.downloadNumber;
        isCollected.value = info.isFavorite;
        downloadUrl.value = info.path;
      } else {
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "获取详情失败",
          icon: "error"
        });
      }
      await api_index.addResumeViewCount(id.value);
      const countRes = await api_index.getResumeTemplateUseCount(id.value);
      const viewCountRes = await api_index.getResumeViewCount(id.value);
      common_vendor.index.__f__("log", "at pkgA/preview/preview.vue:81", "浏览次数:", viewCountRes, countRes);
      const ress = await api_index.getResumeTemplateLink(id.value);
      if (ress.statusCode !== 200 || ress.data.code !== 1) {
        common_vendor.index.showToast({
          title: "获取分享链接失败",
          icon: "error"
        });
        return;
      }
      ress.data.data.shareLink;
      shareData.value = ress.data.data.shareData;
    });
    const collectsClick = async () => {
      if (!isCollected.value) {
        const res = await api_index.collectResumeTemplate(id.value);
        if (res.statusCode == 200 || res.data.code == 1) {
          isCollected.value = !isCollected.value;
          common_vendor.index.showToast({
            title: "收藏成功",
            icon: "success"
          });
          return;
        }
      } else {
        const res = await api_index.offCollectResumeTemplate(id.value);
        if (res.statusCode == 200 || res.data.code == 1) {
          isCollected.value = !isCollected.value;
          common_vendor.index.showToast({
            title: "取消收藏成功",
            icon: "success"
          });
          return;
        }
      }
    };
    const downloadWord = () => {
      if (!downloadUrl.value) {
        common_vendor.index.showToast({
          title: "下载链接不存在",
          icon: "none"
        });
        return;
      }
      common_vendor.index.setClipboardData({
        data: downloadUrl.value,
        success: () => {
          common_vendor.index.showToast({
            title: "下载链接已复制成功，请在外部浏览器中粘贴链接下载",
            icon: "none"
          });
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "复制链接失败，请手动复制",
            icon: "none"
          });
        }
      });
    };
    common_vendor.onShareAppMessage(async () => {
      return {
        title: shareData.value.title,
        // 分享标题
        path: `/pkgA/preview/preview?id=${id.value}`,
        // 分享路径
        imageUrl: shareData.value.imageUrl
        // 分享图片
      };
    });
    return (_ctx, _cache) => {
      return {
        a: TemplateImg.value,
        b: common_vendor.t(downloadNumber.value),
        c: common_assets._imports_1$3,
        d: isCollected.value ? "../../static/collected.png" : "../../static/collect.png",
        e: common_vendor.o((...args) => collectsClick && collectsClick(...args)),
        f: common_vendor.o(downloadWord)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fc71e716"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/preview/preview.js.map
