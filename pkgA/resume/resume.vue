<template>
  <scroll-view class="page-container" scroll-y="true">
    <view class="white" style="height: 522px">
      <view class="theme">基本信息</view>
      <view style="position: absolute; top: 33px; width: 100%">
        <view class="row">
          <view class="msg">姓名<text class="red">*</text></view>
          <input
            type="text"
            placeholder="请输入姓名"
            placeholder-class="custom-placeholder"
            v-model="fromData.name"
          />
        </view>
        <view class="line"></view>
        <view class="row">
          <view class="msg">院校名称<text class="red">*</text></view>
          <input
            type="text"
            placeholder="请输入院校名称"
            placeholder-class="custom-placeholder"
            v-model="fromData.college"
          />
        </view>
        <view class="line"></view>
        <view class="row">
          <view class="msg">手机号码<text class="red">*</text></view>
          <input
            type="text"
            placeholder="请输入手机号码"
            placeholder-class="custom-placeholder"
            v-model="fromData.phone"
          />
        </view>
        <view class="line"></view>
        <view class="row">
          <view class="msg">微信号<text class="red">*</text></view>
          <input
            type="text"
            placeholder="请输入微信号"
            placeholder-class="custom-placeholder"
            v-model="fromData.weChat"
          />
        </view>
        <view class="line"></view>
        <view class="row">
          <view class="msg">电子邮箱<text class="red">*</text></view>
          <input
            type="text"
            placeholder="请输入电子邮箱"
            placeholder-class="custom-placeholder"
            v-model="fromData.email"
          />
        </view>
        <view class="line"></view>
        <view class="row">
          <view class="msg">毕业届别<text class="red">*</text></view>
          <picker
            mode="selector"
            :range="graduationYears"
            @change="onGraduationYearChange"
          >
            <view class="picker custom-placeholder" :style="{ color: fromData.graduate ? '#000' : '' }">
              {{ fromData.graduate || "请选择毕业届别" }}
              <image
                class="arrow"
                src="../img/you.png"
                mode="aspectFit|aspectFill|widthFix"
              />
            </view>
          </picker>
        </view>
        <view class="line"></view>
        <view class="row">
          <view class="msg">院校省份<text class="red">*</text></view>
          <picker mode="selector" :range="provinces" @change="onProvinceChange">
            <view class="picker custom-placeholder" :style="{ color: fromData.province ? '#000' : '#' }">
              {{ fromData.province || "请选择院校省份" }}
              <image
                class="arrow"
                src="../img/you.png"
                mode="aspectFit|aspectFill|widthFix"
              />
            </view>
          </picker>
        </view>
        <view class="line"></view>
        <view class="row">
          <view class="msg">院校城市<text class="red">*</text></view>
		  
          <picker mode="selector" :range="cities" @change="onCityChange" :disabled="!fromData.province">
            <view class="picker custom-placeholder" @click="checkProvince" :style="{ color: fromData.city ? '#000' : '' }">
              {{ fromData.city || "请选择院校城市" }}
              <image
                class="arrow"
                src="../img/you.png"
                mode="aspectFit|aspectFill|widthFix"
				
              />
            </view>
          </picker>
        </view>
        <view class="line"></view>
        <view class="row">
          <view class="msg">最高学历<text class="red">*</text></view>
          <picker
            mode="selector"
            :range="educationLevels"
            @change="onEducationLevelChange"
          >
            <view class="picker custom-placeholder"  :style="{ color: fromData.educational ? '#000' : '' }">
              {{ fromData.educational || "请选择最高学历" }}
              <image
                class="arrow"
                src="../img/you.png"
                mode="aspectFit|aspectFill|widthFix"
              />
            </view>
          </picker>
        </view>
        <view class="line"></view>
        <view class="row">
          <view class="msg">专业名称<text class="red">*</text></view>
          <input
            type="text"
            placeholder="请输入专业名称"
            placeholder-class="custom-placeholder"
            adjust-position="false"
            v-model="fromData.major"
          />
        </view>
      </view>
    </view>
    <view class="white" style="min-height: 301px">
      <view class="theme">意向行业<text class="red">*</text></view>
      <view class="more">（可多选）</view>
      <view class="kuais">
        <view
          class="kuai"
          v-for="(item, index) in orders"
          :class="{ kuaiActive: item.isdian }"
          @click="item.isdian = !item.isdian"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
    <view class="white" style="height: 134px">
      <view class="theme">拥有资源<text class="red">*</text></view>
      <view class="more">（可多选）</view>
      <view class="kuais">
        <view
          class="kuai"
          v-for="(item, index) in resourse"
          :class="{ kuaiActive: item.isdian }"
          @click="item.isdian = !item.isdian"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
    <view class="white" style="height: 164px">
      <view class="theme">经历和优势<text class="red">*</text></view>
      <textarea
        name=""
        class="exp"
        maxlength="1000"
        placeholder-class="custom-placeholder"
        placeholder="请输入您的经历"
        v-model="fromData.experienceAndStrengths"
      ></textarea>
    </view>
    <view class="white">
      <view class="theme">简历附件<text class="red">*</text></view>
      <view class="upload" @click="uploadFile">
        <image
          src="../img/upload.png"
          mode="aspectFit|aspectFill|widthFix"
        ></image>
      </view>
    </view>
    <view class="footer">
      <view class="cmp" @click="submitResumeInfo">完成</view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref,computed } from "vue";
