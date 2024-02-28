<template>
  <v-navigation-drawer     
    app
    id="appDrawer"
    dark
    width="200"
    >
      <v-list
        nav
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
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
<style>
.container {
  padding-top: 40px;
}

.user-item {
  display: inline-block;
  margin-right: 5px;
  background-color: white;
  border-radius: 25px;
  padding: 2px 5px;
  font-size: 13px;
}
@media screen and (min-width: 800px) {
    .user-item{
      font-size: 15px;
    }
}
</style>