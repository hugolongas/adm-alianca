<template>
  <v-container class="covers">
    <v-progress-linear
      color="deep-purple"
      height="10"
      indeterminate
      v-if="loading"
    ></v-progress-linear>
    <v-card>
      <v-card-title>
        Editar Portada
        <v-spacer></v-spacer>
        <v-card>
          <v-card-text>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  fab
                  :to="{ name: 'cover' }"
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
            <v-col cols="12" md="8">
              <v-card>
                <v-card-text>
                  <v-text-field
                    v-model="cover.title"
                    label="Títol de la portada"
                    placeholder="Títol de la portada"
                  ></v-text-field>
                  <v-text-field
                    v-model="cover.url"
                    label="Enllaç de la portada"
                    placeholder="Enllaç de la portada"
                  ></v-text-field>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col
              cols="12"
              md="4"
              v-for="(md, i) in mediaDefinitions"
              :key="i"
            >
              <mediaLoader
                :attachments="medias[md.type]"
                :mediaDefinition="md"
                :id="cover.id"
              >
              </mediaLoader>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import MediaLoader from "../parts/MediaLoader.vue";
export default {
  components: { MediaLoader },
  name: "CoverEdit",
  data() {
    return {
      loading: false,
      cover: [],
      originalCover: "",
      medias: [],
    };
  },
  beforeCreate() {
    this.loading = true;
    var that = this;
    var id = this.$route.params.id;
    this.$http.get("covers/get/" + id).then((response) => {
      var resp = response.data;
      if (resp.success) {
        that.cover = resp.result;
        that.originalCover = JSON.stringify(that.cover);
        that.$http.get("covers/attachments/" + id).then((response) => {
          var resp = response.data;
          if (resp.success) {
            console.log("attachments:", resp.result);
            that.medias = resp.result;
            that.loading = false;
          }
        });
      } else {
        this.$router.push({ name: "covers" });
      }
    });
  },
  mounted() {},

  computed: {
    mediaDefinitions() {
      return this.$store.getters.mediaDefinitionsForCover;
    },
    hasChanges() {
      var result = this.originalCover == JSON.stringify(this.cover);
      return result;
    },
  },
  methods: {
    save() {
      this.loading = true;
      var that = this;
      this.$http.put("covers/update", this.cover).then((response) => {
        var resp = response.data;
        if (resp.success) {
          console.log(resp.result);
          that.cover = resp.result;
          that.originalCover = JSON.stringify(that.cover);
          that.loading = false;
        } else {
          this.showError("hi ha hagut un error");
        }
      });
    },
    remove() {
      this.loading = true;
      var coverId = this.cover.id;
      this.$http.delete("covers/delete/" + coverId).then((response) => {
        console.log(response);
        if (response.data.result) {
          this.showSuccess("Element de portada Eliminada");
          this.$router.push({ name: "covers" });
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
.covers {
  padding-bottom: 100px;
}
</style>