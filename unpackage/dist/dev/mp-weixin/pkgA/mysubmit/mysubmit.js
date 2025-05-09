"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "mysubmit",
  setup(__props) {
    const items = common_vendor.ref([
      {
        id: 1,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "招募中",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 2,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "已结束",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 3,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "招募中",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 4,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "已结束",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 5,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "招募中",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 6,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "已结束",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 6,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "已结束",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 6,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "已结束",
        coicon: "https://picsum.photos/200",
        look: "5000"
      },
      {
        id: 6,
        name: "振石控股集团有限公司",
        tags: ["民营", "2000人以上", "校园大使"],
        type: "汽车|机械|创造",
        status: "已结束",
        coicon: "https://picsum.photos/200",
        look: "5000"
      }
    ]);
    const navs3 = () => {
      common_vendor.index.navigateTo({
        url: "/pkgA/detail/detail"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(items.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.f(item.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag
              };
            }),
            c: common_vendor.t(item.type),
            d: common_vendor.t(item.status),
            e: item.status === "已结束" ? 1 : "",
            f: item.coicon,
            g: common_vendor.t(item.look),
            h: item.id,
            i: common_vendor.o(navs3, item.id)
          };
        }),
        b: common_assets._imports_2$1,
        c: common_assets._imports_3$1
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f33b20de"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/mysubmit/mysubmit.js.map
