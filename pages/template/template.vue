<template>
  <loading :show="isLoading"></loading>
  <view class="page-container">
    <view class="theme">简历模板</view>
    <img class="tu1" src="../../static/Vertical@2x.png" alt="" />
    <img class="tu2" src="../../static/_recruitment@2x.png" alt="" />
    <img class="tu3" src="../../static/简历制作神器@2x.png" alt="" />
    <text class="tu4">— — 丰富模版 · 文档编辑 · 实时预览 · 免费下载 — — </text>
    <view class="Rolled-Class" v-if="isRolled">
        <view class="theme">简历模板</view>
      <view style="width: 92%;margin-left: 4%; display: flex; justify-content: space-between; position: absolute;top: 100px;">
        <view
          class="type"
          :class="{ activeType: item.flag }"
          v-for="(item, index) in types"
          :key="index"
          @click="changeType(item)"
          >{{ item.name }}</view
        >
      </view>
    </view>
    <view class="ke">
      <view style="width: 100%; display: flex; justify-content: space-between;">
        <view
          class="type"
          :class="{ activeType: item.flag }"
          v-for="(item, index) in types"
          :key="index"
          @click="changeType(item)"
          >{{ item.name }}</view
        >
      </view>

      <view class="mobans">
        <view
          class="moban"
          v-for="(item, index) in mobans"
          :key="index"
          @click="navs(item.id)"
        >
          <img class="moban-img" :src="item.img" alt="" />
          <view class="line"></view>
          <img src="../../static/下载@2x.png" alt="" class="download" />
          <text class="sum">{{ item.sum }}</text>
          <img :src="item.isCollected ? '../../static/collected.png' : '../../static/collect.png'" alt="" class="collect" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import {
  onShow,
  onLoad,
  onReachBottom,
  onPullDownRefresh,
  onPageScroll,
  onShareAppMessage
} from "@dcloudio/uni-app";
import { getResumeTemplate } from "@/api/index.js";
import { pageStore } from "@/store";
import Loading from "../../components/Loading.vue";
const isLoading = ref(true);
const pageInfo = pageStore();
const types = ref([
  {
    name: "通用",
    flag: true,
  },
  {
    name: "简约",
    flag: false,
  },
  {
    name: "现代",
    flag: false,
  },
  {
    name: "经典",
    flag: false,
  },
  {
    name: "创意",
    flag: false,
  },
  {
    name: "专业",
    flag: false,
  },
  {
    name: "英文",
    flag: false,
  },
]);
const mobans = ref([
  // {
  //   img: "../../static/模板1@2x.png",
  //   sum: 5000,
  //   isCollected: false,
  // },
]);
const isRolled = ref(false);
// 页面加载时执行的逻辑
onLoad(async () => {
  console.log("页面加载");
  mobans.value = []; // 清空 items 数组
  try {
    isLoading.value = true; // 显示加载状态
    const arr = await getResumeTemplate(pageInfo.templateInfo);

    console.log("获取到的简历模板数据:", arr);
    arr.forEach((e) => {
      mobans.value.push({
        id: e.id,
        img: "https://api.xydsh.cn/img/"+e.templateSampleGraph,
        sum: e.downloadNumber,
        isCollected: e.isFavorite, // 添加收藏状态
      });
    });
    isLoading.value = false; // 隐藏加载状态
  } catch (error) {
    console.error("获取数据失败:", error);
    isLoading.value = false; // 隐藏加载状态
    uni.showToast({
      title: "加载数据失败",
      icon: "error",
    });
  }
});
onShow(() => {
  // 页面显示时执行的逻辑
  console.log("页面显示");
});
// 监听触底事件
onReachBottom(async () => {
  pageInfo.getTemplatePage();
  console.log("触底了", pageInfo.templateInfo);
  try {
    isLoading.value = true; // 显示加载状态
    const arr = await getResumeTemplate(pageInfo.templateInfo);
    console.log("获取到的更多简历模板数据:", arr);
    if (arr.length === 0) {
      uni.showToast({
        title: "没有更多数据了",
        icon: "none",
      });
      isLoading.value = false; // 隐藏加载状态
      pageInfo.lowTemplatePage();
      return;
    }
    arr.forEach((e) => {
      mobans.value.push({
        id: e.id,
        img: "https://api.xydsh.cn/img/"+e.templateSampleGraph|| "https://picsum.photos/400", // 如果没有图片则使用默认图片
        sum: e.downloadNumber,
        isCollected: e.isFavorite, // 添加收藏状态
      });
    });
    isLoading.value = false; // 隐藏加载状态
  } catch (error) {
    console.error("获取数据失败:", error);
    isLoading.value = false; // 隐藏加载状态
    uni.showToast({
      title: "加载数据失败",
      icon: "error",
    });
  }
});

