<template>
  <v-dialog
    v-model="dialog"
    persistent
    transition="dialog-bottom-transition"
    width="800"
  >
    <v-card>
      <v-toolbar color="" dark flat>
        <v-toolbar-title>Crear Rol</v-toolbar-title>
      </v-toolbar>
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
        v-if="loading"
      ></v-progress-linear>
      <v-container grid-list-xl fluid>
        <v-layout flex-child wrap>
          <v-flex sm12>
            <v-form>
              <v-text-field
                v-model="role.name"
                class="form-input"
                type="text"
                id="name"
                required
                placeholder="Rol"
              ></v-text-field>
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
  name: "RoleCreate",

  data() {
    return {
      dialog: false,
      loading: false,
      role: {
        name: "",
      },
    };
  },
  methods: {
    show() {
      this.dialog = true;
    },
    close() {
      this.role.name= ""
      this.dialog = false;
    },
    create() {
      this.loading = true;
      this.$http.post("roles/create", this.role).then((response) => {
        if (response.status == 200) {
          this.loading = false;
          this.$store.dispatch("syncRoles");
          this.close();
          this.showSuccess("Rol Creat");
        } else {
          let resp = response.data;
          if (!resp.success) this.showError(resp.result);
          this.loading = false;
        }
      });
    },
  },
};
</script>

