<template>
  <loading :show="isLoading"></loading>
  <scroll-view class="page-container" scroll-y="true">
    <!-- 搜索栏 -->
    <view class="theme">搜索</view>
    <view style="display: flex; justify-content: center; margin-top: 105px">
      <view class="navv">
        <view class="search">
          <image @click="inputed" src="../img/搜索.png" mode="" />
        </view>
        <view class="fancy-bg"></view>
        <input
          type="text"
          @confirm="inputed"
          class="input"
          :placeholder="contents"
          auto-focus="true"
          v-model="msg"
          id="search"
        />
        <image
          class="guan"
          src="../img/cha1.png"
          @click="clear"
          hover-stop-propagation="true"
          mode=""
        />
      </view>
    </view>
    <view class="syl" v-if="flag"
      >搜索历史
      <image @click="shanchu" class="shanchu" src="../img/shachu.png" mode="" />
    </view>
    <view class="kuai" v-if="flag">
      <view
        class="items"
        v-for="(item, index) in items"
        :key="index"
        @click="shang"
        data-s="{{item}}"
      >
        <text>{{ item }}</text>
      </view>
    </view>
    <!-- <view class="screen" @click="navs2">
			<view> 筛选 </view>
			<img src="../../static/筛选@2x.png" alt="" />
		</view> -->
    <view class="coitems">
      <view
        class="item"
        v-for="item in coitems"
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
      <!-- <view class="kong">
        <text>~已经到底啦~</text>
      </view> -->
    </view>
  </scroll-view>
  <view class="nono" v-if="!flag">
    <image src="../img/搜索1.png" mode="" />
    <text>
      当前未找到与关键词相关的内容，建议您调整搜索词或尝试其他关键词。
    </text>
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import {
  onShow,
  onLoad,
  onReachBottom,
  onPullDownRefresh,
  onShareAppMessage,
} from "@dcloudio/uni-app";
import { getCampusByPage, getCampusDetail } from "@/api/index.js";
import { pageStore } from "@/store";
import Loading from "../../components/Loading.vue";
const isLoading = ref(false);
const pageInfo = pageStore();
const flag = ref(true);
const contents = ref("请输入搜索内容");
const items = ref([]);
const coitems = ref([
  //   {
  //     id: 1,
  //     name: "振石控股集团有限公司",
  //     tags: ["民营", "2000人以上", "校园大使"],
  //     type: "汽车|机械|创造",
  //     status: "招募中",
  //     coicon: "https://picsum.photos/200",
  //     look: "5000",
  //   },
]);
const msg = ref("");
const inputed = async (e) => {
  console.log(msg.value);
  if (msg.value === "") {
    uni.showToast({
      title: "请输入搜索内容",
      icon: "error",
    });
    flag.value = true;
    return;
  }
  // 1. 先删除已存在的
  const idx = items.value.indexOf(msg.value);
  if (idx > -1) items.value.splice(idx, 1);

  // 2. 追加到末尾
  items.value.push(msg.value);

  // 3. 超过 10 条时删除最旧
  if (items.value.length > 20) items.value.shift();

  isLoading.value = true;
  const res = await getCampusByPage({
    page: 1,
    pageSize: 100,
    keyword: msg.value,
  });
  if (res.length === 0) {
    coitems.value = [];
    flag.value = false;
    isLoading.value = false;
    return;
  }
  flag.value = true;
  // 清空之前的结果
  coitems.value = [];
  // 遍历结果并添加到 coitems
  res.forEach((e) => {
    coitems.value.push({
      id: e.id,
      name: e.name,
      tags: [e.type, e.scale, "校园大使"],
      type: e.industries,
      status: e.isRecruit ? "招募中" : "已结束",
      coicon: "https://api.xydsh.cn/enterpriseLogo/"+e.logo,
      look: e.pageView,
    });
  });
  isLoading.value = false;
};
const clear = () => {
  msg.value = "";
  flag.value = true;
};
const shang = (e) => {
  console.log(e.currentTarget.dataset.s.a);
  msg.value = e.currentTarget.dataset.s.a;
  inputed();
};
const shanchu = () => {
  uni.showModal({
    content: "确定清除所有记录吗?", // 对话框内容
    showCancel: true, // 是否显示取消按钮
    success: (res) => {
      if (res.confirm) {
        items.value = [];
      } else if (res.cancel) {
      }
    },
  });
};
watch(
  items,
  (newVal) => {
    uni.setStorageSync("myItems", JSON.stringify(newVal));
  },
  { deep: true } // 数组内部变化也触发
);
onShow(() => {
  // 页面显示时加载数据
  const storedItems = uni.getStorageSync("myItems");
  if (storedItems) {
    items.value = JSON.parse(storedItems);
  }
});
onPullDownRefresh(async () => {
  console.log("下拉刷新了");
  flag.value = true;
  uni.stopPullDownRefresh();
});
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
  height: 100vh;
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
  margin-left: 2.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search image {
  height: 27px;
  width: 27px;

  margin-left: 5px;
}

.fancy-bg {
  margin-left: 1vw;
  width: 0.9px;
  height: 17px;
  background-color: rgba(0, 0, 0, 0.6);
}

.input {
  width: 70%;
  margin-left: 25px;
  margin-right: 50px;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 1.5px;
  line-height: 21.72px;
  color: rgb(0, 0, 0) !important;
  vertical-align: top;
}

.shanchu {
  position: absolute;
  width: 15px;
  height: 16px;
  opacity: 1;
  right: 26px;
  padding: 5px;
}

.navv {
  width: 92vw;
  height: 34px;
  border-radius: 17px;
  background: rgba(245, 245, 245, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.syl {
  position: relative;
  margin-top: 1vh;
  margin-left: 7vw;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 21.72px;
  color: rgba(56, 56, 56, 1);
  vertical-align: top;
}

.kuai {
  margin-left: 7vw;
  display: flex;
  flex-wrap: wrap;
}

.items {
  margin-top: 1vh;
  border-radius: 15px;
  background: rgba(255, 255, 255, 1);
  height: 24px;
  border: 0.5px solid rgba(229, 229, 229, 1);
  margin-right: 8px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 17.38px;
  color: rgba(79, 79, 79, 1);
  text-align: left;
  vertical-align: top;
  display: flex;
  align-items: center;
  padding: 1px 8px 1px 8px;
}

.items text {
  margin-left: 3px;
  margin-right: 3px;
}

.nono image {
  position: absolute;

  left: 50%;
  transform: translateX(-50%);
  top: 30%;
  width: 66px;
  height: 68.2px;
  opacity: 1;
}

.nono text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 40%;
  width: 221px;
  height: 38px;
  opacity: 1;
  /** 文本1 */
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 18.82px;
  color: rgba(128, 128, 128, 1);
  text-align: justify;
  vertical-align: top;
}

.guan {
  
  right: 20px;
  z-index: 100;
  width: 18.5px;
  height: 18.5px;
  padding: 10px;
  opacity: 1;
  z-index: 1000;
}
.coitems {
  margin-top: 20px;
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
</style>
