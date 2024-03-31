<template>
  <v-app-bar app fixed elevation="2" style="background-color: white">
    <v-spacer></v-spacer>
    {{ getUser }}    
    <v-menu bottom :offset-y="true">
      <template v-slot:activator="{ on, attrs }">
        <v-btn plain v-bind="attrs" v-on="on">
          <v-icon right> mdi-cog-outline</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item link :to="{ name: 'users' }">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Usuaris</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'roles' }">
          <v-list-item-icon>
            <v-icon>mdi-account-group-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Rols d'Usuari</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn plain @click="logout()">
      Deslogar-se
      <v-icon right>mdi-location-exit</v-icon>
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