// #ifndef VUE3
import App from './App'
import Vue from 'vue'
import { createPinia } from 'pinia';

Vue.config.productionTip = false
App.mpType = 'app'

const pinia = createPinia();
Vue.use(pinia); // 使用 Vue.use 安装 Pinia 插件

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App';

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia); // 安装 Pinia 插件
  return {
    app
  };
}
// #endif