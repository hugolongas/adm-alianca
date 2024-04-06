import Vue from 'vue'

const state = {
    roles:[]
}

const getters ={
    roles:state=>state.roles,
    rolesForSelect: state => state.roles
        .map(function (c) {
            return {
                id: c.id,
                name: c.name
            }
        })
        .sort((a, b) => _alphanethicalOrder(a.name, b.name)),
    
}

const _alphanethicalOrder = function (a, b) {
    if (a > b) return 1
    else if (a < b) return -1
    return 0
}

const actions ={
    async syncRoles({commit}) {
        return new Promise((resolve,reject)=>{            
            Vue.axios.get("/roles/all ").then((response)=>{    
                if(response!==null){
                    if (response.status == 200) {
                        let resp = response.data;
                        if (resp.success) {
                            commit('syncRoles', resp)
                            resolve('success')
                        }
                        else {
                            resolve(resp.result)
                        }
                    }
                }
                else{
                    resolve('Error');
                }
            }).catch(error=>{
                window.console.log("error:",error);
                reject(error);
            }); 
        });        
    },
}

const mutations = {
    syncRoles(state,roles){
        state.roles = roles.result
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}