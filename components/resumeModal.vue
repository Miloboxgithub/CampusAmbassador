<template>
  <view
    v-if="innerShow"
    class="loading-mask"
    :class="{ visible: show }"
    @touchmove.stop.prevent
  >
    <view class="loading-content" :class="{ visible: show }">
      <view class="theme-login">提示</view>
      <view class="tips">请完善简历后投递</view>

      <view class="btn-group">
        <view class="no" @click="refuse">取消</view>
        <view class="yes" @click="goTo">去完善</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  show: { type: Boolean, default: false },
});

const emit = defineEmits(["update:show", "go"]);

const innerShow = ref(false); // 实际控制 DOM 显隐
let timer = null;

// 监听外部 show，做淡入淡出
watch(
  () => props.show,
  (val) => {
    if (val) innerShow.value = true;
    else {
      clearTimeout(timer);
      timer = setTimeout(() => (innerShow.value = false), 300); // 等动画
    }
  },
  { immediate: true }
);

function refuse() {
  emit("update:show", false);
}

function goTo() {
  emit("go");
  emit("update:show", false);
}
</script>

<style scoped>
.loading-mask {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
  opacity: 0;
  transition: opacity 0.3s;
}

.loading-mask.visible {
  opacity: 1;
}

.loading-content {
  width: 75vw;
  height: 150px;
  border-radius: 11.58px;
  background: #fff;
  margin-bottom: 100px;
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.3s ease;
}

.loading-content.visible {
  opacity: 1;
  transform: scale(1);
}

.btn-group {
  display: flex;
  justify-content: space-around;
  margin-top: 23px;
}

.no,
.yes {
  width: 86.88px;
  height: 32.58px;
  border-radius: 28.96px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15.93px;
  line-height: 23.06px;
}

.no {
  background: #ededed;
  color: #383838;
}

.yes {
  background: #587fff;
  color: #fff;
}

.theme-login {
  font-size: 18.82px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 27.26px;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  vertical-align: top;
  top: 20px;
  width: 100%;
  margin-top: 13px;
}
.tips {
  font-size: 18.82px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 27.26px;
  color: rgba(128, 128, 128, 1);

  margin-top: 10px;
  width: 100%;
  text-align: center;
}
.no {
  left: 96.68px;
  top: 445.7px;
  width: 86.88px;
  height: 32.58px;
  opacity: 1;
  border-radius: 28.96px;
  background: rgba(237, 237, 237, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15.93px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 23.06px;
  color: rgba(56, 56, 56, 1);
  text-align: left;
}
.yes {
  left: 221.21px;
  top: 445.7px;
  width: 86.88px;
  height: 32.58px;
  opacity: 1;
  border-radius: 28.96px;
  background: rgba(88, 127, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15.93px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 23.06px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
}
</style>