import {
  onShow,
  onLoad,
  onReachBottom,
  onPullDownRefresh,
} from "@dcloudio/uni-app";
import {
  getUserResumeInfo,
  uploadResumeInfo,
  uploadResumeAttachment,
  getResumeOptions,
} from "@/api/index.js";
import { pageStore } from "@/store";
import { areaList } from "@vant/area-data"; // 省市区三级数据
const fromData = ref({
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
  experienceAndStrengths: "",
});
const orders = ref([
  // {
  // 	name: "互联网|游戏|软件",
  // 	isdian: false,
  // },
]);
const resourse = ref([
  // {
  // 	name: "高校社团",
  // 	isdian: false,
  // },
]);
const graduationYears = ref([]);
const currentYear = new Date().getFullYear();
for (let i = 0; i < 4; i++) {
  graduationYears.value.push((currentYear + i).toString() + "届");
}
//const selectedGraduationYear = ref('');

/* 省列表：直接把名称取出来 */
const provinces = computed(() =>
  Object.keys(areaList.province_list).map(code => areaList.province_list[code])
)
/* 城市列表（随省动态变化） */
const cities = ref([]);

const educationLevels = ref(["专科", "本科", "硕士", "博士"]);
const selectedEducationLevel = ref("");

const onGraduationYearChange = (e) => {
  fromData.value.graduate = graduationYears.value[e.detail.value];
};

/* 省变化时联动城市 */
const onProvinceChange = (e) => {

  const provinceName = provinces.value[e.detail.value]
  console.log(provinceName)
  fromData.value.province = provinceName

  /* 找出所有属于该省的城市名称 */
  // 1. 先找到当前省的 code
  const provinceCode = Object.keys(areaList.province_list).find(
    code => areaList.province_list[code] === provinceName
  )
  // 2. 再过滤出城市名称
  cities.value = Object.keys(areaList.city_list)
    .filter(code => code.slice(0, 2) === provinceCode!.slice(0, 2))
    .map(code => areaList.city_list[code])

  fromData.value.city = ''
}
function checkProvince() {
  if (!fromData.value.province) {
    uni.showToast({
      title: '请先选择省份',
      icon: 'none',
      duration: 1500
    });
  }
}
const onCityChange = (e) => {
	fromData.value.city = cities.value[e.detail.value]
};

const onEducationLevelChange = (e) => {
  fromData.value.educational = educationLevels.value[e.detail.value];
};
//上传简历附件文件（支持PDF、DOCX、PNG、JPG格式）
const uploadFile = () => {
  uni.chooseMessageFile({
    count: 1, // 默认选择一个文件
    type: "file", // 选择文件类型
    success: async (res) => {
      const file = res.tempFiles[0];
      if (file) {
        console.log(file, "选择的文件信息");
        try {
          const uploadRes = await uploadResumeAttachment(file.path);
          console.log(uploadRes, "上传简历附件的响应信息");
          if (
            uploadRes.statusCode === 200 &&
            uploadRes.errMsg === "uploadFile:ok"
          ) {
            uni.showToast({
              title: "上传成功",
              icon: "success",
            });
          } else {
            uni.showToast({
              title: uploadRes.errMsg || "上传失败",
              icon: "none",
            });
          }
        } catch (error) {
          console.error("上传简历附件失败:", error);
          uni.showToast({
            title: "上传简历附件失败",
            icon: "none",
          });
        }
      }
    },
    fail: (error) => {
      console.error("选择文件失败:", error);
      uni.showToast({
        title: "选择文件失败",
        icon: "none",
      });
    },
  });
};

// 提交简历信息
const submitResumeInfo = async () => {
  // 检查必填项是否填写完整
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
    "experienceAndStrengths",
  ];
  for (const field of requiredFields) {
    if (!fromData.value[field]) {
      uni.showToast({
        title: `${field}不能为空`,
        icon: "none",
      });
      return;
    }
  }
  // 检查意向行业和拥有资源是否至少选择一个
  if (!orders.value.some((item) => item.isdian)) {
    uni.showToast({
      title: "请至少选择一个意向行业",
      icon: "none",
    });
    return;
  }
  if (!resourse.value.some((item) => item.isdian)) {
    uni.showToast({
      title: "请至少选择一个拥有资源",
      icon: "none",
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
      assets: resourse.value
        .filter((item) => item.isdian)
        .map((item) => item.name)
        .join(","),
      intendedIndustry: orders.value
        .filter((item) => item.isdian)
        .map((item) => item.name)
        .join(","),
      experienceAndStrengths: fromData.value.experienceAndStrengths,
    };
    console.log(resumeData, "提交的简历信息");
    const res = await uploadResumeInfo(resumeData);
    console.log(res, "提交简历信息的响应信息");
    if (res.statusCode === 200 && res.data.code === 1) {
      uni.showToast({
        title: "简历信息提交成功",
        icon: "success",
      });
    } else {
      uni.showToast({
        title: res.message || "提交失败",
        icon: "none",
      });
    }
  } catch (error) {
    console.error("提交简历信息失败:", error);
    uni.showToast({
      title: "提交简历信息失败",
      icon: "none",
    });
  }
};

