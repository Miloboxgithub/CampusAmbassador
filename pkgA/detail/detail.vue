<template>
  <loading :show="isLoading"></loading>
  <resumeModal
    :show="isModal"
    @update:show="(v) => (isModal = v)"
    @go="navigateToResumePage"
  ></resumeModal>
  <view class="content">
    <view class="theme">{{ name }}</view>
    <view class="tags">
      <view class="tag" v-for="tag in tags" :key="tag">
        {{ tag }}
      </view>
    </view>
    <img class="icon" src="../../static/行业@2x.png" alt="" />
    <text class="type">{{ type }}</text>
    <text class="status" :class="{ ended: status === '已结束' }">{{
      status
    }}</text>
    <view class="coicon">
      <img :src="coicon" alt="aspectFit" />
    </view>
    <view class="details">
      <view class="detailed">
        <view class="kuai"></view>
        <text class="title">你的任务</text>
        <view class="msg">
          {{ task }}
        </view>
      </view>
      <view class="detailed">
        <view class="kuai"></view>
        <text class="title">你将收获</text>
        <view class="msg">
          {{ harvest }}
        </view>
      </view>
      <view class="detailed">
        <view class="kuai"></view>
        <text class="title">期望你是</text>
        <view class="msg">
          {{ expect }}
        </view>
      </view>
      <view class="detailed">
        <view class="kuai"></view>
        <text class="title">目标院校</text>
        <view class="msg">
          {{ target }}
        </view>
      </view>
      <view class="detailed">
        <view class="kuai"></view>
        <text class="title">公司介绍</text>
        <view class="msg">
          {{ introduce }}
        </view>
      </view>
      <view class="infoview">
        *信息来自企业官方，由人工整理发布，如有问题请联系我们。
      </view>
      <view class="infoview" style="margin-top: 3px;">
        <img class="infoimg" src="../img/SiShieldTipFill.svg" alt="" />安全提示：如您发现用人单位或招聘人员存在违规行为，包括但不限于扣押求职者证件、收取求职者财务、强迫求职者集资或入股、诱导求职者异地入职、其他损害求职者权益行为，请立即向平台举报。
      </view>
      
    </view>
  </view>

  <view class="footer">
    <button open-type="share" class="btns">
      <img src="../../static/share.png" alt="" class="share" /></button
    ><text class="ss">分享</text>
    <img
      :src="
        isCollected ? '../../static/collected.png' : '../../static/collect.png'
      "
      @click="collectsClick"
      alt=""
      class="collects"
    />
    <text class="cc">收藏</text>
    <view @click="submits" :class="status === '已结束' ? 'endBtn' : 'btn'">
      {{ status === "已结束" ? "已结束" : submited ? "已投递" : "投递简历" }}
    </view>
  </view>
  <uni-popup ref="popups" type="bottom" mask="true" @change="change">
    <view class="popup-content">
      <Login
        :show="showLogin"
        @loginSuccess="handleLoginSuccess"
        @hideLoginView="handleClose"
      />
    </view>
  </uni-popup>
</template>

