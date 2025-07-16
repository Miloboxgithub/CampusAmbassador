<template>
  <loading :show="isLoading"></loading>
  <view class="page-container">
    <view class="theme">校园大使汇</view>
    <view class="search" @click="navs1">
      <img src="../../static/搜索@2x.png" alt="" />
      <view class="shu"></view>
      <input type="text" placeholder="请输入搜索内容" />
    </view>
    <img class="kouhao" src="../../static/口号图片.png@2x.png" alt="" />
    <view class="jump">
      <view class="dashi">
        <view class="zizi">实习大全</view>
        <view class="zizizi">更多机会，更优选择</view>
        <image src="../../static/dashi.svg" mode="" class="imim" />
      </view>
      <view class="neitui">
        <view class="zizi">内推码</view>
        <view class="zizizi">内推码，求职快人一步</view>
        <image src="../../static/neitui .svg" mode="" class="imim" />
      </view>
    </view>
    <view class="screen" @click="navs2">
      <view> 筛选 </view>
      <img src="../../static/筛选@2x.png" alt="" />
    </view>
    <view class="items">
      <view
        class="item"
        v-for="item in items"
        :key="item.id"
        @click="navs3(item.id)"
      >
        <view class="name">{{ item.name }}</view>
        <view class="tags">
          <view class="tag" v-for="tag in item.tags" :key="tag">
            {{ tag }}
          </view>
        </view>
        <img class="icon" src="../../static/行业@2x.png" alt="" />
        <text class="type">{{ item.type }}</text>
        <text class="status" :class="{ ended: item.status === '已结束' }">{{
          item.status
        }}</text>
        <view class="coicon">
          <img :src="item.coicon" alt="aspectFit" />
        </view>
        <img src="../../static/浏览@2x.png" alt="" class="eye" />
        <text class="look">{{ item.look }}</text>
      </view>
      <view class="kong">
        <text>~已经到底啦~</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { onShow, onLoad, onReachBottom ,onPullDownRefresh} from "@dcloudio/uni-app";
