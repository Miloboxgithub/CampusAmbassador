// plugins/index.js
// 分享插件 - 全局混入到所有页面
export default {
    /**
     * 页面加载生命周期钩子
     * 在微信小程序平台启用分享功能
     */
    onLoad() {
      // #ifdef MP-WEIXIN
      // 在微信小程序中显示分享菜单
      uni.showShareMenu({
        withShareTicket: true,        // 启用带shareTicket的转发
        menus: ['shareAppMessage', 'shareTimeline']  // 启用分享到好友和朋友圈功能
      });
      // #endif
    }
  };
