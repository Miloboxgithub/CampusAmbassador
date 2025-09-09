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
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "screen",
  setup(__props) {
    const pageInfo = store_index.pageStore();
    const std = common_vendor.ref(true);
    const items = common_vendor.ref([]);
    const edu = common_vendor.ref("");
    const major = common_vendor.ref("");
    const grade = common_vendor.ref("");
    const ind = common_vendor.ref("");
    const company = common_vendor.ref("");
    const guimo = common_vendor.ref("");
    const xueli = common_vendor.ref([
      {
        n: "学历不限",
        f: false
      },
      {
        n: "专科",
        f: false
      },
      {
        n: "本科",
        f: false
      },
      {
        n: "硕士",
        f: false
      },
      {
        n: "博士",
        f: false
      }
    ]);
    const majorOptions = common_vendor.ref([]);
    const gradeOptions = common_vendor.ref([]);
    const indOptions = common_vendor.ref([]);
    const companyOptions = common_vendor.ref([]);
    const guimoOptions = common_vendor.ref([]);
    const popups = common_vendor.ref();
    const theme = common_vendor.ref("");
    const openPopup = (e) => {
      theme.value = e;
      if (e == "学历要求") {
        items.value = xueli.value;
      } else if (e == "专业要求") {
        items.value = majorOptions.value;
      } else if (e == "年级要求") {
        items.value = gradeOptions.value;
      } else if (e == "行业类型") {
        items.value = indOptions.value;
      } else if (e == "企业类型") {
        items.value = companyOptions.value;
      } else if (e == "公司规模") {
        items.value = guimoOptions.value;
      }
      if (popups.value) {
        popups.value.open();
      }
    };
    const closePopup = () => {
      if (popups.value) {
        popups.value.close();
      }
    };
    const change = () => {
      common_vendor.index.__f__("log", "at pkgA/screen/screen.vue:165", "Popup state changed");
    };
    const select = (e) => {
      items.value.forEach((i) => {
        i.f = false;
      });
      items.value[e].f = true;
    };
    const queren = () => {
      if (theme.value == "学历要求") {
        items.value.forEach((i) => {
          if (i.f) {
            edu.value = i.n;
          }
        });
      } else if (theme.value == "专业要求") {
        items.value.forEach((i) => {
          if (i.f) {
            major.value = i.n;
          }
        });
      } else if (theme.value == "年级要求") {
        items.value.forEach((i) => {
          if (i.f) {
            grade.value = i.n;
          }
        });
      } else if (theme.value == "行业类型") {
        items.value.forEach((i) => {
          if (i.f) {
            ind.value = i.n;
          }
        });
      } else if (theme.value == "企业类型") {
        items.value.forEach((i) => {
          if (i.f) {
            company.value = i.n;
          }
        });
      } else if (theme.value == "公司规模") {
        items.value.forEach((i) => {
          if (i.f) {
            guimo.value = i.n;
          }
        });
      }
      closePopup();
    };
    const switchs = (e) => {
      std.value = e;
    };
    const resets = () => {
      xueli.value.forEach((i) => {
        i.f = false;
      });
      majorOptions.value.forEach((i) => {
        i.f = false;
      });
      gradeOptions.value.forEach((i) => {
        i.f = false;
      });
      indOptions.value.forEach((i) => {
        i.f = false;
      });
      companyOptions.value.forEach((i) => {
        i.f = false;
      });
      guimoOptions.value.forEach((i) => {
        i.f = false;
      });
      edu.value = xueli.value[0].n || "学历不限";
      major.value = majorOptions.value[0].n || "专业不限";
      grade.value = gradeOptions.value[0].n || "年级不限";
      ind.value = indOptions.value[0].n || "行业不限";
      company.value = companyOptions.value[0].n || "企业不限";
      guimo.value = guimoOptions.value[0].n || "规模不限";
      std.value = true;
      pageInfo.filterIndexPage({
        keyword: "",
        status: "招募中",
        educationalRequire: edu.value,
        majorRequire: major.value,
        gradeRequire: grade.value,
        industry: ind.value,
        type: company.value,
        scale: guimo.value
      });
      common_vendor.index.showToast({
        title: "已重置筛选条件",
        icon: "success"
      });
    };
    const confirms = () => {
      pageInfo.filterIndexPage({
        keyword: "",
        status: std.value ? "招募中" : "已结束",
        educationalRequire: edu.value,
        majorRequire: major.value,
        gradeRequire: grade.value,
        industry: ind.value,
        type: company.value,
        scale: guimo.value
      });
      pageInfo.indexInfo.isFilter = true;
      common_vendor.index.navigateBack();
    };
    common_vendor.onLoad(async () => {
      try {
        const res = await api_index.getFilterOptions();
        if (res.data.code == 1 && res.statusCode == 200) {
          const data = res.data.data;
          xueli.value = data.education.map((item) => ({
            n: item,
            f: false
          }));
          majorOptions.value = data.major.map((item) => ({
            n: item,
            f: false
          }));
          gradeOptions.value = data.grade.map((item) => ({
            n: item,
            f: false
          }));
          indOptions.value = data.industry.map((item) => ({
            n: item,
            f: false
          }));
          companyOptions.value = data.companyType.map((item) => ({
            n: item,
            f: false
          }));
          guimoOptions.value = data.companyScale.map((item) => ({
            n: item,
            f: false
          }));
          let ops = pageInfo.indexInfo;
          common_vendor.index.__f__("log", "at pkgA/screen/screen.vue:304", "当前筛选条件:", ops);
          edu.value = ops.educationalRequire || data.education[0];
          major.value = ops.majorRequire || data.major[0];
          grade.value = ops.gradeRequire || data.grade[0];
          ind.value = ops.industry || data.industry[0];
          company.value = ops.type || data.companyType[0];
          guimo.value = ops.scale || data.companyScale[0];
          std.value = ops.status == "招募中" || ops.status == "" ? true : false;
          const markActive = (list, value) => list.forEach((item) => item.f = item.n === value);
          [
            [xueli.value, edu.value],
            [majorOptions.value, major.value],
            [gradeOptions.value, grade.value],
            [indOptions.value, ind.value],
            [companyOptions.value, company.value],
            [guimoOptions.value, guimo.value]
          ].forEach(([list, val]) => markActive(list, val));
          common_vendor.index.__f__("log", "at pkgA/screen/screen.vue:324", "筛选数据初始化成功", data);
        } else {
          common_vendor.index.__f__("error", "at pkgA/screen/screen.vue:326", "获取筛选数据失败:", res);
          common_vendor.index.showToast({
            title: "加载数据失败",
            icon: "error"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pkgA/screen/screen.vue:333", "获取筛选数据失败:", error);
        common_vendor.index.showToast({
          title: "加载数据失败",
          icon: "error"
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: std.value ? 1 : "",
        b: !std.value ? 1 : "",
        c: common_vendor.o(($event) => switchs(true)),
        d: std.value ? 1 : "",
        e: !std.value ? 1 : "",
        f: common_vendor.o(($event) => switchs(false)),
        g: common_vendor.t(edu.value),
        h: common_assets._imports_0$4,
        i: common_vendor.o(($event) => openPopup("学历要求")),
        j: common_vendor.t(major.value),
        k: common_assets._imports_0$4,
        l: common_vendor.o(($event) => openPopup("专业要求")),
        m: common_vendor.t(grade.value),
        n: common_assets._imports_0$4,
        o: common_vendor.o(($event) => openPopup("年级要求")),
        p: common_vendor.t(ind.value),
        q: common_assets._imports_0$4,
        r: common_vendor.o(($event) => openPopup("行业类型")),
        s: common_vendor.t(company.value),
        t: common_assets._imports_0$4,
        v: common_vendor.o(($event) => openPopup("企业类型")),
        w: common_vendor.t(guimo.value),
        x: common_assets._imports_0$4,
        y: common_vendor.o(($event) => openPopup("公司规模")),
        z: common_assets._imports_1$4,
        A: common_vendor.o(resets),
        B: common_vendor.o(resets),
        C: common_vendor.o(confirms),
        D: common_vendor.o(closePopup),
        E: common_vendor.o(queren),
        F: common_vendor.t(theme.value),
        G: common_vendor.f(items.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.n),
            b: item.f == true ? 1 : "",
            c: common_vendor.o(($event) => select(index)),
            d: index != items.value.length - 1
          }, index != items.value.length - 1 ? {} : {});
        }),
        H: common_vendor.sr(popups, "b817f397-0", {
          "k": "popups"
        }),
        I: common_vendor.o(change),
        J: common_vendor.p({
          type: "bottom",
          mask: "true"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b817f397"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/screen/screen.js.map
