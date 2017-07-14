import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import '@/assets/css/reset1.3.css';
import 'element-ui/lib/theme-default/index.css';
import '@/assets/css/public.css';
import axios from 'axios';
import Vuex from 'vuex';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);
axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios;
const store = new Vuex.Store({
  state: {
    fullLoading: false,
    localLoading: false,
  },
  mutations: {
    setFullLoading(state, newBool)
    {
      state.fullLoading = newBool;
    },
    setLocalLoading(state, newBool){
      state.localLoading = newBool;
    },
  }
})
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
