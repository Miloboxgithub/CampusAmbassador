"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_index = require("../../api/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "resume",
  setup(__props) {
    const fromData = common_vendor.ref({
      name: "",
      phone: "",
      weChat: "",
      email: "",
      college: "",
      province: "",
      city: "",
      educational: "",
      graduate: "",
      major: "",
      assets: "",
      intendedIndustry: "",
      experienceAndStrengths: ""
    });
    const orders = common_vendor.ref([
      // {
      // 	name: "互联网|游戏|软件",
      // 	isdian: false,
      // },
    ]);
    const resourse = common_vendor.ref([
      // {
      // 	name: "高校社团",
      // 	isdian: false,
      // },
    ]);
    const graduationYears = common_vendor.ref([]);
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    for (let i = 0; i < 4; i++) {
      graduationYears.value.push((currentYear + i).toString() + "届");
    }
    const provinces = common_vendor.computed(
      () => Object.keys(common_vendor.areaList.province_list).map((code) => common_vendor.areaList.province_list[code])
    );
    const cities = common_vendor.ref([]);
    const educationLevels = common_vendor.ref(["专科", "本科", "硕士", "博士"]);
    common_vendor.ref("");
    const onGraduationYearChange = (e) => {
      fromData.value.graduate = graduationYears.value[e.detail.value];
    };
    const onProvinceChange = (e) => {
      const provinceName = provinces.value[e.detail.value];
      common_vendor.index.__f__("log", "at pkgA/resume/resume.vue:256", provinceName);
      fromData.value.province = provinceName;
      const provinceCode = Object.keys(common_vendor.areaList.province_list).find(
        (code) => common_vendor.areaList.province_list[code] === provinceName
      );
      cities.value = Object.keys(common_vendor.areaList.city_list).filter((code) => code.slice(0, 2) === provinceCode.slice(0, 2)).map((code) => common_vendor.areaList.city_list[code]);
      fromData.value.city = "";
    };
    function checkProvince() {
      if (!fromData.value.province) {
        common_vendor.index.showToast({
          title: "请先选择省份",
          icon: "none",
          duration: 1500
        });
      }
    }
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
            common_vendor.index.__f__("log", "at pkgA/resume/resume.vue:295", file, "选择的文件信息");
            try {
              const uploadRes = await api_index.uploadResumeAttachment(file.path);
              common_vendor.index.__f__("log", "at pkgA/resume/resume.vue:298", uploadRes, "上传简历附件的响应信息");
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
              common_vendor.index.__f__("error", "at pkgA/resume/resume.vue:314", "上传简历附件失败:", error);
              common_vendor.index.showToast({
                title: "上传简历附件失败",
                icon: "none"
              });
            }
          }
        },
        fail: (error) => {
          common_vendor.index.__f__("error", "at pkgA/resume/resume.vue:323", "选择文件失败:", error);
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
        common_vendor.index.__f__("log", "at pkgA/resume/resume.vue:395", resumeData, "提交的简历信息");
        const res = await api_index.uploadResumeInfo(resumeData);
        common_vendor.index.__f__("log", "at pkgA/resume/resume.vue:397", res, "提交简历信息的响应信息");
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
        common_vendor.index.__f__("error", "at pkgA/resume/resume.vue:410", "提交简历信息失败:", error);
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
          common_vendor.index.__f__("log", "at pkgA/resume/resume.vue:424", res, "获取到的简历信息");
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
        common_vendor.index.__f__("error", "at pkgA/resume/resume.vue:455", "获取简历信息失败:", error);
        common_vendor.index.showToast({
          title: "获取简历信息失败",
          icon: "none"
        });
      }
    };
    common_vendor.onLoad(() => {
      api_index.getResumeOptions().then((res) => {
        common_vendor.index.__f__("log", "at pkgA/resume/resume.vue:466", res, "获取简历选项的响应信息");
        if (res.statusCode === 200 && res.data.code === 1) {
          res.data.data.industryOptions.forEach((item) => {
            orders.value.push({
              name: item,
              isdian: false
            });
          });
          res.data.data.assetOptions.forEach((item) => {
            resourse.value.push({
              name: item,
              isdian: false
            });
          });
        } else {
          common_vendor.index.showToast({
            title: res.errMsg,
            icon: "none"
          });
        }
      }).catch((error) => {
        common_vendor.index.__f__("error", "at pkgA/resume/resume.vue:488", "获取简历选项失败:", error);
        common_vendor.index.showToast({
          title: "获取简历选项失败",
          icon: "none"
        });
      });
    });
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
        m: fromData.value.graduate ? "#000" : "",
        n: graduationYears.value,
        o: common_vendor.o(onGraduationYearChange),
        p: common_vendor.t(fromData.value.province || "请选择院校省份"),
        q: common_assets._imports_0$6,
        r: fromData.value.province ? "#000" : "#",
        s: provinces.value,
        t: common_vendor.o(onProvinceChange),
        v: common_vendor.t(fromData.value.city || "请选择院校城市"),
        w: common_assets._imports_0$6,
        x: common_vendor.o(checkProvince),
        y: fromData.value.city ? "#000" : "",
        z: cities.value,
        A: common_vendor.o(onCityChange),
        B: !fromData.value.province,
        C: common_vendor.t(fromData.value.educational || "请选择最高学历"),
        D: common_assets._imports_0$6,
        E: fromData.value.educational ? "#000" : "",
        F: educationLevels.value,
        G: common_vendor.o(onEducationLevelChange),
        H: fromData.value.major,
        I: common_vendor.o(($event) => fromData.value.major = $event.detail.value),
        J: common_vendor.f(orders.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.isdian ? 1 : "",
            c: common_vendor.o(($event) => item.isdian = !item.isdian)
          };
        }),
        K: common_vendor.f(resourse.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.isdian ? 1 : "",
            c: common_vendor.o(($event) => item.isdian = !item.isdian)
          };
        }),
        L: fromData.value.experienceAndStrengths,
        M: common_vendor.o(($event) => fromData.value.experienceAndStrengths = $event.detail.value),
        N: common_assets._imports_1$6,
        O: common_vendor.o(uploadFile),
        P: common_vendor.o(submitResumeInfo)
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pkgA/resume/resume.js.map
