import Vue from 'vue'
import Vuex from 'vuex'


import VuexPersistence from 'vuex-persist'

import users from './modules/users'
import covers from './modules/covers'
import roles from './modules/roles'
import activities from './modules/activities'
import categories from './modules/categories'
import mediadefinitions from './modules/mediadefinitions'
import parners from './modules/parners'

import '@/plugins/notifications'

const vuexPerist = new VuexPersistence({
    storage:window.localStorage,
    key:"__alianca"
})

Vue.use(Vuex)

const vuex = new Vuex.Store({
    modules:{
        users,
        covers,
        roles,
        activities,
        categories,
        parners,
        mediadefinitions
    },
    plugins:[vuexPerist.plugin]
});

export default vuex