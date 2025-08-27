<script>
export default {
  /**
   * 应用启动时触发
   */
  onLaunch: function () {
    console.log("App Launch - 应用启动");
    // 文件系统访问示例代码（已注释）
    // const fs = wx.getFileSystemManager();
    // fs.access({
    //   path: "wxfile://usr/miniprogramLog/log2",
    //   success: function (res) {
    //     console.log("文件存在");
    //   },
    //   fail: function (err) {
    //     console.error("文件不存在", err);
    //   },
    // });
  },
  
  /**
   * 应用显示时触发（从后台进入前台）
   */
  onShow: function () {
    console.log("App Show - 应用显示");
  },
  
  /**
   * 应用隐藏时触发（从前台进入后台）
   */
  onHide: function () {
    console.log("App Hide - 应用隐藏");
  },
};
</script>

<style>
/* 每个页面公共CSS样式 */
</style>
