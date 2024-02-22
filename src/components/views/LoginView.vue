<template>
<v-card :loading="loading">
      <template v-slot:progress>
        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
      </template>
      <v-card-title>Login</v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-alert v-show="error" border="top" color="red lighten-2" dark>
        {{ this.errorText }}
      </v-alert>
      <v-container grid-list-xl fluid>
        <v-layout flex-child wrap>
          <v-flex sm12><v-form>
              <v-text-field v-model="email" class="form-input" type="email" id="email" required
                placeholder="Email"></v-text-field>

              <v-text-field v-model="password" class="form-input" type="password" id="password"
                placeholder="Password"></v-text-field>

            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn class="primary" @click="login">Login</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
</template>
  
<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      error: false,
      errorText: ""
    };
  },
  computed: {
  },
  methods: {
    login() {
      this.loading = true;
      let loginData = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("login", loginData).then((response) => {
        if (response == "success") {
          this.loading = false;
          this.$router.push({ name: "dashboard" });
        } else {
          var result = response;
          this.errorText = result;
          this.error = true;
          this.loading = false;
        }
      });
    },
  },
};
</script>