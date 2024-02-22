<template>
  <v-dialog v-model="dialog" persistent transition="dialog-bottom-transition" width="500">
    
  </v-dialog>
</template>

<script>
export default {
  name: "loginDialog",
  data() {
    return {
      dialog: false,
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
    show() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.errorText = "";
      this.error = false;
      this.email = "";
      this.password = "";
    },
    login() {

      this.loading = true;
      let loginData = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("login", loginData).then((response) => {
        if (response == "success") {
          this.loading = false;
          this.close();
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

