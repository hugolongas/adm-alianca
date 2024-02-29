<template>
  <v-navigation-drawer permanent app>
    <v-list-item link :to="{ name: 'dashboard' }">
      <v-list-item-content>
        <v-img src="@/assets/logo.png" width="60px"></v-img>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item link :to="{ name: 'activities' }">
        <v-list-item-icon>
          <v-icon>mdi-book-multiple-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Activitats</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "drawerView",
  data() {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
}
</script>
<style></style>