import Vue from 'vue'

const state = {
    mediaDefinitions: []
}

const getters = {
    mediaDefinitions: state => state.mediaDefinitions,    
}


const actions = {
    async syncMediaDefinitions({ commit }) {
        return new Promise((resolve, reject) => {
            
            console.log('syncMediaDefinitions');
            Vue.axios.get("/mediadefinitions/all").then((response) => {
                if (response !== null) {
                    if (response.status == 200) {
                        let resp = response.data;
                        if (resp.success) {
                            console.log('syncMediaDefinitions result', resp);
                            commit('syncMediaDefinitions', resp)
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
    syncMediaDefinitions(state, mediaDefinitions) {
        state.mediaDefinitions = mediaDefinitions.result
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}