import Vue from 'vue'

const state = {
    covers: []
}

const getters = {
    covers: state => state.covers,
}

const actions = {
    async syncCovers({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.axios.get("/covers").then((response) => {
                if (response !== null) {
                    if (response.status == 200) {
                        let resp = response.data;
                        if (resp.success) {
                            commit('syncCovers', resp)
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
    syncCovers(state, covers) {
        state.covers = covers.result
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}