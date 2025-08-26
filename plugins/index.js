// plugins/share.js
export default {
    onLoad() {
      // #ifdef MP-WEIXIN
      uni.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      });
      // #endif
    }
  };