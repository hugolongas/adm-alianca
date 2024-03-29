import Vue from 'vue'
import axios from 'axios'
import config from '@/config'
import store from '@/store'

const myAxios = axios.create({
    baseURL:config.apiRootUrl+'/api'
})


//Configure AXIOS
myAxios.interceptors.request.use(
    (config)=>{
        let token = store.getters.userToken;

        if(token){
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) =>{
        return Promise.reject(error);
    }
)

myAxios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      try {
        if (401 === error.response.status) {
          // Remove user and go to login
          store.dispatch("logout");
          this.$route.push({name:"home"});
        } else if (403 === error.response.status) {
            store.dispatch("logout");
            
          this.$route.push({name:"home"});
        }
      } catch(e) {
        return Promise.resolve(error)
        
      }
  
      //return Promise.reject(error)
      return Promise.resolve(error);
    },
  )

Vue.axios = Vue.prototype.$http = myAxios;

export default myAxios;