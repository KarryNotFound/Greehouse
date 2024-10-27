import Vue from 'vue'
import store from "./store"
import App from './App.vue'
import router from "./router/index.js"
import ElementUI from 'element-ui';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import 'element-ui/lib/theme-chalk/index.css';
import "lib-flexible/flexible.js"

// axios.defaults.baseURL = "http://121.41.100.153/api"
axios.defaults.baseURL = "http://localhost:8088"

Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')









// const setHtmlFontSize = () => {
//   const htmlDom = document.getElementsByTagName('html')[0];
//   let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
//   if (htmlWidth >= 800) {
//     htmlWidth = 800;
//   }
//   if (htmlWidth <= 160) {
//     htmlWidth = 160;
//   }
//   htmlDom.style.fontSize = `${htmlWidth / 10}px`;
// };
// window.onresize = setHtmlFontSize;
// setHtmlFontSize();

