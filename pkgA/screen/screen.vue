<template>
  <view class="choice">
    <text class="title">状态筛选</text>
    <view class="status">
      <view :class="{ st1: std, st2: !std }" @click="switchs(true)"
        >招募中</view
      >
      <view :class="{ st2: std, st1: !std }" @click="switchs(false)"
        >已结束</view
      >
    </view>
  </view>
  <view class="choice" @click="openPopup('学历要求')">
    <text class="title">学历要求</text>
    <view class="option">
      <text class="nnn">{{ edu }}</text>
      <img src="../img/xia.png" alt="" class="icon" />
    </view>
  </view>
  <view class="choice" @click="openPopup('专业要求')">
    <text class="title">专业要求</text>
    <view class="option">
      <text class="nnn">{{ major }}</text>
      <img src="../img/xia.png" alt="" class="icon" />
    </view>
  </view>
  <view class="choice" @click="openPopup('年级要求')">
    <text class="title">年级要求</text>
    <view class="option">
      <text class="nnn">{{ grade }}</text>
      <img src="../img/xia.png" alt="" class="icon" />
    </view>
  </view>
  <view class="choice" @click="openPopup('行业类型')">
    <text class="title">行业类型</text>
    <view class="option">
      <text class="nnn">{{ ind }}</text>
      <img src="../img/xia.png" alt="" class="icon" />
    </view>
  </view>
  <view class="choice" @click="openPopup('企业类型')">
    <text class="title">企业类型</text>
    <view class="option">
      <text class="nnn">{{ company }}</text>
      <img src="../img/xia.png" alt="" class="icon" />
    </view>
  </view>
  <view class="choice" @click="openPopup('公司规模')">
    <text class="title">公司规模</text>
    <view class="option">
      <text class="nnn">{{ guimo }}</text>
      <img src="../img/xia.png" alt="" class="icon" />
    </view>
  </view>
  <view class="kong"></view>
  <view class="footer">
    <image
      src="../img/Combined Shape@2x.png"
      class="chong"
      mode=""
      @click="resets"
    ></image>
    <text class="zhi" @click="resets">重置</text>
    <view class="res" @click="confirms">确认</view>
  </view>
  <uni-popup ref="popups" type="bottom" mask="true" @change="change">
    <view class="popup-content">
      <view class="quxiao" @click="closePopup">取消</view>
      <view class="queren" @click="queren">确认</view>
      <text class="theme">请选择{{ theme }}</text>
      <view class="items-block">
        <view class="content">
          <view v-for="(item, index) in items">
            <view
              class="op"
              :class="{ lan: item.f == true }"
              @click="select(index)"
              >{{ item.n }}</view
            >
            <view class="line" v-if="index != items.length - 1"></view>
          </view>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
import { ref } from "vue";
import {
  onShow,
  onLoad,
  onReachBottom,
  onPullDownRefresh,
} from "@dcloudio/uni-app";
import { getFilterOptions } from "@/api/index.js";
import { pageStore } from "@/store";
const pageInfo = pageStore();
const std = ref(true);
const items = ref([]);
const edu = ref("");
const major = ref("");
const grade = ref("");
const ind = ref("");
const company = ref("");
const guimo = ref("");
const xueli = ref([
  {
    n: "学历不限",
    f: false,
  },
  {
    n: "专科",
    f: false,
  },
  {
    n: "本科",
    f: false,
  },
  {
    n: "硕士",
    f: false,
  },
  {
    n: "博士",
    f: false,
  },
]);
const majorOptions = ref([]);
const gradeOptions = ref([]);
const indOptions = ref([]);
const companyOptions = ref([]);
const guimoOptions = ref([]);
const popups = ref();
const theme = ref("");
// 打开弹窗
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

// 关闭弹窗
const closePopup = () => {
  if (popups.value) {
    popups.value.close();
  }
};