import { getCampusByPage, getCampusDetail } from "@/api/index.js";
import { pageStore } from "@/store";
import Loading from "../../components/Loading.vue";
const isLoading = ref(false);
const pageInfo = pageStore();
const items = ref([
  {
    id: 1,
    name: "振石控股集团有限公司",
    tags: ["民营", "2000人以上", "校园大使"],
    type: "汽车|机械|创造",
    status: "招募中",
    coicon: "https://picsum.photos/200",
    look: "5000",
  },
]);
// 页面加载时执行的逻辑
onLoad(async () => {
  console.log("页面加载");
  items.value = []; // 清空 items 数组
  try {
    isLoading.value = true; // 显示加载状态
    const arr = await getCampusByPage(pageInfo.indexInfo);

    console.log("获取到的校园大使数据:", arr);
    arr.forEach((e) => {
      items.value.push({
        id: e.id,
        name: e.name,
        tags: [e.type, e.scale, "校园大使"],
        type: e.industries,
        status: e.isRecruit ? "招募中" : "已结束",
        coicon: "https://picsum.photos/200",
        look: e.pageView,
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

onShow(async () => {
  // 页面显示时执行的逻辑
  console.log("页面显示");
});
// 监听触底事件
onReachBottom(async () => {
  pageInfo.getNewPage();
  console.log("触底了", pageInfo.indexInfo);
  try {
    isLoading.value = true; // 显示加载状态
    const arr = await getCampusByPage(pageInfo.indexInfo);
    console.log("获取到的校园大使数据:", arr);
    if (arr.length === 0) {
      uni.showToast({
        title: "没有更多数据了",
        icon: "none",
      });
      isLoading.value = false; // 隐藏加载状态
      pageInfo.lowPage();
      return;
    }
    arr.forEach((e) => {
      items.value.push({
        id: e.id,
        name: e.name,
        tags: [e.type, e.scale, "校园大使"],
        type: e.industries,
        status: e.isRecruit ? "招募中" : "已结束",
        coicon: "https://picsum.photos/200",
        look: e.pageView,
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
onPullDownRefresh(async()=>{
  console.log('下拉刷新了')
  pageInfo.initIndexInfo();
  items.value = []; // 清空 items 数组
  try {
    isLoading.value = true; // 显示加载状态
    const arr = await getCampusByPage(pageInfo.indexInfo);

    console.log("获取到的校园大使数据:", arr);
    arr.forEach((e) => {
      items.value.push({
        id: e.id,
        name: e.name,
        tags: [e.type, e.scale, "校园大使"],
        type: e.industries,
        status: e.isRecruit ? "招募中" : "已结束",
        coicon: "https://picsum.photos/200",
        look: e.pageView,
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
})

const navs1 = () => {
  uni.navigateTo({
    url: "/pkgA/search/search",
  });
};
const navs2 = () => {
  uni.navigateTo({
    url: "/pkgA/screen/screen",
  });
};
const navs3 = (id) => {
  uni.navigateTo({
    url: `/pkgA/detail/detail?id=${id}`,
  });
};
</script>

<style lang="scss" scoped>
.page-container {
  background: linear-gradient(to bottom, #dbe8ff, #f5f5f5 50%);
  backdrop-filter: blur(87px);
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

.search {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100px;
  width: 90%;
  height: 34px;
  opacity: 1;
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
}

.jump {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 288px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.kouhao {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 141px;
  width: 90%;
  height: 139.85px;
  opacity: 1;
}

.dashi {
  /* left: 16px;
top: 274px; */
  position: relative;
  width: 48%;
  height: 55px;
  opacity: 1;
  border-radius: 8px;
  background: linear-gradient(
    180deg,
    rgba(72, 103, 230, 1) 0%,
    rgba(82, 119, 233, 1) 26.16%,
    rgba(95, 138, 237, 1) 49.61%,
    rgba(111, 162, 241, 1) 72.15%,
    rgba(129, 189, 246, 1) 98.2%,
    rgba(59, 146, 245, 0) 100%
  );
}

.neitui {
  position: relative;
  width: 48%;
  height: 55px;
  opacity: 1;
  border-radius: 8px;
  background: linear-gradient(
    180deg,
    rgba(248, 134, 68, 1) 0%,
    rgba(251, 164, 86, 1) 50.85%,
    rgba(254, 194, 104, 1) 100%
  );
}

.zizi {
  position: absolute;
  left: 15px;
  top: 9px;
  width: 80px;
  height: 24px;
  opacity: 1;
  /** 文本1 */
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 23.17px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  vertical-align: top;
}

.zizizi {
  position: absolute;
  left: 15px;
  top: 33px;
  width: 100px;
  height: 15px;
  opacity: 1;
  /** 文本1 */
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 14.48px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
  vertical-align: top;
}

.imim {
  position: absolute;
  right: 16px;
  top: 11.5px;
  width: 27.82px;
  height: 33.74px;
  opacity: 1;
  /* transform: rotate(15deg); */
}

.screen {
  position: absolute;
  right: 5%;
  top: 351px;
  width: 55px;
  height: 20px;
  opacity: 1;
  border-radius: 12.5px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 15.93px;
  color: rgba(56, 56, 56, 0.8);
  text-align: left;
  vertical-align: top;
}

.screen image {
  width: 12px;
  height: 12px;
  margin-left: 2px;
}

.items {
  position: absolute;
  top: 379px;
  width: 100vw;
  height: auto;
  padding-bottom: 20px;
}

.item {
  position: relative;
  width: 90%;
  margin-left: 5%;
  height: 112px;
  opacity: 1;
  border-radius: 15px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 8px;
}

.kong {
  width: 100vw;
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
  font-weight: 400;
  color: rgb(143, 141, 141);
}

.name {
  position: absolute;
  left: 18px;
  top: 13px;

  opacity: 1;
  /** 文本1 */
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 20.27px;
  color: rgba(56, 56, 56, 1);
  text-align: left;
  vertical-align: top;
}

.tags {
  position: absolute;
  left: 18px;
  top: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tags > .tag:nth-child(1) {
  background: rgba(255, 224, 194, 1);
  color: rgba(212, 106, 0, 1);
}

.tags > .tag:nth-child(2) {
  background: rgba(249, 255, 194, 1);
  color: rgba(166, 184, 11, 1);
}

.tags > .tag:nth-child(3) {
  background: rgba(255, 224, 254, 1);
  color: rgba(176, 33, 171, 1);
}

.tag {
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5px 7px;
  height: 14px;
  opacity: 1;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 15.93px;
  text-align: center;
  vertical-align: top;
}

.icon {
  position: absolute;
  left: 18px;
  top: 62px;
  width: 12px;
  height: 12px;
}

.type {
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 15.93px;
  color: rgba(56, 56, 56, 1);
  text-align: left;
  vertical-align: top;
  position: absolute;
  left: 37px;
  top: 60px;
}

.status {
  position: absolute;
  left: 18px;
  bottom: 10px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 15.83px;
  color: rgba(77, 100, 179, 1);
  text-align: left;
  vertical-align: top;
}

.coicon {
  position: absolute;
  right: 10px;
  top: 12px;
  width: 63px;
  height: 63px;
  opacity: 1;
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(166, 166, 166, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.coicon image {
  width: 100%;
  height: 100%;
}

.eye {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 48px;
  bottom: 13px;
}

.look {
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 11.58px;
  color: rgba(56, 56, 56, 0.86);
  text-align: left;
  vertical-align: top;
  position: absolute;
  right: 26px;
  bottom: 15px;
}

.ended {
  color: rgba(153, 151, 151, 1) !important;
}

.search image {
  position: absolute;
  top: 4px;
  left: 11.67px;
  width: 26.13px;
  height: 27px;
  opacity: 1;
}

.shu {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 42.58px;
  width: 15px;
  height: 0px;
  opacity: 1;
  transform: rotate(90deg);

  border: 0.5px solid rgba(0, 0, 0, 0.6);
}

.search input {
  position: absolute;
  left: 72px;
  top: 6px;
  width: 260px;
  height: 22px;
  opacity: 1;
  /** 文本1 */
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 21.72px;
  text-align: left;
  vertical-align: top;
}

.search input::placeholder {
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 21.72px;
  color: rgba(56, 56, 56, 0.4);
  text-align: left;
  vertical-align: top;
}
</style>
