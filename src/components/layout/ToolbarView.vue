<template>
  <div>
    <v-app-bar
    app
      fixed
      color="white"
      elevate-on-scroll
    >
      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>    
  </div>
</template>
<script>
export default {
  name: "ToolbarView",
  data() {
    return {
      navIcon: 2,
    };
  },
  methods: {},
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
<style>
</style>