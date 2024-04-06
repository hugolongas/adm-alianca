<template>
  <v-container class="category">
    <v-progress-linear
      color="deep-purple"
      height="10"
      indeterminate
      v-if="loading"
    ></v-progress-linear>
    <v-card>
      <v-card-title>
        Usuari
        <v-spacer></v-spacer>
        <v-card>
          <v-card-text>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  fab
                  :to="{ name: 'users' }"
                  small
                  dark
                  class="mx-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </template>
              <span>Tornar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="green"
                  fab
                  @click="save()"
                  small
                  v-show="!hasChanges"
                  dark
                  class="mx-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </template>
              <span>Guardar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="error"
                  fab
                  @click="remove()"
                  small
                  dark
                  class="mx-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
          </v-card-text>
        </v-card>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="8">
              <v-form>
                <v-text-field label="Nom usuari" v-model="user.name"></v-text-field>
                <v-text-field label="Email" v-model="user.email"></v-text-field>
                <v-text-field
                  v-model="user.password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  label="Contrasenya (deixar buit si no es vol modificar)"
                  counter
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "UserEdit",
  data() {
    return {
      loading: false,
      user: [],
      originalUser: "",
      showPassword: false,
    };
  },
  beforeCreate() {
    this.loading = true;
    var that = this;
    var id = this.$route.params.id;
    this.$http.get("users/get/" + id).then((response) => {
      var resp = response.data;
      if (resp.success) {
        that.user = resp.result;
        that.originalUser = JSON.stringify(that.user);
        that.loading = false;
      } else {
        //this.showError("hi ha hagut un error");
        this.$router.push({ name: "users" });
      }
    });
  },
  mounted() {},
  computed: {
    hasChanges() {
      var result = this.originalUser == JSON.stringify(this.user);
      return result;
    },
  },
  methods: {
    save() {
      this.loading = true;
      var that = this;
      this.$http.put("users/update", this.user).then((response) => {
        var resp = response.data;
        if (resp.success) {
          console.log(resp.result);
          that.user = resp.result;
          that.originalUser = JSON.stringify(that.user);
          that.loading = false;
          this.showSuccess("Usuari Modificat");
        } else {
          this.showError("hi ha hagut un error");
        }
      });
    },
    remove() {
      this.loading = true;
      var id = this.user.id;
      this.$http.delete("users/delete/" + id).then((response) => {
        console.log(response);
        if (response.data.result) {
          this.showSuccess("Usuari Eliminat");
          this.$router.push({ name: "users" });
        } else {
          let error = response.data.result;
          this.loading = false;
          this.showError(error);
        }
      });
    },
  },
};
</script>

<style scoped>
.categories {
  padding-bottom: 100px;
}
</style>