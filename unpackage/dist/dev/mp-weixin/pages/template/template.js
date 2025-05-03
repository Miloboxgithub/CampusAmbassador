"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "template",
  setup(__props) {
    const types = common_vendor.ref([
      {
        name: "通用",
        flag: true
      },
      {
        name: "简约",
        flag: false
      },
      {
        name: "现代",
        flag: false
      },
      {
        name: "经典",
        flag: false
      },
      {
        name: "创意",
        flag: false
      },
      {
        name: "专业",
        flag: false
      },
      {
        name: "英文",
        flag: false
      }
    ]);
    const mobans = common_vendor.ref([
      {
        img: "../../static/模板1@2x.png",
        sum: 5e3
      },
      {
        img: "../../static/模板1@2x (1).png",
        sum: 5e3
      },
      {
        img: "../../static/模板1@2x (2).png",
        sum: 5e3
      },
      {
        img: "../../static/模板1@2x (3).png",
        sum: 5e3
      }
    ]);
    const changeType = (i) => {
      types.value.forEach((item) => {
        item.flag = false;
      });
      i.flag = true;
    };
    const navs = () => {
      common_vendor.index.navigateTo({
        url: "/pkgA/preview/preview"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_assets._imports_1$1,
        c: common_assets._imports_2$1,
        d: common_vendor.f(types.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.flag ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => changeType(item), index)
          };
        }),
        e: common_vendor.f(mobans.value, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.sum),
            c: index,
            d: common_vendor.o(navs, index)
          };
        }),
        f: common_assets._imports_3$1,
        g: common_assets._imports_2$2
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-754db3c2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/template/template.js.map
