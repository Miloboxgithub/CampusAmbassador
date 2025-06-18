<template>
  <view class="container">
    <view class="input-group">
      <view
        class="sss"
        style="
          display: flex;
          height: 44px;
          width: 50px;
          position: absolute;
          left: 20px;
          align-items: center;
        "
      >
        <view style="font-size: 12px; font-weight: 400; color: rgba(0, 0, 0, 1)"
          >+86</view
        >
        <view class="sad"></view>
      </view>
      <input
        type="number"
        pattern="[0-9]*"
        style="color: #000"
        placeholder="请输入手机号"
        @input="bindPhoneInput"
      />
    </view>
    <view class="input-group">
      <input
        style="position: absolute; left: 20px; color: #000"
        type="number"
        placeholder="请输入验证码"
        @input="bindCodeInput"
      />
      <view
        style="position: absolute; right: 22px"
        :class="{ act: isPhoneValid() }"
        v-if="canGetCode"
        @tap="sendCode"
      >
        获取验证码
      </view>
      <view style="position: absolute; right: 22px" v-else
        >{{ countdown }} s 后可重新获取</view
      >
    </view>
    <view class="login" @tap="login" :class="{ active: isPhoneValid() }"
      >登录</view
    >
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { onMounted } from "vue";
// import { getApp } from "uni-app";

// const app = getApp();
// const apiUrl = app.globalData.apiUrl;

const phone = ref("");
const code = ref("");
const canGetCode = ref(true);
const countdown = ref(60);

const bindPhoneInput = (e) => {
  phone.value = e.detail.value.trim();
};

const bindCodeInput = (e) => {
  code.value = e.detail.value;
};

const sendCode = () => {
  if (phone.value === "") {
    uni.showToast({
      title: "请填写手机号！",
      icon: "none",
    });
    return;
  }
  const phoneRegex = /^1[3-9]\d{9}$/; // 中国大陆手机号正则表达式
  if (!phoneRegex.test(phone.value)) {
    uni.showToast({
      title: "手机号格式不正确！",
      icon: "none",
    });
    return;
  }
  console.log("发送验证码请求，手机号:", phone.value);
  uni.request({
    url: `https://api.xydsh.cn/api/wechat/sendMsg`, // 拼接完整的 URL
    method: "POST",
    data: {
      account: phone.value.toString(), // 确保手机号是字符串类型
      countryCode: "86",
    },
    header: {
      "content-type": "application/json",
    },
    success: (res) => {
      console.log("发送验证码请求结果:", res);
      if (res.statusCode === 200) {
        if (res.data.code == 0) {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
          });
        } else {
          uni.showToast({
            title: "验证码已发送",
          });
          startCountDown();
        }
      } else {
        console.error("请求失败:", res);
        uni.showToast({
          title: "发送验证码失败",
          icon: "none",
        });
      }
    },
    fail: (err) => {
      console.error("请求失败:", err);
    },
  });
};
// 替换原来的计算属性
const isPhoneValid = () => phone.value && phone.value.length === 11;

// 获取验证码按钮样式
const getCodeBtnStyle = {
  color: isPhoneValid() ? "rgba(88, 127, 255, 1)" : "",
};
const getUserInfo = () => {
  uni.request({
    url: ``, // 拼接完整的 URL
    method: "GET",
    header: {
      "content-type": "application/json",
      token: uni.getStorageSync("v_token"), // 传递 token
    },
    success: (res) => {
      if (res.statusCode === 200) {
        uni.removeStorageSync("userInfo");
        setTimeout(() => {
          uni.setStorageSync("userInfo", res.data.data);
        }, 200);
      } else {
        console.error("请求失败:", res);
      }
    },
    fail: (err) => {
      console.error("请求失败:", err);
    },
  });
};

const startCountDown = () => {
  let count = countdown.value;
  canGetCode.value = false; // 设置不可点击状态

  const timer = setInterval(() => {
    if (count <= 0) {
      clearInterval(timer);
      canGetCode.value = true;
      countdown.value = 60; // 重置倒计时
    } else {
      countdown.value = count--;
    }
  }, 1000);
};

const login = () => {
  if (phone.value === "") {
    uni.showToast({
      title: "请填写手机号！",
      icon: "none",
    });
    return;
  }
  const phoneRegex = /^1[3-9]\d{9}$/; // 中国大陆手机号正则表达式
  if (!phoneRegex.test(phone.value)) {
    uni.showToast({
      title: "手机号格式不正确！",
      icon: "none",
    });
    return;
  }
  if (code.value.length == 0) {
    uni.showToast({
      title: "请填写验证码！",
      icon: "none",
    });
    return;
  }
  uni.login({
    success: (res) => {
      if (res.code) {
        uni.request({
          url: `https://api.xydsh.cn/api/wechat/codeLogin`, // 拼接完整的 URL
          method: "POST",
          data: {
            account: phone.value.toString(), // 确保手机号是字符串类型
            code: code.value.toString(), // 确保验证码是字符串类型
          },
          header: {
            "content-type": "application/json",
          },
          success: (res) => {
            console.log("登录请求结果:", res);
            if (res.data.code != 0) {
              uni.showToast({
                title: "登录成功！",
              });
              uni.setStorageSync("loginStatus", true);
              uni.setStorageSync("jwt", res.data.data.jwt);
              uni.setStorageSync("account", res.data.data.account);
              uni.setStorageSync("resumeId", res.data.data.resumeId);
              uni.setStorageSync("userId", res.data.data.id);
              setTimeout(() => {
                uni.switchTab({
                  url: "/pages/personage/personage",
                });
              }, 1500);
            } else {
              console.error("请求失败:", res);
              uni.showToast({
                title: res.data.msg,
                icon: "none",
              });
            }
          },
          fail: (err) => {
            console.error("请求失败:", err);
            uni.showToast({
              title: "登录请求失败",
              icon: "none",
            });
          },
        });
      } else {
        uni.showToast({
          title: "获取登录凭证失败",
          icon: "none",
        });
      }
    },
    fail: (err) => {
      uni.showToast({
        title: "获取登录凭证失败",
        icon: "none",
      });
    },
  });
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  width: 300px;
  height: 44px;
  opacity: 1;
  border-radius: 23px;
  background: rgba(245, 245, 245, 1);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 17.38px;
  color: rgba(166, 166, 166, 1);
  text-align: justify;
  vertical-align: top;
  position: relative;
}

.sad {
  width: 32px;
  height: 1.2px;
  opacity: 1;
  transform: rotate(90deg);
  background: rgba(166, 166, 166, 1);
}

.input-group input {
}

.input-group button {
  margin-left: 10px;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  opacity: 0;
}

.login {
  margin-top: 13px;
  width: 300px;
  height: 44px;
  opacity: 1;
  border-radius: 23px;
  background: rgba(88, 127, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 26.06px;
  color: rgba(255, 255, 255, 1);
  text-align: justify;
  vertical-align: top;
}

.active {
  background: rgba(88, 127, 255, 1) !important;
}

.act {
  color: rgba(88, 127, 255, 1) !important;
}
</style>