<script setup>
import { ref, onMounted, h } from "vue";
import {
  onShow,
  onLoad,
  onReachBottom,
  onShareAppMessage,
} from "@dcloudio/uni-app";
import {
  getCampusByPage,
  getCampusDetail,
  postCampusApply,
  collectCampusDetail,
  offCollectCampusDetail,
} from "@/api/index.js";
import { pageStore } from "@/store";
import Loading from "@/components/Loading.vue";
import Login from "../../components/Login.vue";
import resumeModal from "@/components/resumeModal.vue";
const isLoading = ref(false);
const isModal = ref(false);
const id = ref(null);
const hasResume = ref(false); // 是否有简历
const pageState = pageStore();
onLoad(async (option) => {
  isLoading.value = true; // 显示加载状态
  id.value = option.id; // 获取传递的 id
  console.log("接收到的 id:", id.value);
  const res = await getCampusDetail(id.value);
  console.log("获取到的详情:", res);
  if (res.statusCode === 200) {
    let deta = res.data.data;
    tags.value = [deta.type, deta.scale, "校园大使"];
    type.value = deta.industries || "未知类型";
    status.value = deta.isRecruit ? "招募中" : "已结束";
    coicon.value =
      "https://api.xydsh.cn/enterpriseLogo/" + deta.logo ||
      "https://picsum.photos/200"; // 默认图片
    name.value = deta.name || "未知名称";
    task.value = deta.task || "暂无任务信息";
    harvest.value = deta.harvest || "暂无收获信息";
    expect.value = deta.expected || "暂无期望信息";
    target.value = deta.targetCollege || "暂无目标院校信息";
    introduce.value = deta.description || "暂无公司介绍";
    isLoading.value = false; // 隐藏加载状态
    isCollected.value = deta.isFavorite || false; // 设置收藏状态
    submited.value = deta.isDelivered || false; // 设置投递状态
    hasResume.value = deta.hasResume || false; // 设置是否有简历
    if (pageState.isNavResume) pageState.changeNavResume(false);
  } else {
    isLoading.value = false; // 隐藏加载状态
    uni.showToast({
      title: "获取详情失败",
      icon: "error",
    });
  }
});
onShow(async () => {
  if (!pageState.isNavResume) return;
  pageState.changeNavResume(false);
  isLoading.value = true; // 显示加载状态
  console.log("现有的 id:", id.value);
  const res = await getCampusDetail(id.value);
  console.log("获取到的详情:", res);
  if (res.statusCode === 200) {
    let deta = res.data.data;
    tags.value = [deta.type, deta.scale, "校园大使"];
    type.value = deta.industries || "未知类型";
    status.value = deta.isRecruit ? "招募中" : "已结束";
    coicon.value =
      "https://api.xydsh.cn/enterpriseLogo/" + deta.logo ||
      "https://picsum.photos/200"; // 默认图片
    name.value = deta.name || "未知名称";
    task.value = deta.task || "暂无任务信息";
    harvest.value = deta.harvest || "暂无收获信息";
    expect.value = deta.expected || "暂无期望信息";
    target.value = deta.targetCollege || "暂无目标院校信息";
    introduce.value = deta.description || "暂无公司介绍";
    isLoading.value = false; // 隐藏加载状态
    isCollected.value = deta.isFavorite || false; // 设置收藏状态
    submited.value = deta.isDelivered || false; // 设置投递状态
    hasResume.value = deta.hasResume || false; // 设置是否有简历
  } else {
    isLoading.value = false; // 隐藏加载状态
    uni.showToast({
      title: "获取详情失败",
      icon: "error",
    });
  }
});
const name = ref("");
const tags = ref([""]);
const type = ref("");
const status = ref("");
const coicon = ref("");
const task = ref(`
`);
const harvest = ref(``);
const expect = ref(``);
const target = ref(``);
const introduce = ref(``);
const isCollected = ref(false); // 是否已收藏
const loginStatus = ref(uni.getStorageSync("loginStatus") || false); // 登录状态
async function collectsClick() {
  if (!loginStatus.value) {
    // uni.showToast({
    //   title: "请先登录",
    //   icon: "none",
    // });
    openPopup();
    return;
  }

  isCollected.value = !isCollected.value; // 切换收藏状态
  if (isCollected.value) {
    const res = await collectCampusDetail(id.value);
    if (res.statusCode === 200 && res.data.code === 1) {
      uni.showToast({
        title: "收藏成功",
        icon: "success",
      });
    } else {
      uni.showToast({
        title: "收藏失败",
        icon: "error",
      });
    }
  } else {
    const res = await offCollectCampusDetail(id.value);
    if (res.statusCode === 200 && res.data.code === 1) {
      uni.showToast({
        title: "取消收藏成功",
        icon: "success",
      });
    } else {
      uni.showToast({
        title: "取消收藏失败",
        icon: "error",
      });
    }
  }
}
const showLogin = ref(false);
const popups = ref();
// 打开弹窗
const openPopup = (e) => {
  if (loginStatus.value) {
    return; // 如果已登录，则不打开弹窗
  }
  if (popups.value) {
    //uni.hideTabBar();
    showLogin.value = true;
    popups.value.open();
  }
};

// 关闭弹窗
const closePopup = () => {
  if (popups.value) {
    popups.value.close();
  }
};
const change = (event) => {
  console.log("Popup state changed");
  if (!event.show) {
    console.log("点击了蒙层，弹窗已关闭");
    showLogin.value = false;
    // 在这里写点击蒙层后的逻辑
    //uni.showTabBar();
  }
};

async function handleLoginSuccess(payload) {
  // 可以在这里执行登录成功后的其他逻辑
  if (payload) {
    loginStatus.value = true; // 更新登录状态
    showLogin.value = false;
    isLoading.value = true; // 显示加载状态
    const res = await getCampusDetail(id.value);
    console.log("获取到的详情:", res);
    if (res.statusCode === 200) {
      let deta = res.data.data;
      tags.value = [deta.type, deta.scale, "校园大使"];
      type.value = deta.industries || "未知类型";
      status.value = deta.isRecruit ? "招募中" : "已结束";
      coicon.value =
        "https://api.xydsh.cn/enterpriseLogo/" + deta.logo ||
        "https://picsum.photos/200"; // 默认图片
      name.value = deta.name || "未知名称";
      task.value = deta.task || "暂无任务信息";
      harvest.value = deta.harvest || "暂无收获信息";
      expect.value = deta.expected || "暂无期望信息";
      target.value = deta.targetCollege || "暂无目标院校信息";
      introduce.value = deta.description || "暂无公司介绍";
      isLoading.value = false; // 隐藏加载状态
      isCollected.value = deta.isFavorite || false; // 设置收藏状态
      submited.value = deta.isDelivered || false; // 设置投递状态
      hasResume.value = deta.hasResume || false; // 设置是否有简历
    } else {
      isLoading.value = false; // 隐藏加载状态
      uni.showToast({
        title: "获取详情失败",
        icon: "error",
      });
    }
    closePopup();
  }
}

