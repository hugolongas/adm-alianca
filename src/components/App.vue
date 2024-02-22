<template>
  <v-app id="app">    
    <toolbar />   
    <drawer />    
    <router-view />
  </v-app>
</template>
<script>
import Drawer from './layout/DrawerView.vue'
import Toolbar from './layout/ToolbarView.vue'
export default {
  name:"App",  
  
  components:{
    Drawer,
    Toolbar,
  },
  async created(){
  },
  mounted() {
    var user = this.$store.getters.user;
    if(user==null) this.$router.push({ name: "login" });    
  },
  methods:{
  }

}
</script>
<style>
</style>