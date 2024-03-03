import Vue from 'vue'

const state = {
    user: null,
    access_token: "",
    isloggedIn: false
}

const getters = {
    user: state => state.user,
    userToken: state => state.access_token,
    isLoggedIn: state => state.isLoggedIn,
}
const actions = {
    async login({ commit }, loginData) {
        return new Promise((resolve, reject) => {
            Vue.axios.post("/login", loginData)
            .then((response) => {
                if (response !== null) {
                    if (response.status == 200) {
                        let resp = response.data;
                        if (resp.success) {
                            commit('saveUser', resp.result)
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
    async logout({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.axios.post("/logout").then((response) => {
                if (response !== null) {
                    if (response.status == 200) {
                        commit('logout')
                        resolve('success')
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
    async getUser({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.axios.get("/user").then((response) => {
                if (response !== null) {
                    if (response.status == 200) {
                        let user = response.data;
                        commit('getuser', user);

                        resolve('success')
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
    }
}

const mutations = {
    saveUser(state, user) {
        state.user = user.user;
        state.access_token = user.access_token;
        state.isLoggedIn = true;
    },
    getuser(state, user) {
        state.user = user.data;
    },
    logout(state) {
        state.user = null;
        state.access_token = "";
        state.isLoggedIn = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}