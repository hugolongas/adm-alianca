<template>
  <v-navigation-drawer permanent app>
    <v-list-item link :href="webUrl" target="_blank">
      <v-list-item-content>
        <v-img src="@/assets/logo.png" width="60px"></v-img>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item link :to="{ name: 'dashboard' }">
        <v-list-item-icon>
          <v-icon>mdi-home-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link :to="{ name: 'cover' }">
        <v-list-item-icon>
          <v-icon>mdi-home-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Portada</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link :to="{ name: 'activities' }">
        <v-list-item-icon>
          <v-icon>mdi-drama-masks</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Activitats</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link :to="{ name: 'categories' }">
        <v-list-item-icon>
          <v-icon>mdi-dna</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Categories</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item link :to="{ name: 'parners' }">
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Tipus de socis</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import config from "@/config";
export default {
  name: "drawerView",
  data() {
    return {};
  },
  methods: {},
  computed: {
    webUrl() {
      return config.webUrl;
    },
  },
};
</script>
<style></style>