import Vue from 'vue'

import vuetify from './plugins/vuetify'

import App from './components/App.vue'

import router from './plugins/router'
import axios from './plugins/axios'

import store from './store'

import CKEditor from '@ckeditor/ckeditor5-vue2';


import { showMessagesMixin } from '@/mixins/showMessagesMixin'
Vue.mixin(showMessagesMixin)

Vue.use(vuetify);
Vue.config.productionTip = false
Vue.use(store);

Vue.use(CKEditor);

new Vue({
  router,  
  axios,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')