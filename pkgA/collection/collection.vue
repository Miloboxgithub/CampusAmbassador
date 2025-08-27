<template>
  <loading :show="isLoading"></loading>
  <scroll-view class="page-container" scroll-y="true">
    <view
      @click="changeTab(false)"
      class="tab1"
      :class="!activeindex ? 'tabactive' : ''"
      >校园大使</view
    >
    <view
      @click="changeTab(true)"
      class="tab2"
      :class="activeindex ? 'tabactive' : ''"
      >简历模板</view
    >
    <view class="line"></view>
    <view class="activeLine" :class="activeindex ? 'tabtrue' : ''"></view>
    <view class="items" v-if="!activeindex">
      <view
        class="item"
        v-for="(item, index) in items"
        :key="index"
        @click="navs3(item.id)"
      >
        <view class="abc" @click.stop="dianji" data-id="{{index}}"
          ><image src="../img/圆形 1.png" class="blacks" mode="" /><image
            src="../img/圆形 2.png"
            :style="{ display: item.isdian ? '' : 'none' }"
            class="blues"
            mode=""
        /></view>
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
    </view>
    <view class="ke" v-if="activeindex">
      <view class="mobans">
        <view class="moban" v-for="(item, index) in mobans" :key="index" >
          <img class="moban-img" :src="item.img" alt="" @click="navs(item.id)" />
          <view class="lined"></view>
          <view class="abcd" @click="dianji2" data-id="{{index}}"
            ><image src="../img/圆形 1.png" class="blacks" mode="" /><image
              src="../img/圆形 2.png"
              :style="{ display: item.isdian ? '' : 'none' }"
              class="blues"
              mode=""
          /></view>
          <img src="../../static/下载@2x.png" alt="" class="download" />
          <text class="sum">{{ item.sum }}</text>
          <img src="../../static/collected.png" alt="" class="collect" />
        </view>
      </view>
    </view>
  </scroll-view>
  <view class="chico" v-if="numbs != 0">
    <view style="display: flex; justify-content: space-around">
      <view class="xuan"
        ><view
          >已选<text style="color: rgba(88, 127, 255, 1)">{{ numbs }}</text
          >个{{ st }}</view
        >
        <view @click="quanxuans"
          ><image src="../img/圆形 1.png" mode="" /><image
            :style="{ display: quanxuan ? '' : 'none' }"
            class="imggg"
            src="../img/圆形 2.png"
            mode=""
          /><view style="position: absolute; left: 5vw">全选</view></view
        >
      </view>
      <view class="deletes" @click="deletes">取消收藏</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { getUserCollects, getTemplateCollects ,offCollectCampusDetail,offCollectResumeTemplate} from "@/api/index.js";
