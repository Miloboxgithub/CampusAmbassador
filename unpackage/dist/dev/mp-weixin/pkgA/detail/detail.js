"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_index = require("../../api/index.js");
const store_index = require("../../store/index.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (Loading + resumeModal + Login + _easycom_uni_popup)();
}
const Loading = () => "../../components/Loading.js";
const Login = () => "../../components/Login.js";
const resumeModal = () => "../../components/resumeModal.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    const isModal = common_vendor.ref(false);
    const id = common_vendor.ref(null);
    const hasResume = common_vendor.ref(false);
    const pageState = store_index.pageStore();
    common_vendor.onLoad(async (option) => {
      isLoading.value = true;
      id.value = option.id;
      common_vendor.index.__f__("log", "at pkgA/detail/detail.vue:124", "接收到的 id:", id.value);
      const res = await api_index.getCampusDetail(id.value);
      common_vendor.index.__f__("log", "at pkgA/detail/detail.vue:126", "获取到的详情:", res);
      if (res.statusCode === 200) {
        let deta = res.data.data;
        tags.value = [deta.type, deta.scale, "校园大使"];
        type.value = deta.industries || "未知类型";
        status.value = deta.isRecruit ? "招募中" : "已结束";
        coicon.value = "https://api.xydsh.cn/enterpriseLogo/" + deta.logo || "https://picsum.photos/200";
        name.value = deta.name || "未知名称";
        task.value = deta.task || "暂无任务信息";
        harvest.value = deta.harvest || "暂无收获信息";
        expect.value = deta.expected || "暂无期望信息";
        target.value = deta.targetCollege || "暂无目标院校信息";
        introduce.value = deta.description || "暂无公司介绍";
        isLoading.value = false;
        isCollected.value = deta.isFavorite || false;
        submited.value = deta.isDelivered || false;
        hasResume.value = deta.hasResume || false;
        if (pageState.isNavResume)
          pageState.changeNavResume(false);
      } else {
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "获取详情失败",
          icon: "error"
        });
      }
    });
    common_vendor.onShow(async () => {
      if (!pageState.isNavResume)
        return;
      pageState.changeNavResume(false);
      isLoading.value = true;
      common_vendor.index.__f__("log", "at pkgA/detail/detail.vue:158", "现有的 id:", id.value);
      const res = await api_index.getCampusDetail(id.value);
      common_vendor.index.__f__("log", "at pkgA/detail/detail.vue:160", "获取到的详情:", res);
      if (res.statusCode === 200) {
        let deta = res.data.data;
        tags.value = [deta.type, deta.scale, "校园大使"];
        type.value = deta.industries || "未知类型";
        status.value = deta.isRecruit ? "招募中" : "已结束";
        coicon.value = "https://api.xydsh.cn/enterpriseLogo/" + deta.logo || "https://picsum.photos/200";
        name.value = deta.name || "未知名称";
        task.value = deta.task || "暂无任务信息";
        harvest.value = deta.harvest || "暂无收获信息";
        expect.value = deta.expected || "暂无期望信息";
        target.value = deta.targetCollege || "暂无目标院校信息";
        introduce.value = deta.description || "暂无公司介绍";
        isLoading.value = false;
        isCollected.value = deta.isFavorite || false;
        submited.value = deta.isDelivered || false;
        hasResume.value = deta.hasResume || false;
      } else {
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "获取详情失败",
          icon: "error"
        });
      }
    });
    const name = common_vendor.ref("");
    const tags = common_vendor.ref([""]);
    const type = common_vendor.ref("");
    const status = common_vendor.ref("");
    const coicon = common_vendor.ref("");
    const task = common_vendor.ref(`
`);
    const harvest = common_vendor.ref(``);
    const expect = common_vendor.ref(``);
    const target = common_vendor.ref(``);
    const introduce = common_vendor.ref(``);
    const isCollected = common_vendor.ref(false);
    const loginStatus = common_vendor.ref(common_vendor.index.getStorageSync("loginStatus") || false);
    async function collectsClick() {
      if (!loginStatus.value) {
        openPopup();
        return;
      }
      isCollected.value = !isCollected.value;
      if (isCollected.value) {
        const res = await api_index.collectCampusDetail(id.value);
        if (res.statusCode === 200 && res.data.code === 1) {
          common_vendor.index.showToast({
            title: "收藏成功",
            icon: "success"
          });
        } else {
          common_vendor.index.showToast({
            title: "收藏失败",
            icon: "error"
          });
        }
      } else {
        const res = await api_index.offCollectCampusDetail(id.value);
        if (res.statusCode === 200 && res.data.code === 1) {
          common_vendor.index.showToast({
            title: "取消收藏成功",
            icon: "success"
          });
        } else {
          common_vendor.index.showToast({
            title: "取消收藏失败",
            icon: "error"
          });
        }
      }
    }
    const showLogin = common_vendor.ref(false);
    const popups = common_vendor.ref();
    const openPopup = (e) => {
      if (loginStatus.value) {
        return;
      }
      if (popups.value) {
        showLogin.value = true;
        popups.value.open();
      }
    };
    const closePopup = () => {
      if (popups.value) {
        popups.value.close();
      }
    };
    const change = (event) => {
      common_vendor.index.__f__("log", "at pkgA/detail/detail.vue:260", "Popup state changed");
      if (!event.show) {
        common_vendor.index.__f__("log", "at pkgA/detail/detail.vue:262", "点击了蒙层，弹窗已关闭");
        showLogin.value = false;
      }
    };
    async function handleLoginSuccess(payload) {
      if (payload) {
        loginStatus.value = true;
        showLogin.value = false;
        isLoading.value = true;
        const res = await api_index.getCampusDetail(id.value);
        common_vendor.index.__f__("log", "at pkgA/detail/detail.vue:276", "获取到的详情:", res);
        if (res.statusCode === 200) {
          let deta = res.data.data;
          tags.value = [deta.type, deta.scale, "校园大使"];
          type.value = deta.industries || "未知类型";
          status.value = deta.isRecruit ? "招募中" : "已结束";
          coicon.value = "https://api.xydsh.cn/enterpriseLogo/" + deta.logo || "https://picsum.photos/200";
          name.value = deta.name || "未知名称";
          task.value = deta.task || "暂无任务信息";
          harvest.value = deta.harvest || "暂无收获信息";
          expect.value = deta.expected || "暂无期望信息";
          target.value = deta.targetCollege || "暂无目标院校信息";
          introduce.value = deta.description || "暂无公司介绍";
          isLoading.value = false;
          isCollected.value = deta.isFavorite || false;
          submited.value = deta.isDelivered || false;
          hasResume.value = deta.hasResume || false;
        } else {
          isLoading.value = false;
          common_vendor.index.showToast({
            title: "获取详情失败",
            icon: "error"
          });
        }
        closePopup();
      }
    }
    function handleClose(e) {
      showLogin.value = false;
      closePopup();
    }
    const submited = common_vendor.ref(false);
    async function submits() {
      if (submited.value)
        return;
      if (status.value === "已结束")
        return;
      if (!loginStatus.value) {
        openPopup();
        return;
      }
      if (!hasResume.value) {
        isModal.value = true;
        return;
      }
      await api_index.postCampusApply(id.value);
      submited.value = true;
      if (submited.value)
        common_vendor.index.showToast({
          title: "投递成功",
          icon: "success"
        });
    }
    common_vendor.onShareAppMessage(() => {
      return {
        title: "快来投递校园大使职位吧！",
        path: `/pkgA/detail/detail?id=${id.value}`
        // 分享路径，带上参数
      };
    });
    const navigateToResumePage = () => {
      isModal.value = false;
      pageState.changeNavResume(true);
      common_vendor.index.navigateTo({
        url: "/pkgA/resume/resume"
        // 跳转到简历编辑页面
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          show: isLoading.value
        }),
        b: common_vendor.o((v) => isModal.value = v),
        c: common_vendor.o(navigateToResumePage),
        d: common_vendor.p({
          show: isModal.value
        }),
        e: common_vendor.t(name.value),
        f: common_vendor.f(tags.value, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag),
            b: tag
          };
        }),
        g: common_assets._imports_2$1,
        h: common_vendor.t(type.value),
        i: common_vendor.t(status.value),
        j: status.value === "已结束" ? 1 : "",
        k: coicon.value,
        l: common_vendor.t(task.value),
        m: common_vendor.t(harvest.value),
        n: common_vendor.t(expect.value),
        o: common_vendor.t(target.value),
        p: common_vendor.t(introduce.value),
        q: common_assets._imports_1$5,
        r: common_assets._imports_2$4,
        s: isCollected.value ? "../../static/collected.png" : "../../static/collect.png",
        t: common_vendor.o(collectsClick),
        v: common_vendor.t(status.value === "已结束" ? "已结束" : submited.value ? "已投递" : "投递简历"),
        w: common_vendor.o(submits),
        x: common_vendor.n(status.value === "已结束" ? "endBtn" : "btn"),
        y: common_vendor.o(handleLoginSuccess),
        z: common_vendor.o(handleClose),
        A: common_vendor.p({
          show: showLogin.value
        }),
        B: common_vendor.sr(popups, "35bfcc75-2", {
          "k": "popups"
        }),
        C: common_vendor.o(change),
        D: common_vendor.p({
          type: "bottom",
          mask: "true"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-35bfcc75"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/detail/detail.js.map
