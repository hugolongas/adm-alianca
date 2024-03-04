<template>
  <v-container class="category">
    <v-progress-linear color="deep-purple" height="10" indeterminate v-if="loading"></v-progress-linear>
    <v-card>
      <v-card-title>
        Activitat:
        <v-spacer></v-spacer>
        <v-card>
          <v-card-text>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" fab :to="{ name: 'activities' }" small dark class="mx-2" v-bind="attrs"
                  v-on="on">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </template>
              <span>Tornar</span>
            </v-tooltip>
            <v-tooltip bottom>

              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" fab @click="save()" small v-show="!hasChanges" dark class="mx-2" v-bind="attrs"
                  v-on="on">
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
              </template>
              <span>Guardar</span>
            </v-tooltip>
            <v-tooltip bottom v-if="!activity.published">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="warning" fab @click="publish()" small dark class="mx-2" v-bind="attrs" v-on="on">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </template>
              <span>Publicar</span>
            </v-tooltip>
            <v-tooltip bottom v-if="activity.published">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="warning" fab @click="unpublish()" small dark class="mx-2" v-bind="attrs" v-on="on">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </template>
              <span>Despublicar</span>
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
            <v-text-field v-model="activity.title" title="Títol de l'activitat"></v-text-field>
            Url: {{ this.activity.slug }}
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ActivityEdit",
  data() {
    return {
      loading: false,
      activity: [],
      originalActivity: "",
    };
  },
  beforeCreate() {
    this.loading = true;
    var that = this;
    var id = this.$route.params.id;
    this.$http.get("activity/get/" + id).then((response) => {
      var resp = response.data;
      if (resp.success) {
        console.log(resp.result);
        that.activity = resp.result;
        that.originalActivity = JSON.stringify(that.activity);
        that.loading = false;
      } else {
        //this.showError("hi ha hagut un error");
        this.$router.push({ name: "activities" });
      }
    });
  },
  mounted() { },
  computed: {
    hasChanges() {
      var result = this.originalActivity == JSON.stringify(this.activity);
      return result;
    },
  },
  methods: {
    save() { },
    remove() {
      this.loading = true;
      this.$http.delete("activity/delete/" + this.activity.id).then((response) => {
        console.log(response);
        if (response.data.result) {
          this.showSuccess("Activitat Eliminada");
          this.$router.push({ name: "activities" });
        } else {
          let error = response.data.result;
          this.loading = false;
          this.showError(error);
        }
      }).catch(function (error) {
        console.log(error.toJSON());
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