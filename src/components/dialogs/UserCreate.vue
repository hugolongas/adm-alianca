<template>
  <v-dialog
    v-model="dialog"
    persistent
    transition="dialog-bottom-transition"
    width="800"
  >
    <v-card>
      <v-toolbar color="" dark flat>
        <v-toolbar-title>Crear Usuari</v-toolbar-title>
      </v-toolbar>
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
        v-if="loading"
      ></v-progress-linear>
      <v-alert dense outlined type="error" v-if="hasError">
        {{ this.errorMessage }}
      </v-alert>
      <v-container grid-list-xl fluid>
        <v-layout flex-child wrap>
          <v-flex sm12>
            <v-form>
              <v-text-field
                v-model="user.name"
                class="form-input"
                type="text"
                id="name"
                required
                placeholder="Nom Complert"
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                class="form-input"
                type="email"
                id="email"
                required
                placeholder="Email"
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                class="form-input"
                type="text"
                id="password"
                required
                placeholder="Contrasenya"
              ></v-text-field>
              <v-text-field
                v-model="repeatPassword"
                class="form-input"
                type="text"
                id="repeatPassword"
                required
                placeholder="Torna a indicar la contrasenya"
              ></v-text-field>

              <v-select
                v-model="user.role"
                :items="items"
                item-text="name"
                item-value="id"
                label="Rol"
              ></v-select>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn class="primary" @click="create">Crear</v-btn>
        <v-spacer></v-spacer>

        <v-btn color="red darken-1" text @click="close">tornar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "UserCreate",

  data() {
    return {
      dialog: false,
      loading: false,
      user: {
        name: "",
        email: "",
        password: "",
        role: 0,
      },
      repeatPassword: "",
      errorMessage: "",
      hasError: false,
    };
  },
  created() {
    if (this.items == null || this.items.length <= 0) {
      this.$store.dispatch("syncRoles");
    }
  },
  computed: {
    items() {
      return this.$store.getters.rolesForSelect;
    },
    passwordOk() {
      return this.user.password == this.repeatPassword;
    },
  },
  methods: {
    show() {
      this.dialog = true;
    },
    close() {
      this.user.name = "";
      this.user.email = "";
      this.user.password = "";
      this.user.role = 0;
      this.dialog = false;
    },
    create() {
      this.loading = true;
      if (this.passwordOk) {
        this.$http.post("users/create", this.user).then((response) => {
          console.log(response);          
            let resp = response.data;
            if (resp.success) {
              this.loading = false;
              this.$store.dispatch("syncUsers");
              this.close();
              this.showSuccess("Usuari Creat");
            } else {
              this.hasError = true;
              if (!resp.success) this.errorMessage = resp.result;
              this.loading = false;
            }
        });
      } else {
        this.loading = false;
        this.hasError = true;
        this.errorMessage = "Les contrasenyes no son la mateixa";
      }
    },
  },
};
</script>

