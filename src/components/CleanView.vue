<template>
<v-main id="login">
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 lg3>
        <v-img
        src="@/assets/logo.png"
        style="display:black; margin: 0 auto 1rem;  padding: .5rem;"
        max-height="100px"
        max-width="80%"
        contain
        ></v-img>
        <router-view />
      </v-flex>
    </v-layout>
  </v-container>
</v-main>  
</template>
<script>
export default {
  name: "CeanView",
  methods: {},
};
</script>
<style lang="less" scoped>
.login-form{
  .login-btn{
    text-align:right;
    margin-right:2px;
    .v-btn{
      margin-right: 0;
    }
  }
}
.v-input{
  &.remember{
    margin:0;
  }
}
.login-alert {margin-top:0; border-radius: 0;}
</style>