<template>
  <v-app id="app">        
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