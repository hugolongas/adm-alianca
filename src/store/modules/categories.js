import Vue from 'vue'

const state = {
    categories: []
}

const getters = {
    categories: state => state.categories,

}
const actions = {
    async syncCategories({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.axios.get("/category/all ").then((response) => {
                if (response !== null) {
                    if (response.status == 200) {
                        let resp = response.data;
                        if (resp.success) {
                            commit('syncCategories', resp.result)
                            resolve('success')
                        }
                        else {
                            resolve(resp.result)
                        }
                    }
                }
                else {
                    resolve('Error');
                }
            }).catch(error => {
                window.console.log("error:", error);
                reject(error);
            });
        });
    },
}

const mutations = {
    syncCategories(state, categories) {
        state.categories = categories
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}