const change = () => {
  console.log("Popup state changed");
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
  std.value = true; // 重置状态为招募中
  // 重置筛选条件
  pageInfo.filterIndexPage({
    keyword: "",
    status: "招募中",
    educationalRequire: edu.value,
    majorRequire: major.value,
    gradeRequire: grade.value,
    industry: ind.value,
    type: company.value,
    scale: guimo.value,
  });
  uni.showToast({
    title: "已重置筛选条件",
    icon: "success",
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
    scale: guimo.value,
  });
  pageInfo.indexInfo.isFilter = true; 
  uni.navigateBack();
};
// 页面加载时执行的逻辑
onLoad(async () => {
  try {
    const res = await getFilterOptions();
    if (res.data.code == 1 && res.statusCode == 200) {
      const data = res.data.data;
      xueli.value = data.education.map((item) => ({
        n: item,
        f: false,
      }));
      majorOptions.value = data.major.map((item) => ({
        n: item,
        f: false,
      }));
      gradeOptions.value = data.grade.map((item) => ({
        n: item,
        f: false,
      }));
      indOptions.value = data.industry.map((item) => ({
        n: item,
        f: false,
      }));
      companyOptions.value = data.companyType.map((item) => ({
        n: item,
        f: false,
      }));
      guimoOptions.value = data.companyScale.map((item) => ({
        n: item,
        f: false,
      }));
      let ops = pageInfo.indexInfo;
      console.log("当前筛选条件:", ops);
      edu.value = ops.educationalRequire || data.education[0];
      major.value = ops.majorRequire || data.major[0];
      grade.value = ops.gradeRequire || data.grade[0];
      ind.value = ops.industry || data.industry[0];
      company.value = ops.type || data.companyType[0];
      guimo.value = ops.scale || data.companyScale[0];
      std.value = ops.status == "招募中" || ops.status == "" ? true : false;
      const markActive = (list, value) =>
        list.forEach((item) => (item.f = item.n === value));

      [
        [xueli.value, edu.value],
        [majorOptions.value, major.value],
        [gradeOptions.value, grade.value],
        [indOptions.value, ind.value],
        [companyOptions.value, company.value],
        [guimoOptions.value, guimo.value],
      ].forEach(([list, val]) => markActive(list, val));

      console.log("筛选数据初始化成功", data);
    } else {
      console.error("获取筛选数据失败:", res);
      uni.showToast({
        title: "加载数据失败",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("获取筛选数据失败:", error);
    uni.showToast({
      title: "加载数据失败",
      icon: "error",
    });
  }
});
</script>

<style lang="scss" scoped>
.kong {
  width: 100vw;
  height: 100px;
}

.title {
  display: block;
  margin-left: 10%;
  margin-top: 13px;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 23.17px;
  color: rgba(20, 74, 250, 1);
  text-align: left;
  vertical-align: top;
}

.status {
  width: 80%;
  height: 40px;
  opacity: 1;
  border-radius: 10px;
  background: rgba(240, 244, 252, 1);
  margin-left: 10%;
  display: flex;
}

.st1 {
  width: 50%;
  height: 40px;
  opacity: 1;
  border-radius: 10px;
  background: rgba(88, 127, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 23.17px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  vertical-align: top;
}

.st2 {
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 23.17px;
  color: rgba(166, 166, 166, 1);
  text-align: left;
  vertical-align: top;
}

.option {
  width: 80%;
  margin-left: 10%;
  height: 40px;
  opacity: 1;
  border-radius: 10px;
  background: rgba(240, 244, 252, 1);
  position: relative;
}

.icon {
  position: absolute;
  right: 14.5px;
  top: 50%;
  transform: translateY(-50%);
  width: 19.27px;
  height: 10px;
  opacity: 1;
}

.popup-content {
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  width: 100%;
  padding-top: 56px;
}
.items-block {
  overflow-y: auto; /* 垂直方向超出时滚动 */
  min-height: 240px;
  max-height: 500px;
}
.quxiao {
  position: absolute;
  top: 16px;
  left: 25px;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 23.17px;
  color: rgba(166, 166, 166, 1);
  text-align: left;
  vertical-align: top;
}

.queren {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 13px;
  right: 13px;
  width: 56px;
  height: 30px;
  opacity: 1;
  border-radius: 15px;
  background: rgba(79, 120, 255, 1);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 23.17px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  vertical-align: top;
}

.theme {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 16px;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 23.17px;
  color: rgba(56, 56, 56, 1);
  text-align: center;
  vertical-align: top;
}

.content {
  width: 100%;
  padding-bottom: 20px;
}

.op {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 26.06px;
  color: rgba(166, 166, 166, 1);
  text-align: center;
  vertical-align: top;
  transition: font-size 0.3s ease, color 0.3s ease;
}

.lan {
  color: rgba(79, 120, 255, 1) !important;
  font-size: 20px !important;
}

.nnn {
  color: rgba(79, 120, 255, 1);
  font-size: 18px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 25px;
}

.line {
  margin-left: 5%;
  width: 90%;
  height: 0px;
  opacity: 1;
  margin-top: 10px;
  margin-bottom: 8px;
  border: 0.5px solid rgba(229, 229, 229, 1);
}

.chong {
  width: 19.48px;
  height: 19.5px;
  opacity: 1;
  position: absolute;
  left: 20%;
  bottom: 45px;
}

.zhi {
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 26.06px;
  color: rgba(56, 56, 56, 1);
  text-align: left;
  vertical-align: top;
  position: absolute;
  left: 18%;
  bottom: 15px;
}

.res {
  position: absolute;
  right: 10%;
  bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 38px;
  opacity: 1;
  border-radius: 19px;
  background: linear-gradient(
    90deg,
    rgba(79, 120, 255, 1) 0%,
    rgba(79, 120, 255, 0.7) 100%
  );
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 26.06px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  vertical-align: top;
}

.footer {
  position: fixed;
  width: 100vw;
  min-height: 50px;
  bottom: 0;
}
</style>
