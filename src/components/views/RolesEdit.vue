<template>
  <v-container class="category">
    <v-progress-linear color="deep-purple" height="10" indeterminate v-if="loading"></v-progress-linear>
    <v-card>
      <v-card-title>
        Rols
        <v-spacer></v-spacer>
        <v-card>
          <v-card-text>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" fab :to="{ name: 'roles' }" small dark class="mx-2" v-bind="attrs"
                  v-on="on">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </template>
              <span>Tornar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="green" fab @click="save()" small v-show="!hasChanges" dark class="mx-2" v-bind="attrs"
                  v-on="on">
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </template>
              <span>Guardar</span>
            </v-tooltip>
            <v-tooltip bottom>

              <template v-slot:activator="{ on, attrs }">

                <v-btn color="error" fab @click="remove()" small dark class="mx-2" v-bind="attrs" v-on="on">
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
          <v-form>
            <v-text-field v-model="role.name"></v-text-field>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "RoleEdit",
  data() {
    return {
      loading: false,
      role: [],
      originalRole: "",
    };
  },
  beforeCreate() {
    this.loading = true;
    var that = this;
    var id = this.$route.params.id;
    this.$http.get("roles/get/" + id).then((response) => {
      var resp = response.data;
      if (resp.success) {
        that.role = resp.result;
        that.originalRole = JSON.stringify(that.role);
        that.loading = false;
      } else {
        //this.showError("hi ha hagut un error");
        this.$router.push({ name: "roles" });
      }
    });
  },
  mounted() { },
  computed: {
    hasChanges() {
      var result = this.originalRole == JSON.stringify(this.role);
      return result;
    },
  },
  methods: {
    save() {       
      this.loading = true;
      var that = this;
      this.$http.put("roles/update", this.role).then((response) => {
        var resp = response.data;
        if (resp.success) {
          console.log(resp.result);
          that.role = resp.result;
          that.originalRole = JSON.stringify(that.role);
          that.loading = false;
          this.showSuccess("Rol Modificat");
        } else {
          this.showError("hi ha hagut un error");
        }
      });
    },
    remove() {
      this.loading = true;
      var id = this.role.id;
      this.$http.delete("roles/delete/" + id).then((response) => {
        console.log(response);
        if (response.data.result) {
          this.showSuccess("Rol Eliminat");
          this.$router.push({ name: "roles" });
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