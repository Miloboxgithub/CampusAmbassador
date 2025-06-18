"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_index = require("../../api/index.js");
require("../../store/index.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (Loading + Login + _easycom_uni_popup)();
}
const Loading = () => "../../components/Loading.js";
const Login = () => "../../components/Login.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const isLoading = common_vendor.ref(false);
    const id = common_vendor.ref(null);
    common_vendor.onLoad(async (option) => {
      isLoading.value = true;
      id.value = option.id;
      common_vendor.index.__f__("log", "at pkgA/detail/detail.vue:103", "接收到的 id:", id.value);
      const res = await api_index.getCampusDetail(id.value);
      common_vendor.index.__f__("log", "at pkgA/detail/detail.vue:105", "获取到的详情:", res);
      if (res.statusCode === 200) {
        let deta = res.data.data;
        tags.value = [deta.type, deta.scale, "校园大使"];
        type.value = deta.industries || "未知类型";
        status.value = deta.isRecruit ? "招募中" : "已结束";
        coicon.value = deta.logo || "https://picsum.photos/200";
        name.value = deta.name || "未知名称";
        task.value = deta.task || "暂无任务信息";
        harvest.value = deta.harvest || "暂无收获信息";
        expect.value = deta.expected || "暂无期望信息";
        target.value = deta.targetCollege || "暂无目标院校信息";
        introduce.value = deta.description || "暂无公司介绍";
        isLoading.value = false;
      } else {
        isLoading.value = false;
        common_vendor.index.showToast({
          title: "获取详情失败",
          icon: "error"
        });
      }
    });
    const name = common_vendor.ref("振石控股集团校园大使计划");
    const tags = common_vendor.ref(["民营", "2000人以上", "校园大使"]);
    const type = common_vendor.ref("汽车|机械|创造");
    const status = common_vendor.ref("招募中");
    const coicon = common_vendor.ref("https://picsum.photos/200");
    const task = common_vendor.ref(`你将作为校园生态的核心建设者，承担以下复合型角色:
1. 品牌宣传官策划并执行品牌校园推广方案，通过微信、小红书/等社交媒体传播品牌活动资讯，提升品牌在Z世代群体中的认知度。
2. 社群运营官搭建并运营本校品牌用户社群。
`);
    const harvest = common_vendor.ref(`1. 接触各行业前辈，第一时间了解行业资讯和求职动态；
2. 掌握新媒体运营、用户运营、团队管理等关键软技能，提升个人综合素质。
`);
    const expect = common_vendor.ref(`1.国内外高校在读学生（年级/专业不限）；
2.认可校园大使汇的品牌及理念；`);
    const target = common_vendor.ref(
      `本计划面试全球高校开放申请，无论你是就读于国内高校（含港澳台地区）或海外院校，均欢迎加入！`
    );
    const introduce = common_vendor.ref(
      `振石控股集团，作为浙江省首批股份制改造试点企业，形成了包括玻纤制造、风电基材、特种钢材、复合新材、自控技术等产业。已在国内及印尼、埃及、土耳其、美国、西班牙等国家设立了五十余家控(参) 股子公司。`
    );
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
      common_vendor.index.__f__("log", "at pkgA/detail/detail.vue:210", "Popup state changed");
      if (!event.show) {
        common_vendor.index.__f__("log", "at pkgA/detail/detail.vue:212", "点击了蒙层，弹窗已关闭");
        showLogin.value = false;
      }
    };
    function handleLoginSuccess(payload) {
      if (payload) {
        loginStatus.value = true;
        showLogin.value = false;
        closePopup();
      }
    }
    function handleClose(e) {
      showLogin.value = false;
      closePopup();
    }
    const submited = common_vendor.ref(false);
    function submits() {
      submited.value = !submited.value;
      if (submited.value)
        common_vendor.index.showToast({
          title: "投递成功",
          icon: "success"
        });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          show: isLoading.value
        }),
        b: common_vendor.t(name.value),
        c: common_vendor.f(tags.value, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag),
            b: tag
          };
        }),
        d: common_assets._imports_2$1,
        e: common_vendor.t(type.value),
        f: common_vendor.t(status.value),
        g: status.value === "已结束" ? 1 : "",
        h: coicon.value,
        i: common_vendor.t(task.value),
        j: common_vendor.t(harvest.value),
        k: common_vendor.t(expect.value),
        l: common_vendor.t(target.value),
        m: common_vendor.t(introduce.value),
        n: common_assets._imports_1$3,
        o: isCollected.value ? "../../static/collected.png" : "../../static/collect.png",
        p: common_vendor.o(collectsClick),
        q: common_vendor.t(submited.value ? "已投递" : "立即投递"),
        r: common_vendor.o(submits),
        s: common_vendor.o(handleLoginSuccess),
        t: common_vendor.o(handleClose),
        v: common_vendor.p({
          show: showLogin.value
        }),
        w: common_vendor.sr(popups, "35bfcc75-1", {
          "k": "popups"
        }),
        x: common_vendor.o(change),
        y: common_vendor.p({
          type: "bottom",
          mask: "true"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-35bfcc75"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/detail/detail.js.map
