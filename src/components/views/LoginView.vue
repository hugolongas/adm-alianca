<template>
  <v-main>
    <v-card class="elevation-6" :loading="loading">
      <v-toolbar color="" dark flat>
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <template v-slot:progress>
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-alert
        class="login-alert"
        :value="showAlert"
        type="error"
        border="top"
        transition="slide-y-transition"
        >{{ alertError }}</v-alert
      >
      <v-card-text>
        <v-form
          class="login-form"
          ref="form"
          v-model="valid"
          @submit="login"
          onsubmit="return false;"
        >
          <v-text-field
            ref="username"
            v-model="form.email"
            required
            :rules="userRules"
            single-line
            outlined
            autofocus
            placeholder="Email"
            name="username"
            prepend-inner-icon="mdi-account-circle-outline"
            type="text"
            :disabled="loading"
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            required
            ref="password"
            id="password"
            :rules="passwordRules"
            single-line
            outlined
            placeholder="Contrasenya"
            name="password"
            prepend-inner-icon="mdi-lock-outline"
            type="password"
            :disabled="loading"
            autocomplete="password"
          ></v-text-field>
          <v-layout>
            <v-flex align-self-center>
              <v-checkbox
                v-model="form.remember"
                class="remember"
                color="primary"
                hide-details
                label="Recorda'm"
                :disabled="loading"
              ></v-checkbox>
            </v-flex>
            <v-flex class="login-btn">
              <v-btn
                color="primary"
                type="submit"
                :loading="loading"
                :disabled="!valid"
                >Logar-me</v-btn
              >
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-main>
</template>
  
<script>
export default {
  name: "LoginView",
  data() {
    return {
      valid: false,
      loading: false,
      showAlert: false,
      alertError: "",
      form: {
        email: "",
        password: "",
        remember: false,
      },
      userRules: [
        (v) => !!v || "Es obligatori indicar un Email",
        (v) => /.+@.+/.test(v) || "El email ha de ser valid",
      ],
      passwordRules: [(v) => !!v || "La contrasenya es obligatoria"],
    };
  },
  mounted() {
    this.$refs.username.$el.focus();
  },
  computed: {},
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        const that = this;
        that.showAlert = false;
        that.loading = true;
        
        this.$store.dispatch("login", that.form).then((response) => {
          if (response == "success") {
            that.loading = false;
            that.$router.push({ name: "dashboard" });
          } else {
            var result = response;
            that.alertError = result;
            that.showAlert = true;
            that.loading = false;
          }
        });
      }
      return false;
    },
  },
};
</script>