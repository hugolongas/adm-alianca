import Vue from 'vue'

const state = {
    user: null,
    access_token: "",
    isLoggedIn: false,
    users: null,
    expiresDate: new Date()
}

const getters = {
    user: state => state.user,
    userToken: state => state.access_token,
    isLoggedIn: state => {
        var currentDate = new Date();
        console.log('currentDate', currentDate);
        console.log('expiresDate', state.expiresDate)
        var expired = currentDate > state.expiresDate;
        console.log('expired', expired)
        var isloggedIn = !state.isLoggedIn ? state.isLoggedIn : !expired;
        console.log('isloggedIn', isloggedIn);
        return isloggedIn;
    },
    users: state => state.users,
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
    },
    async syncUsers({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.axios.get("/users/all ").then((response) => {
                if (response !== null) {
                    if (response.status == 200) {
                        let resp = response.data;
                        if (resp.success) {
                            commit('syncUsers', resp)
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
    saveUser(state, user) {
        state.user = user.user;
        state.access_token = user.access_token;
        state.isLoggedIn = true;
        var currentDate = new Date();
        currentDate.setSeconds(currentDate.getSeconds() + user.expires_in);
        state.expiresDate = currentDate;
    },
    getuser(state, user) {
        state.user = user.data;
    },
    logout(state) {
        state.user = null;
        state.access_token = "";
        state.isLoggedIn = false;
    },
    syncUsers(state, users) {
        state.users = users.result;
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}