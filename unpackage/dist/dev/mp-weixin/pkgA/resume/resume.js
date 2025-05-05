"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "resume",
  setup(__props) {
    const orders = common_vendor.ref([
      {
        name: "互联网|游戏|软件",
        isdian: false
      },
      {
        name: "建筑|地产|家居",
        isdian: false
      },
      {
        name: "IT|通信|电子",
        isdian: false
      },
      {
        name: "汽车|机械|制造",
        isdian: false
      },
      {
        name: "时尚|奢侈品|美妆",
        isdian: false
      },
      {
        name: "能源|化工|环保",
        isdian: false
      },
      {
        name: "互联网|游戏|软件",
        isdian: false
      },
      {
        name: "互联网|游戏|软件",
        isdian: false
      },
      {
        name: "互联网|游戏|软件",
        isdian: false
      },
      {
        name: "互联网|游戏|软件",
        isdian: false
      },
      {
        name: "互联网|游戏|软件",
        isdian: false
      },
      {
        name: "互联网|游戏|软件",
        isdian: false
      },
      {
        name: "互联网|游戏|软件",
        isdian: false
      },
      {
        name: "互联网|游戏|软件",
        isdian: false
      },
      {
        name: "互联网|游戏|软件",
        isdian: false
      },
      {
        name: "住宿|物业服务|餐饮服务",
        isdian: false
      },
      {
        name: "政府|非营利性机构|其他",
        isdian: false
      }
    ]);
    const resourse = common_vendor.ref([
      {
        name: "高校社团",
        isdian: false
      },
      {
        name: "就业办资源",
        isdian: false
      },
      {
        name: "学生会",
        isdian: false
      },
      {
        name: "表白墙",
        isdian: false
      },
      {
        name: "社群",
        isdian: false
      },
      {
        name: "其他资源",
        isdian: false
      }
    ]);
    const graduationYears = common_vendor.ref(["2023", "2024", "2025"]);
    const selectedGraduationYear = common_vendor.ref("");
    const provinces = common_vendor.ref(["北京", "上海", "广东"]);
    const selectedProvince = common_vendor.ref("");
    const cities = common_vendor.ref(["北京", "上海", "广州", "深圳"]);
    const selectedCity = common_vendor.ref("");
    const educationLevels = common_vendor.ref(["本科", "硕士", "博士"]);
    const selectedEducationLevel = common_vendor.ref("");
    const onGraduationYearChange = (e) => {
      selectedGraduationYear.value = graduationYears.value[e.detail.value];
    };
    const onProvinceChange = (e) => {
      selectedProvince.value = provinces.value[e.detail.value];
    };
    const onCityChange = (e) => {
      selectedCity.value = cities.value[e.detail.value];
    };
    const onEducationLevelChange = (e) => {
      selectedEducationLevel.value = educationLevels.value[e.detail.value];
    };
    const uploadimg = () => {
      common_vendor.index.chooseMedia({
        count: 9,
        // 最多选择9张图片
        mediaType: ["image"],
        // 仅选择图片
        sourceType: ["album", "camera"],
        // 从相册或相机选择
        success(res) {
          const tempFilePaths = res.tempFiles;
          common_vendor.index.__f__("log", "at pkgA/resume/resume.vue:301", tempFilePaths);
          uploadImages(tempFilePaths);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(selectedGraduationYear.value || "请选择毕业届别"),
        b: common_assets._imports_0$7,
        c: graduationYears.value,
        d: common_vendor.o(onGraduationYearChange),
        e: common_vendor.t(selectedProvince.value || "请选择院校省份"),
        f: common_assets._imports_0$7,
        g: provinces.value,
        h: common_vendor.o(onProvinceChange),
        i: common_vendor.t(selectedCity.value || "请选择院校城市"),
        j: common_assets._imports_0$7,
        k: cities.value,
        l: common_vendor.o(onCityChange),
        m: common_vendor.t(selectedEducationLevel.value || "请选择最高学历"),
        n: common_assets._imports_0$7,
        o: educationLevels.value,
        p: common_vendor.o(onEducationLevelChange),
        q: common_vendor.f(orders.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.isdian ? 1 : "",
            c: common_vendor.o(($event) => item.isdian = !item.isdian)
          };
        }),
        r: common_vendor.f(resourse.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.isdian ? 1 : "",
            c: common_vendor.o(($event) => item.isdian = !item.isdian)
          };
        }),
        s: common_assets._imports_1$6,
        t: common_vendor.o(uploadimg)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/resume/resume.js.map