onPullDownRefresh(async () => {
  console.log("下拉刷新了");
  pageInfo.initTemplateInfo();
  mobans.value = []; // 清空 items 数组
  try {
    isLoading.value = true; // 显示加载状态
    const arr = await getResumeTemplate(pageInfo.templateInfo);

    console.log("获取到的简历模板数据:", arr);
    arr.forEach((e) => {
      mobans.value.push({
        id: e.id,
        img: "https://api.xydsh.cn/img/"+e.templateSampleGraph,
        sum: e.downloadNumber,
        isCollected: e.isFavorite, // 添加收藏状态
      });
    });
    isLoading.value = false; // 隐藏加载状态
    uni.stopPullDownRefresh();
  } catch (error) {
    console.error("获取数据失败:", error);
    isLoading.value = false; // 隐藏加载状态
    uni.showToast({
      title: "加载数据失败",
      icon: "error",
    });
    uni.stopPullDownRefresh();
  }
});
onPageScroll((e) => {
  console.log(e.scrollTop);
  if (e.scrollTop > 220) {
    isRolled.value = true;
  } else {
    isRolled.value = false;
  }
});
const navs1 = () => {
  uni.navigateTo({
    url: "/pkgA/search/search",
  });
};
const changeType = async (i) => {
  types.value.forEach((item) => {
    item.flag = false;
  });
  i.flag = true;
  pageInfo.filterTemplatePage({
    type: i.name,
  });
  mobans.value = []; // 清空 items 数组
  try {
    isLoading.value = true; // 显示加载状态
    const arr = await getResumeTemplate(pageInfo.templateInfo);

    console.log("获取到的新简历模板数据:", arr);
    arr.forEach((e) => {
      mobans.value.push({
        id: e.id,
        img: "https://api.xydsh.cn/img/"+e.templateSampleGraph||"https://picsum.photos/400",
        sum: e.downloadNumber,
        isCollected: e.isFavorite, // 添加收藏状态
      });
    });
    isLoading.value = false; // 隐藏加载状态
  } catch (error) {
    console.error("获取数据失败:", error);
    isLoading.value = false; // 隐藏加载状态
    uni.showToast({
      title: "加载数据失败",
      icon: "error",
    });
  }
};
const navs = (id) => {
  uni.navigateTo({
    url: `/pkgA/preview/preview?id=${id}`,
  });
};
onShareAppMessage(() => {
  return {
    title: "发现一个简历模板免费下载的神器！",
    path: "/pages/template/template",
  };
});
</script>

<style lang="scss" scoped>
.page-container {
  background: linear-gradient(to bottom, #dbe8ff, #ffffff 50%);
  // backdrop-filter: blur(87px);
  height: 120vh;
  /* 使用视口高度确保填充整个页面 */
  width: 100vw;
  /* 使用视口宽度确保填充整个页面 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.theme {
  position: absolute;
  z-index: 9999;
  left: 50%;
  transform: translateX(-50%);
  top: 53.79px;
  width: 90px;
  height: 27px;
  opacity: 0.9;
  /** 文本1 */
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 26.06px;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  vertical-align: top;
}

.tu1 {
  position: absolute;
  left: 31px;
  top: 99px;
  width: 114px;
  height: 28px;
  opacity: 1;
  /** 文本1 */
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 31.13px;
  color: rgba(0, 79, 168, 1);
  text-align: left;
  vertical-align: top;
}

.tu2 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 127px;
  width: 134px;
  height: 24px;
  opacity: 1;
  /** 文本1 */
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 24.91px;
  color: rgba(2, 85, 181, 1);
  text-align: left;
  vertical-align: top;
}

.tu3 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 155px;
  width: 198px;
  height: 41px;
  opacity: 1;
  /** 文本1 */
  font-size: 32px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 38.4px;
  color: rgba(0, 79, 168, 1);
  text-align: left;
  vertical-align: top;
}

.tu4 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 203px;
  width: 320px;
  height: 13px;
  opacity: 1;
  /** 文本1 */
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 15.93px;
  color: rgba(112, 122, 128, 1);
  text-align: center;
  vertical-align: top;
}

.ke {
  
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding-left: 4vw;
  padding-right: 4vw;
  width: 92vw;
  top: 240px;
  padding-bottom: 30px;

}

.type {
  width: 46px;
  height: 24px;
  opacity: 1;
  border-radius: 12.5px;
  background: rgb(255, 255, 255);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0px;
  color: rgb(0, 0, 0);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activeType {
  background: rgba(79, 120, 255, 1);
  color: rgba(255, 255, 255, 1);
}

.mobans {

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.moban {
  width: 48%;
  margin-top: 12px;
  height: 261.51px;
  opacity: 1;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.line {
  position: absolute;
  bottom: 22px;
  top: 239.52px;
  width: 100%;
  height: 0px;
  opacity: 1;
  border: 0.01px solid rgba(0, 0, 0, 0.3);
}

.moban-img {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 5px;
  width: 96%;
  height: 231px;
  opacity: 1;
}

.download {
  position: absolute;
  left: 14px;
  bottom: 5.5px;
  width: 12px;
  height: 12px;
  opacity: 1;
}

.sum {
  position: absolute;
  left: 31px;
  bottom: 5.5px;
  font-size: 7px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 10.14px;
  color: rgba(67, 79, 120, 1);
  text-align: left;
  vertical-align: top;
}

.collect {
  position: absolute;
  width: 11px;
  height: 11px;
  right: 13px;
  bottom: 5.5px;
}
.Rolled-Class {
  background: linear-gradient(to bottom, #dbe8ff, #f5f5f5 150%);
  z-index: 9999;
  position: fixed;
  top: 0;
  height: 135px;
  width: 100vw;
  /* 你原来已有的样式 … */
  transition: opacity 0.3s, transform 0.3s; /* 兜底：如果浏览器不支持 animation */
  animation: fadeIn 0.3s ease-out forwards; /* 淡入动画 */
}
/* 1. 关键帧：淡入 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* 3. 出现时才让 opacity 变 1 */
.Rolled-Class[style*="display: block"],
.Rolled-Class[style*="display: flex"] {
  opacity: 1;
  pointer-events: auto;
}
</style>