import {
  onShow,
  onLoad,
  onReachBottom,
  onPullDownRefresh,
} from "@dcloudio/uni-app";
import { pageStore } from "@/store";
import Loading from "@/components/Loading.vue";
import Login from "../../components/Login.vue";
const isLoading = ref(false);
const pageInfo = pageStore();
const activeindex = ref(false);
const numbs = ref(0);
const numbsmoban = ref(0);
const quanxuan = ref(false);
const st = ref("校园大使");
const items = ref([
  // {
  //   id: 1,
  //   name: "振石控股集团有限公司",
  //   tags: ["民营", "2000人以上", "校园大使"],
  //   type: "汽车|机械|创造",
  //   status: "招募中",
  //   coicon: "https://picsum.photos/200",
  //   look: "5000",
  //   isdian: false,
  // }
]);
const mobans = ref([
  // {
  //   img: "../../static/模板1@2x.png",
  //   sum: 5000,
  //   isdian: false,
  // },

]);
// 页面加载时执行的逻辑
onLoad(async () => {
  console.log("页面加载");
  items.value = []; // 清空 items 数组
  try {
    isLoading.value = true; // 显示加载状态
    const arr = await getUserCollects(pageInfo.collectCampusInfo);
    // const res = await getTemplateCollects(pageInfo.collectCampusInfo);
    console.log("获取用户收藏的校园大使职位数据:", arr);
    arr.forEach((e) => {
      items.value.push({
        id: e.id,
        name: e.name,
        tags: [e.type, e.scale, "校园大使"],
        type: e.industries,
        status: e.isRecruit ? "招募中" : "已结束",
        coicon: "https://api.xydsh.cn/enterpriseLogo/"+e.logo,
        look: e.pageView,
        isdian: false,
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
  pageInfo.getCollectCampusPage();
  try {
    isLoading.value = true; // 显示加载状态
    if (activeindex.value) {
      const arr = await getTemplateCollects(pageInfo.collectCampusInfo);
      console.log("获取用户收藏的简历模板数据:", arr);
      if (arr.length === 0) {
        uni.showToast({
          title: "没有更多数据了",
          icon: "none",
        });
        isLoading.value = false; // 隐藏加载状态
        pageInfo.lowCollectCampusPage();
        return;
      }
      arr.forEach((e) => {
        mobans.value.push({
          id: e.id,
          img: "https://api.xydsh.cn/img/"+e.templateSampleGraph,
          sum: e.downloadNumber,
          isdian: false,
        });
      });
    } else {
      const arr = await getUserCollects(pageInfo.collectCampusInfo);
      console.log("获取用户收藏的校园大使职位数据:", arr);
      if (arr.length === 0) {
        uni.showToast({
          title: "没有更多数据了",
          icon: "none",
        });
        isLoading.value = false; // 隐藏加载状态
        pageInfo.lowCollectCampusPage();
        return;
      }
      arr.forEach((e) => {
        items.value.push({
          id: e.id,
          name: e.name,
          tags: [e.type, e.scale, "校园大使"],
          type: e.industries,
          status: e.isRecruit ? "招募中" : "已结束",
          coicon: "https://api.xydsh.cn/enterpriseLogo/"+e.logo,
          look: e.pageView,
          isdian: false,
        });
      });
    }

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
  activeindex.value = false; // 重置为校园大使
  st.value = "校园大使";
  pageInfo.initCollectCampusInfo();
  items.value = []; // 清空 items 数组
  try {
    isLoading.value = true; // 显示加载状态
    const arr = await getUserCollects(pageInfo.collectCampusInfo);

    console.log("下拉刷新了:", arr);
    arr.forEach((e) => {
      items.value.push({
        id: e.id,
        name: e.name,
        tags: [e.type, e.scale, "校园大使"],
        type: e.industries,
        status: e.isRecruit ? "招募中" : "已结束",
        coicon: "https://api.xydsh.cn/enterpriseLogo/"+e.logo,
        look: e.pageView,
        isdian: false,
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
const changeTab = async (flag) => {
  activeindex.value = flag;
  if (flag) {
    st.value = "简历模板";
    pageInfo.initCollectCampusInfo();
    mobans.value = []; // 清空 items 数组
    try {
      isLoading.value = true; // 显示加载状态
      const arr = await getTemplateCollects(pageInfo.collectCampusInfo);

      console.log("获取用户收藏的简历模板数据:", arr);
      arr.forEach((e) => {
        mobans.value.push({
          id: e.id,
          img: "https://api.xydsh.cn/img/"+e.templateSampleGraph,
          sum: e.downloadNumber,
          isdian: false,
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
  } else {
    st.value = "校园大使";
    pageInfo.initCollectCampusInfo();
    items.value = []; // 清空 items 数组
    try {
      isLoading.value = true; // 显示加载状态
      const arr = await getUserCollects(pageInfo.collectCampusInfo);

      console.log("获取用户收藏的校园大使职位数据:", arr);
      arr.forEach((e) => {
        items.value.push({
          id: e.id,
          name: e.name,
          tags: [e.type, e.scale, "校园大使"],
          type: e.industries,
          status: e.isRecruit ? "招募中" : "已结束",
          coicon: "https://api.xydsh.cn/enterpriseLogo/"+e.logo,
          look: e.pageView,
          isdian: false,
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
  }
  items.value.forEach((item) => {
    item.isdian = false;
  });
  mobans.value.forEach((item) => {
    item.isdian = false;
  });
  numbs.value = 0;
};
const navs3 = (id) => {
  uni.navigateTo({
    url: `/pkgA/detail/detail?id=${id}`,
  });
};
const dianji = (e) => {
  const index = parseInt(e.currentTarget.dataset.id, 10); // 转换为数字
  if (items.value[index]) {
    items.value[index].isdian = !items.value[index].isdian;
    if (items.value[index].isdian) {
      numbs.value++;
    } else {
      numbs.value--;
    }
  } else {
    console.error(`Item at index ${index} is undefined`);
  }
  if (numbs.value == items.value.length) {
    quanxuan.value = true;
  } else {
    quanxuan.value = false;
  }
};
const dianji2 = (e) => {
  const index = parseInt(e.currentTarget.dataset.id, 10); // 转换为数字
  if (mobans.value[index]) {
    mobans.value[index].isdian = !mobans.value[index].isdian;
    if (mobans.value[index].isdian) {
      numbs.value++;
    } else {
      numbs.value--;
    }
  } else {
    console.error(`Item at index ${index} is undefined`);
  }
  if (numbs.value == mobans.value.length) {
    quanxuan.value = true;
  } else {
    quanxuan.value = false;
  }
};
function quanxuans() {
  quanxuan.value = !quanxuan.value;
  if (quanxuan.value) {
    if (st.value == "校园大使") {
      items.value.forEach((item) => {
        item.isdian = true;
      });
      numbs.value = items.value.length;
    }
    if (st.value == "简历模板") {
      mobans.value.forEach((item) => {
        item.isdian = true;
      });
      numbs.value = mobans.value.length;
    }
    
  } else {
    items.value.forEach((item) => {
      item.isdian = false;
    });
    mobans.value.forEach((item) => {
      item.isdian = false;
    });
    numbs.value = 0;
  }
}
async function deletes() {
  isLoading.value = true; // 显示加载状态
  if (st.value == "校园大使") {
    for (let i = 0; i < items.value.length; i++) {
      if (items.value[i].isdian) {
        await offCollectCampusDetail(items.value[i].id);
      }
    }
    items.value = items.value.filter((item) => !item.isdian);
  } else {
    for (let i = 0; i < mobans.value.length; i++) {
      if (mobans.value[i].isdian) {
        await offCollectResumeTemplate(mobans.value[i].id);
      }
    }
    mobans.value = mobans.value.filter((item) => !item.isdian);
  }
  items.value.forEach((item) => {
    item.isdian = false;
  });
  mobans.value.forEach((item) => {
    item.isdian = false;
  });
  numbs.value = 0;
  uni.showToast({
    title: "取消成功",
    icon: "success",
    image: "",
    duration: 1500,
    mask: false,
    success: (result) => {},
    fail: () => {},
    complete: () => {},
  });
  isLoading.value = false; // 隐藏加载状态
}

const navs = (id) => {
  uni.navigateTo({
    url: `/pkgA/preview/preview?id=${id}`,
  });
};
</script>

<style lang="scss" scoped>
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
.activeLine {
  position: absolute;
  top: 43px;
  left: 27%;
  width: 26px;
  height: 0px;
  opacity: 1;
  border: 2px solid rgba(88, 127, 255, 1);
  z-index: 100;
  transition: all 0.2s linear;
}
.tabtrue {
  left: calc(73% - 26px);
}
.tab1 {
  position: absolute;
  top: 6px;
  height: 24px;
  padding: 10px 0;
  left: 22%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 1.6px;
  color: rgba(128, 128, 128, 1);
  text-align: left;
  vertical-align: middle;
  transition: all 0.2s linear;
}

.tab2 {
  position: absolute;
  top: 6px;
  height: 24px;
  padding: 10px 0;
  right: 22%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 1.6px;
  color: rgba(128, 128, 128, 1);
  text-align: left;
  vertical-align: middle;
  transition: all 0.2s linear;
}
.tabactive {
  font-weight: 700;
  color: rgba(0, 0, 0, 1);
}
.line {
  position: absolute;
  top: 45px;
  width: 100vw;
  height: 0px;
  opacity: 1;
  border: 0.3px solid rgba(229, 229, 229, 1);
}
.items {
  position: absolute;
  top: 55px;
  width: 100vw;
  height: auto;
  padding-bottom: 20px;
  background: rgb(245, 245, 245);
}

.item {
  position: relative;
  width: 94%;
  margin-left: 3%;
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
  top: 22px;

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
  top: 45px;
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
  top: 71px;
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
  top: 69px;
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
  top: 17px;
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
  bottom: 8px;
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
  bottom: 10px;
}
.abc {
  position: absolute;
  left: 12px;
  top: 5px;
  width: 50px;
  height: 50px;
  z-index: 100;
}
.abcd {
  position: absolute;
  left: 7px;
  bottom: 7px;
  width: 100px;
  height: 14px;
  z-index: 100;
}
.blacks {
  width: 14px;
  height: 14px;
}
.blues {
  position: relative;
  right: 12px;
  bottom: 2px;
  width: 10px;
  height: 10px;
}
.chico {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 80px;
  background: rgba(255, 255, 255, 1);
}
.deletes {
  width: 97px;
  height: 34px;
  opacity: 1;
  border-radius: 17px;
  background: rgba(255, 255, 255, 1);
  border: 1.5px solid rgba(88, 127, 255, 1);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 20.27px;
  color: rgba(88, 127, 255, 1);
  text-align: center;
  vertical-align: top;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-left: 5px;
}
.xuan {
  position: relative;
  left: 0;
}
.xuan > view:first-child {
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 14.48px;
  color: rgba(128, 128, 128, 1);
  margin-top: 5px;
}
.xuan > view:nth-child(2) {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 17.38px;
  color: rgba(25, 25, 25, 1);
  text-align: justify;
  vertical-align: top;
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.xuan > view:nth-child(2) image {
  width: 14px;
  height: 14px;
}
.xuan > view:nth-child(2) .imggg {
  width: 10px;
  height: 10px;
  position: relative;
  right: 12px;
}
.ke {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 92vw;
  top: 55px;
  padding-bottom: 30px;
}

.typed {
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

.lined {
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
  left: 24px;
  bottom: 5.5px;
  width: 12px;
  height: 12px;
  opacity: 1;
}

.sum {
  position: absolute;
  left: 40px;
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
</style>