function handleClose(e) {
  // 处理关闭事件
  showLogin.value = false;
  closePopup();
}

const submited = ref(false);

async function submits() {
  if (submited.value) return;
  if (status.value === "已结束") return;
  if (!loginStatus.value) {
    // uni.showToast({
    //   title: "请先登录",
    //   icon: "none",
    // });
    openPopup();
    return;
  }
  if (!hasResume.value) {
    isModal.value = true;
    return;
  }
  const res = await postCampusApply(id.value);
  submited.value = true;
  if (submited.value)
    uni.showToast({
      title: "投递成功",
      icon: "success",
    });
}
onShareAppMessage(() => {
  return {
    title: "快来投递校园大使职位吧！",
    path: `/pkgA/detail/detail?id=${id.value}`, // 分享路径，带上参数
  };
});
const navigateToResumePage = () => {
  isModal.value = false;
  pageState.changeNavResume(true);
  uni.navigateTo({
    url: "/pkgA/resume/resume", // 跳转到简历编辑页面
  });
};
</script>

<style lang="scss" scoped>
.collects:active {
  transform: scale(1.3);
  /* 点击时的放大效果 */
}

.content {
  margin-top: 23px;
  width: 90%;
  min-height: 100vh;
  margin-left: 5%;
  position: relative;
  padding-bottom: 150px;
}

.theme {
  position: absolute;
  font-size: 18px;
  font-weight: 700;
  max-width: calc(90vw - 63px);
  text-overflow: ellipsis;
  letter-spacing: 0px;
  line-height: 26.06px;
  color: rgba(25, 25, 25, 1);
  text-align: left;
  vertical-align: top;
  /* 补上两行 ↓ */
  white-space: nowrap; /* 强制一行 */
  overflow: hidden; /* 隐藏超出部分 */
}

.tags {
  position: absolute;

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

  top: 67px;
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
  left: 19px;
  top: 65px;
}

.status {
  position: absolute;
  right: 12px;
  top: 68px;
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
  right: 0;

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

.details {
  position: relative;
  width: 100%;
  top: 105px;
  height: auto;
  padding-bottom: 50px;
}

.detailed {
  display: block;
  position: relative;
  width: 100%;
  padding-bottom: 30px;
}

.kuai {
  position: relative;
  left: 0px;
  top: 2px;
  width: 5px;
  height: 16px;
  opacity: 1;
  border-radius: 1px;
  background: rgba(79, 120, 255, 1);
}

.title {
  position: absolute;
  top: 0;
  left: 13px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 20.27px;
  color: rgba(25, 25, 25, 1);
  text-align: left;
  vertical-align: top;
}

.msg {
  width: 92%;
  position: relative;
  left: 13px;
  top: 13px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 20.82px;
  color: rgba(56, 56, 56, 0.8);
  text-align: justify;
  vertical-align: top;
  white-space: pre-wrap;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 79px;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
}

.share {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 23px;
  height: 23px;
}

.btns {
  position: absolute;
  left: 41px;
  bottom: 37px;
  background-color: rgba(255, 255, 255, 1);
  width: 30px;
  height: 30px;
  /* 移除默认样式 */
  border: none;
  border-radius: 0;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btns::after {
  border: none;
}

.ss {
  position: absolute;
  left: 41px;
  bottom: 17px;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 18.82px;
  color: rgba(56, 56, 56, 0.8);
  text-align: left;
  vertical-align: top;
}

.collects {
  transition: transform 0.3s ease, color 0.3s ease;
  position: absolute;
  left: 30%;
  bottom: 37px;
  width: 25px;
  height: 23.97px;
  opacity: 1;
}

.cc {
  position: absolute;
  left: 30%;
  bottom: 17px;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 18.82px;
  color: rgba(56, 56, 56, 0.8);
  text-align: left;
  vertical-align: top;
}

.btn {
  position: absolute;
  bottom: 22px;
  right: 19px;
  width: 40%;
  height: 38px;
  opacity: 1;
  border-radius: 19px;
  background: linear-gradient(
    90deg,
    rgba(79, 120, 255, 1) 0%,
    rgba(79, 120, 255, 0.7) 100%
  );
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 20.27px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  vertical-align: top;
  display: flex;
  align-items: center;
  justify-content: center;
}
.endBtn {
  position: absolute;
  bottom: 22px;
  right: 19px;
  width: 40%;
  height: 38px;
  opacity: 1;
  border-radius: 19px;
  background: rgba(245, 245, 245, 1);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 20.27px;
  color: rgba(166, 166, 166, 1);
  text-align: center;
  vertical-align: top;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-content {
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  min-height: 254px;
  width: 100%;
}
.ended {
  color: rgba(153, 151, 151, 1) !important;
}
.infoview{
  width: 92%;
 
  margin-left: 13px;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 17.82px;
  color: rgb(184, 184, 184);
  text-align: justify;
  vertical-align: top;
  white-space: pre-wrap;
}
.infoimg{
  width: 12px;
  height: 12px;
  position: absolute;
  left: 0;
  margin-top: 3px;
}
</style>