//获取用户简历信息
const GetUserResumeInfo = async () => {
  try {
    const res = await getUserResumeInfo();
    if (res.statusCode === 200 && res.data.code === 1) {
      // 处理获取到的简历信息
      console.log(res, "获取到的简历信息");
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
      fromData.value.experienceAndStrengths =
        resumeInfo.experienceAndStrengths || "";
      // 处理意向行业和拥有资源
      orders.value.forEach((item) => {
        item.isdian =
          resumeInfo.intendedIndustry &&
          resumeInfo.intendedIndustry.includes(item.name);
      });
      resourse.value.forEach((item) => {
        item.isdian =
          resumeInfo.assets && resumeInfo.assets.includes(item.name);
      });
    } else {
      uni.showToast({
        title: res.errMsg,
        icon: "none",
      });
    }
  } catch (error) {
    console.error("获取简历信息失败:", error);
    uni.showToast({
      title: "获取简历信息失败",
      icon: "none",
    });
  }
};
onLoad(() => {
  // 页面加载时获取简历选项
  getResumeOptions()
    .then((res) => {
      console.log(res, "获取简历选项的响应信息");
      if (res.statusCode === 200 && res.data.code === 1) {
        res.data.data.industryOptions.forEach((item) => {
          orders.value.push({
            name: item,
            isdian: false,
          });
        });
        res.data.data.assetOptions.forEach((item) => {
          resourse.value.push({
            name: item,
            isdian: false,
          });
        });
      } else {
        uni.showToast({
          title: res.errMsg,
          icon: "none",
        });
      }
    })
    .catch((error) => {
      console.error("获取简历选项失败:", error);
      uni.showToast({
        title: "获取简历选项失败",
        icon: "none",
      });
    });
});
onShow(() => {
  // 页面显示时获取用户简历信息
  GetUserResumeInfo();
});
</script>

<style lang="scss">
.page-container {
  background: rgb(245, 245, 245);
  height: 100vh;
  /* 使用视口高度确保填充整个页面 */
  width: 100vw;
  /* 使用视口宽度确保填充整个页面 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.white {
  margin-top: 20px;
  width: 90vw;
  margin-left: 5vw;
  min-height: 120px;
  opacity: 1;
  border-radius: 15px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
}

.theme {
  position: absolute;
  left: 16px;
  top: 10px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 23.17px;
  color: rgba(0, 0, 0, 1);
  text-align: left;
  vertical-align: top;
}

.red {
  color: red;
}

.row {
  width: 92%;
  margin-left: 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
}

.row input {
  text-align: right;
  font-size: 14px;
}

.msg {
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 23.17px;
  color: rgba(56, 56, 56, 1);
}

.arrow {
  width: 5.26px;
  height: 9.02px;
  margin-left: 4px;
}

.custom-placeholder {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 20.27px;
  color: rgba(166, 166, 166, 1);
  text-align: right;
  vertical-align: top;
}

.line {
  margin-top: 12px;
  width: 93%;
  margin-left: 3.5%;
  height: 0px;
  opacity: 1;
  border: 0.5px solid rgba(229, 229, 229, 1);
}

.more {
  position: absolute;
  left: 92px;
  top: 12px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 17.38px;
  color: rgba(128, 128, 128, 1);
  text-align: left;
  vertical-align: top;
}

.kuais {
  position: absolute;
  top: 43px;
  // width: 92%;
  left: 2%;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 3px;
}

.kuai {
  min-width: 30%;
  padding-left: 1px;
  padding-right: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  opacity: 1;
  border-radius: 6px;
  background: rgba(229, 229, 229, 0.5);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 15.93px;
  color: rgba(56, 56, 56, 1);
  text-align: center;
  vertical-align: top;
}

.kuaiActive {
  border: 1px solid rgba(88, 127, 255, 1);
  min-width: calc(30% - 2px);
  height: calc(36px - 2px);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 15.93px;
  color: rgba(88, 127, 255, 1);
  text-align: center;
  vertical-align: top;
}

.exp {
  position: absolute;
  top: 40px;
  width: 92%;
  left: 4%;
  height: 100px;
  font-size: 14px;
}

.upload {
  position: absolute;
  top: 46px;
  left: 16px;
  width: 60px;
  height: 60px;
  opacity: 1;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload image {
  width: 17.78px;
  height: 16px;
}

.footer {
  width: 100vw;
  height: 64px;
  background: rgba(255, 255, 255, 1);
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cmp {
  width: 82%;
  height: 36px;
  opacity: 1;
  border-radius: 18px;
  background: rgba(88, 127, 255, 0.4);
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 24.62px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  vertical-align: top;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
