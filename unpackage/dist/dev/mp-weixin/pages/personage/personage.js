"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (Login + _easycom_uni_popup)();
}
const Login = () => "../../components/Login.js";
const _sfc_main = {
  __name: "personage",
  setup(__props) {
    function navigate(e) {
      common_vendor.index.__f__("log", "at pages/personage/personage.vue:106", e.currentTarget.dataset);
      common_vendor.index.navigateTo({
        url: e.currentTarget.dataset.url
      });
    }
    const loginStatus = common_vendor.ref(false);
    const account = common_vendor.ref();
    loginStatus.value = common_vendor.index.getStorageSync("loginStatus") || false;
    if (loginStatus.value) {
      account.value = formatPhoneNumber(common_vendor.index.getStorageSync("account"));
    }
    const showLogin = common_vendor.ref(false);
    const popups = common_vendor.ref();
    const openPopup = (e) => {
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
      common_vendor.index.__f__("log", "at pages/personage/personage.vue:136", "Popup state changed");
      if (!event.show) {
        common_vendor.index.__f__("log", "at pages/personage/personage.vue:138", "点击了蒙层，弹窗已关闭");
        showLogin.value = false;
      }
    };
    function handleLoginSuccess(payload) {
      if (payload) {
        loginStatus.value = true;
        account.value = formatPhoneNumber(common_vendor.index.getStorageSync("account"));
        showLogin.value = false;
        closePopup();
      }
    }
    function handleClose(e) {
      showLogin.value = false;
      closePopup();
    }
    function formatPhoneNumber(phone) {
      if (!phone)
        return "";
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loginStatus.value ? "../../static/headshot2.png" : "../../static/headshot1.png",
        b: !loginStatus.value
      }, !loginStatus.value ? {} : {
        c: common_vendor.t(account.value)
      }, {
        d: common_vendor.o(openPopup),
        e: common_assets._imports_0$2,
        f: common_vendor.o(navigate),
        g: common_assets._imports_1$2,
        h: common_vendor.o(navigate),
        i: common_assets._imports_2$3,
        j: common_vendor.o(navigate),
        k: common_assets._imports_3$2,
        l: common_vendor.o(navigate),
        m: common_assets._imports_4$1,
        n: common_vendor.o(navigate),
        o: common_assets._imports_5,
        p: common_vendor.o(navigate),
        q: common_assets._imports_6$1,
        r: common_vendor.o(navigate),
        s: common_vendor.o(handleLoginSuccess),
        t: common_vendor.o(handleClose),
        v: common_vendor.p({
          show: showLogin.value
        }),
        w: common_vendor.sr(popups, "d78f6be3-0", {
          "k": "popups"
        }),
        x: common_vendor.o(change),
        y: common_vendor.p({
          type: "bottom",
          mask: "true"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d78f6be3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/personage/personage.js.map
