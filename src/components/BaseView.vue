<template>
  <div>
    <toolbarView />    
    <drawerView />       
    <v-main>      
      <router-view />     
    </v-main>
  </div>
</template>
<script>

import drawerView from './layout/DrawerView.vue'
import toolbarView from './layout/ToolbarView.vue'

export default {
  name: "BaseView",  
  components:{
    drawerView,
    toolbarView,
  },
  data() {
    return {
      navIcon: 2,
    };
  },
  
  beforeCreate() {   
     this.$store.dispatch("syncActivities");
     this.$store.dispatch("syncCategories");
     console.log('syncMediaDefinitions');
     this.$store.dispatch("syncMediaDefinitions");
    
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