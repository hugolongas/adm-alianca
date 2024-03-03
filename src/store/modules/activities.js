import Vue from 'vue'

const state = {
    activities: []
}

const getters = {
    activities: state => state.activities,

}
const actions = {
    async syncActivities({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.axios.get("/activity/all ").then((response) => {
                if (response !== null) {
                    if (response.status == 200) {
                        let resp = response.data;
                        if (resp.success) {
                            commit('syncActivities', resp.result)
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
    syncActivities(state, activities) {
        state.activities = activities.result
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}