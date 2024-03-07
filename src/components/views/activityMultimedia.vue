<template>
  <v-container class="activityMedia">
    <v-progress-linear color="deep-purple" height="10" indeterminate v-if="loading"></v-progress-linear>
    <v-card>
      <v-card-title>
        Activitat:
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" icon :to="{ name: 'activityEdit', params: { id: activityId } }" small class="mx-2"
              v-bind="attrs" v-on="on">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <span>Editar Text</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" icon :to="{ name: 'activityMultimedia', params: { id: activityId } }" small
              class="mx-2" v-bind="attrs" v-on="on">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <span>Editar Text</span>
        </v-tooltip>
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
          </v-card-text>
        </v-card>
      </v-card-title>
      <v-card-text>
        <v-container>
          <template v-for="(mediatype, i) in mediaTypes">
            <v-card :key=i>
              <v-card-text>
                {{ mediatype }}
              </v-card-text>
            </v-card>
          </template>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ActivityMultimedia",
  data() {
    return {
      loading: false,
      activityId: 0,
      medias: [],
      mediaTypes: ["cover", "activity"]
    };
  },
  beforeCreate() { },
  mounted() {
    this.load();
  },
  computed: {
  },
  methods: {
    load() {
      this.loading = true;
      var that = this;
      var id = this.$route.params.id;
      this.$http.get("activity/getMedias/" + id).then((response) => {
        var resp = response.data;
        if (resp.success) {
          console.log(resp.result);
          that.medias = resp.result;
          that.loading = false;
        }
      });
    },
    loadMedia() {
      console.log("load media");

    },
    removeMedia() {
      console.log("removeMedia");
    },
  },
};
</script>

<style scoped>
.activityMedia {
  padding-bottom: 100px;
}
</style>