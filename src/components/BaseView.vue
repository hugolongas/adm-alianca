<template>
  <div>
    <v-container class="main">
      <router-view />
    </v-container>
  </div>
</template>
<script>
export default {
  name: "BaseView",
  data() {
    return {
      navIcon: 2,
    };
  },
  methods: {},
  computed: {},
};
</script>
<style>
.main {
  padding-top: 40px;
  background-color:red;
  padding-right:90px;
}
</style>