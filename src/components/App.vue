<template>
  <v-app id="app" style="background-color:#fbfbfb">        
    <router-view />
  </v-app>
</template>
<script>
export default {
  name:"App",  
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