"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_index = require("../../api/index.js");
require("../../store/index.js");
const _sfc_main = {
  __name: "resume",
  setup(__props) {
    const fromData = common_vendor.ref({
      "name": "",
      "phone": "",
      "weChat": "",
      "email": "",
      "college": "",
      "province": "",
      "city": "",
      "educational": "",
      "graduate": "",
      "major": "",
      "assets": "",
      "intendedIndustry": "",
      "experienceAndStrengths": ""
    });
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
    const provinces = common_vendor.ref(["北京", "上海", "广东"]);
    const cities = common_vendor.ref(["北京", "上海", "广州", "深圳"]);
    const educationLevels = common_vendor.ref(["本科", "硕士", "博士"]);
    common_vendor.ref("");
    const onGraduationYearChange = (e) => {
      fromData.value.graduate = graduationYears.value[e.detail.value];
    };
    const onProvinceChange = (e) => {
      fromData.value.province = provinces.value[e.detail.value];
    };
    const onCityChange = (e) => {
      fromData.value.city = cities.value[e.detail.value];
    };
    const onEducationLevelChange = (e) => {
      fromData.value.educational = educationLevels.value[e.detail.value];
    };
    const uploadFile = () => {
      common_vendor.index.chooseMessageFile({
        count: 1,
        // 默认选择一个文件
        type: "file",
        // 选择文件类型
        success: async (res) => {
          const file = res.tempFiles[0];
          if (file) {
            common_vendor.index.__f__("log", "at pkgA/resume/resume.vue:282", file, "选择的文件信息");
            try {
              const uploadRes = await api_index.uploadResumeAttachment(file.path);
              common_vendor.index.__f__("log", "at pkgA/resume/resume.vue:285", uploadRes, "上传简历附件的响应信息");
              if (uploadRes.statusCode === 200 && uploadRes.errMsg === "uploadFile:ok") {
                common_vendor.index.showToast({
                  title: "上传成功",
                  icon: "success"
                });
              } else {
                common_vendor.index.showToast({
                  title: uploadRes.errMsg || "上传失败",
                  icon: "none"
                });
              }
            } catch (error) {
              common_vendor.index.__f__("error", "at pkgA/resume/resume.vue:299", "上传简历附件失败:", error);
              common_vendor.index.showToast({
                title: "上传简历附件失败",
                icon: "none"
              });
            }
          }
        },
        fail: (error) => {
          common_vendor.index.__f__("error", "at pkgA/resume/resume.vue:308", "选择文件失败:", error);
          common_vendor.index.showToast({
            title: "选择文件失败",
            icon: "none"
          });
        }
      });
    };
    const submitResumeInfo = async () => {
      const requiredFields = [
        "name",
        "phone",
        "weChat",
        "email",
        "college",
        "province",
        "city",
        "educational",
        "graduate",
        "major",
        "experienceAndStrengths"
      ];
      for (const field of requiredFields) {
        if (!fromData.value[field]) {
          common_vendor.index.showToast({
            title: `${field}不能为空`,
            icon: "none"
          });
          return;
        }
      }
      if (!orders.value.some((item) => item.isdian)) {
        common_vendor.index.showToast({
          title: "请至少选择一个意向行业",
          icon: "none"
        });
        return;
      }
      if (!resourse.value.some((item) => item.isdian)) {
        common_vendor.index.showToast({
          title: "请至少选择一个拥有资源",
          icon: "none"
        });
        return;
      }
      try {
        const resumeData = {
          // 这里填入需要提交的简历信息
          name: fromData.value.name,
          phone: fromData.value.phone,
          weChat: fromData.value.weChat,
          email: fromData.value.email,
          college: fromData.value.college,
          province: fromData.value.province,
          city: fromData.value.city,
          educational: fromData.value.educational,
          graduate: fromData.value.graduate,
          major: fromData.value.major,
          assets: resourse.value.filter((item) => item.isdian).map((item) => item.name).join(","),
          intendedIndustry: orders.value.filter((item) => item.isdian).map((item) => item.name).join(","),
          experienceAndStrengths: fromData.value.experienceAndStrengths
        };
        common_vendor.index.__f__("log", "at pkgA/resume/resume.vue:366", resumeData, "提交的简历信息");
        const res = await api_index.uploadResumeInfo(resumeData);
        common_vendor.index.__f__("log", "at pkgA/resume/resume.vue:368", res, "提交简历信息的响应信息");
        if (res.statusCode === 200 && res.data.code === 1) {
          common_vendor.index.showToast({
            title: "简历信息提交成功",
            icon: "success"
          });
        } else {
          common_vendor.index.showToast({
            title: res.message || "提交失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pkgA/resume/resume.vue:381", "提交简历信息失败:", error);
        common_vendor.index.showToast({
          title: "提交简历信息失败",
          icon: "none"
        });
      }
    };
    const GetUserResumeInfo = async () => {
      try {
        const res = await api_index.getUserResumeInfo();
        if (res.statusCode === 200 && res.data.code === 1) {
          common_vendor.index.__f__("log", "at pkgA/resume/resume.vue:395", res, "获取到的简历信息");
          const resumeInfo = res.data.data;
          fromData.value.name = resumeInfo.name || "";
          fromData.value.phone = resumeInfo.phone || "";
          fromData.value.weChat = resumeInfo.weChat || "";
          fromData.value.email = resumeInfo.email || "";
          fromData.value.college = resumeInfo.college || "";
          fromData.value.province = resumeInfo.province || "";
          fromData.value.city = resumeInfo.city || "";
          fromData.value.educational = resumeInfo.educational || "";
          fromData.value.graduate = resumeInfo.graduate || "";
          fromData.value.major = resumeInfo.major || "";
          fromData.value.experienceAndStrengths = resumeInfo.experienceAndStrengths || "";
          orders.value.forEach((item) => {
            item.isdian = resumeInfo.intendedIndustry && resumeInfo.intendedIndustry.includes(item.name);
          });
          resourse.value.forEach((item) => {
            item.isdian = resumeInfo.assets && resumeInfo.assets.includes(item.name);
          });
        } else {
          common_vendor.index.showToast({
            title: res.errMsg,
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pkgA/resume/resume.vue:423", "获取简历信息失败:", error);
        common_vendor.index.showToast({
          title: "获取简历信息失败",
          icon: "none"
        });
      }
    };
    common_vendor.onShow(() => {
      GetUserResumeInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: fromData.value.name,
        b: common_vendor.o(($event) => fromData.value.name = $event.detail.value),
        c: fromData.value.college,
        d: common_vendor.o(($event) => fromData.value.college = $event.detail.value),
        e: fromData.value.phone,
        f: common_vendor.o(($event) => fromData.value.phone = $event.detail.value),
        g: fromData.value.weChat,
        h: common_vendor.o(($event) => fromData.value.weChat = $event.detail.value),
        i: fromData.value.email,
        j: common_vendor.o(($event) => fromData.value.email = $event.detail.value),
        k: common_vendor.t(fromData.value.graduate || "请选择毕业届别"),
        l: common_assets._imports_0$6,
        m: graduationYears.value,
        n: common_vendor.o(onGraduationYearChange),
        o: common_vendor.t(fromData.value.province || "请选择院校省份"),
        p: common_assets._imports_0$6,
        q: provinces.value,
        r: common_vendor.o(onProvinceChange),
        s: common_vendor.t(fromData.value.city || "请选择院校城市"),
        t: common_assets._imports_0$6,
        v: cities.value,
        w: common_vendor.o(onCityChange),
        x: common_vendor.t(fromData.value.educational || "请选择最高学历"),
        y: common_assets._imports_0$6,
        z: educationLevels.value,
        A: common_vendor.o(onEducationLevelChange),
        B: fromData.value.major,
        C: common_vendor.o(($event) => fromData.value.major = $event.detail.value),
        D: common_vendor.f(orders.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.isdian ? 1 : "",
            c: common_vendor.o(($event) => item.isdian = !item.isdian)
          };
        }),
        E: common_vendor.f(resourse.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.isdian ? 1 : "",
            c: common_vendor.o(($event) => item.isdian = !item.isdian)
          };
        }),
        F: fromData.value.experienceAndStrengths,
        G: common_vendor.o(($event) => fromData.value.experienceAndStrengths = $event.detail.value),
        H: common_assets._imports_1$6,
        I: common_vendor.o(uploadFile),
        J: common_vendor.o(submitResumeInfo)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/resume/resume.js.map
