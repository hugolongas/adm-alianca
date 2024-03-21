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
        <v-container>
          <v-select
            v-model="cover.cover_type"
            label="Select"
            :items="coverTypes"
            v-on:change="setCoverType"
          ></v-select>
          <v-form v-if="cover.cover_type == 'Cover'">
            <v-text-field v-model="cover.title"></v-text-field>
          </v-form>
          <v-form v-if="cover.cover_type == 'Activity'">
            <v-text-field v-model="cover.title"></v-text-field>
            <v-img :src="mediaUrl" class="activity-img"></v-img>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

import config from "@/config";
export default {
  name: "CoverEdit",
  data() {
    return {
      loading: false,
      cover: [],
      coverTypes: ["Activity", "Cover"],
      originalCover: "",
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
        that.loading = false;
      } else {
        this.$router.push({ name: "covers" });
      }
    });
  },
  mounted() {},
  computed: {
    hasChanges() {
      var result = this.originalCover == JSON.stringify(this.cover);
      return result;
    },
    
    mediaUrl() {
      return config.webUrl + "storage/" + this.localAttachment.url;
    },
  },
  methods: {
    setCoverType(e) {
      console.log(e);
    },
    save() {},
    addAttachment() {},
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