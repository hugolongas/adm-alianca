<template>
  <v-app-bar app fixed elevation="2" style="background-color:white">        
    <v-spacer></v-spacer>
    {{ getUser }}
     <v-btn icon @click="logout()">
        <v-icon>mdi-location-exit</v-icon>
      </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "toolbarView",
  data() {
    return {
      navIcon: 2,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then((response) => {
        if (response == "success") {
          sessionStorage.clear();
          this.$router.push({ name: "login" });
        } else {
          this.error = response;
        }
      });
    },
  },
  computed: {
    getUser() {
      var user = this.$store.getters.user;
      if (user != null) return user.name;
      return "";
    },
  },
};
</script>
<style>
</style>