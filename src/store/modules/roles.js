import Vue from 'vue'

const state = {
    roles:[]
}

const getters ={
    roles:state=>state.roles,
    
}
const actions ={
    async syncRoles({commit}) {
        return new Promise((resolve,reject)=>{            
            Vue.axios.get("/roles/all ").then((response)=>{    
                if(response!==null){
                    if (response.status == 200) {
                        let resp = response.data;
                        if (resp.success) {
                            commit('syncRoles', resp.result)
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
        state.roles = roles
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}