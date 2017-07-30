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
    user: {
      name: '',
      username: '',
      password: ''
    }
  },
  mutations: {
    setFullLoading(state, newBool)
    {
      state.fullLoading = newBool;
    },
    setLocalLoading(state, newBool){
      state.localLoading = newBool;
    },
    setUser(state, user){
      state.user.name = user.name
      state.user.username = user.username
    },
  }
});
router.beforeEach((to, from, next) => {
  if (sessionStorage) {
    var user = JSON.parse(sessionStorage.getItem('user'));
  }
  if (user == null && to.path != "/Login") {//是否已经登录
    next('/');
  }
  next();
})
;
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
