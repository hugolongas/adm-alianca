import Vue from 'vue'
import Vuex from 'vuex'

import CKEditor from '@ckeditor/ckeditor5-vue2';

import VuexPersistence from 'vuex-persist'

import users from './modules/users'
import activities from './modules/activities'
import categories from './modules/categories'

import '@/plugins/notifications'

const vuexPerist = new VuexPersistence({
    storage:window.sessionStorage,
    key:"__alianca"
})

Vue.use(Vuex)
Vue.use(CKEditor)

const vuex = new Vuex.Store({
    modules:{
        users,
        activities,
        categories
    },
    plugins:[vuexPerist.plugin]
});

export default vuex