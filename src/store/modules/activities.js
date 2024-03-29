import Vue from 'vue'

const state = {
    activities: []
}

const getters = {
    activities: state => state.activities,
    activitiesForSelect: state => state.activities
        .map(function (c) {
            return {
                id: c.id,
                name: c.title
            }
        })
        .sort((a, b) => _alphanethicalOrder(a.title, b.title)),

}

const _alphanethicalOrder = function (a, b) {
    if (a > b) return 1
    else if (a < b) return -1
    return 0
}

const actions = {
    async syncActivities({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.axios.get("/activity/all").then((response) => {
                if (response !== null) {
                    if (response.status == 200) {
                        let resp = response.data;
                        if (resp.success) {
                            commit('syncActivities', resp)
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