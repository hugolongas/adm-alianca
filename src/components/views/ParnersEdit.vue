<template>
  <v-container class="partner">
    <v-progress-linear
      color="deep-purple"
      height="10"
      indeterminate
      v-if="loading"
    ></v-progress-linear>
    <v-card>
      <v-card-title>
        Tipus de soci
        <v-spacer></v-spacer>
        <v-card>
          <v-card-text>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  fab
                  :to="{ name: 'categories' }"
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
                  color="primary"
                  fab
                  @click="save()"
                  small
                  v-show="!hasChanges"
                  dark
                  class="mx-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-pencil-outline</v-icon>
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
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="partner.name"
                  label="Tipus de Soci"
                  placeholder="Tipus de Soci"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="partner.price"
                  label="Preu inscripció"
                  placeholder="Preu inscripció"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <h2>Informació</h2>
                <ckeditor
                  :editor="editor"
                  v-model="partner.info"
                ></ckeditor>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  name: "ParnersEdit",
  data() {
    return {
      loading: false,
      partner: [],
      originalPartner: "",
      editor: ClassicEditor,
    };
  },
  beforeCreate() {
    this.loading = true;
    var that = this;
    var id = this.$route.params.id;
    this.$http.get("parners/get/" + id).then((response) => {
      var resp = response.data;
      if (resp.success) {
        that.partner = resp.result;
        that.originalPartner = JSON.stringify(that.partner);
        that.loading = false;
      } else {
        //this.showError("hi ha hagut un error");
        this.$router.push({ name: "partners" });
      }
    });
  },
  mounted() {},
  computed: {
    hasChanges() {
      var result = this.originalPartner == JSON.stringify(this.partner);
      return result;
    },
  },
  methods: {
    save() {},
    remove() {
      this.loading = true;
      var partnerId = this.partner.id;
      this.$http.delete("parners/delete/" + partnerId).then((response) => {
        console.log(response);
        if (response.data.result) {
          this.showSuccess("Tipus de soci Eliminat");
          this.$router.push({ name: "partners" });
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
.partner {
  padding-bottom: 100px;
}
</style>