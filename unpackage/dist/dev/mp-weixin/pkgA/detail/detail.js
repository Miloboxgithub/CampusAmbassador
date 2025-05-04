"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
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
    function collectsClick() {
      isCollected.value = !isCollected.value;
      if (isCollected.value)
        common_vendor.index.showToast({
          title: "收藏成功",
          icon: "success"
        });
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
        a: common_vendor.f(tags.value, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag),
            b: tag
          };
        }),
        b: common_assets._imports_2$1,
        c: common_vendor.t(type.value),
        d: common_vendor.t(status.value),
        e: status.value === "已结束" ? 1 : "",
        f: coicon.value,
        g: common_vendor.t(task.value),
        h: common_vendor.t(harvest.value),
        i: common_vendor.t(expect.value),
        j: common_vendor.t(target.value),
        k: common_vendor.t(introduce.value),
        l: common_assets._imports_1$3,
        m: isCollected.value ? "../../static/collected.png" : "../../static/collect.png",
        n: common_vendor.o(collectsClick),
        o: common_vendor.t(submited.value ? "已投递" : "立即投递"),
        p: common_vendor.o(submits)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-35bfcc75"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/detail/detail.js.map
