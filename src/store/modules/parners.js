import Vue from 'vue'

const state = {
    parners: []
}

const getters = {
    parners: state => state.parners,
}

const actions = {
    async syncParners({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.axios.get("/parners/all ").then((response) => {
                if (response !== null) {
                    if (response.status == 200) {
                        let resp = response.data;
                        if (resp.success) {
                            commit('syncParners', resp)
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
    syncParners(state, parners) {
        state.parners = parners.result
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}