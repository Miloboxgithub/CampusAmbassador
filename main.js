// #ifndef VUE3
import App from './App'
import Vue from 'vue'
import { createPinia } from 'pinia';
// main.js
import sharePlugin from './plugins/index.js';
Vue.config.productionTip = false
App.mpType = 'app'

const pinia = createPinia();
Vue.use(pinia); // 使用 Vue.use 安装 Pinia 插件
Vue.mixin(sharePlugin);   // 全局混入，所有页面都会执行


const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App';
import sharePlugin from './plugins/index.js';
export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.mixin(sharePlugin);   // 全局混入，所有页面都会执行
  app.use(pinia); // 安装 Pinia 插件
  return {
    app
  };
}
// #endif