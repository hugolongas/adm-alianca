<template>
  <div>
    <toolbarView />    
    <drawerView />       
    <v-main style="min-height: 800px;background-color:#cccccc">      
      <router-view style="background-color:#FFFFFF;margin: 5px;border-radius: 5px;"/>     
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