import Vue from 'vue'
import Vuex from 'vuex'


import VuexPersistence from 'vuex-persist'

import users from './modules/users'
import roles from './modules/roles'
import activities from './modules/activities'
import categories from './modules/categories'
import mediadefinitions from './modules/mediadefinitions'

import '@/plugins/notifications'

const vuexPerist = new VuexPersistence({
    storage:window.sessionStorage,
    key:"__alianca"
})

Vue.use(Vuex)

const vuex = new Vuex.Store({
    modules:{
        users,
        roles,
        activities,
        categories,
        mediadefinitions
    },
    plugins:[vuexPerist.plugin]
});

export default vuex