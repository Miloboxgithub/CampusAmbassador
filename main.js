// #ifndef VUE3
// Vue2 版本的入口文件
import App from './App'
import Vue from 'vue'
import { createPinia } from 'pinia';
// 导入分享插件
import sharePlugin from './plugins/index.js';

// 关闭生产环境提示
Vue.config.productionTip = false
// 设置小程序类型
App.mpType = 'app'

// 创建 Pinia 状态管理实例
const pinia = createPinia();
// 使用 Pinia 插件
Vue.use(pinia);
// 全局混入分享插件，所有页面都会执行
Vue.mixin(sharePlugin);

// 创建 Vue 应用实例
const app = new Vue({
  ...App
})
// 挂载应用
app.$mount()
// #endif

// #ifdef VUE3
// Vue3 版本的入口文件
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App';
import sharePlugin from './plugins/index.js';

/**
 * 创建应用实例
 * @returns {Object} 包含应用实例的对象
 */
export function createApp() {
  // 创建 SSR 应用实例
  const app = createSSRApp(App);
  // 创建 Pinia 状态管理实例
  const pinia = createPinia();
  // 全局混入分享插件
  app.mixin(sharePlugin);
  // 使用 Pinia 插件
  app.use(pinia);
  return {
    app
  };
}
// #endif
