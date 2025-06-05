<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
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
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
</style>
