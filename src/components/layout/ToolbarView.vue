<template>
  <v-app-bar app fixed color="teal" elevate-on-scroll>
    <v-toolbar-title>Title</v-toolbar-title>

    <v-spacer></v-spacer>
    {{ getUser }}
    <v-menu 
      offset-y
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Rols</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="logout()">
            <v-list-item-title>Deslogar-se</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-menu>
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
      
      var user =  this.$store.getters.user;
      if(user!=null) return user.name;
      return '';
    },
    
  },
};
</script>
<style>
</style>