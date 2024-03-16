<template>
  <v-container class="activityMedia">
    <v-progress-linear
      color="deep-purple"
      height="10"
      indeterminate
      v-if="loading"
    ></v-progress-linear>
    <v-card>
      <v-card-title>
        <h2>
          Imatges de l'Activitat
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                icon
                :to="{ name: 'activityEdit', params: { id: activityId } }"
                small
                class="mx-2"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-text-box-edit-outline</v-icon>
              </v-btn>
            </template>
            <span>Editar Activitat</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                icon
                :to="{
                  name: 'activityMultimedia',
                  params: { id: activityId },
                }"
                small
                class="mx-2"
                v-bind="attrs"
                v-on="on"
                disabled
              >
                <v-icon>mdi-image-edit-outline</v-icon>
              </v-btn>
            </template>
            <span>Editar Text</span>
          </v-tooltip>
        </h2>
        <v-spacer></v-spacer>
        <v-card>
          <v-card-text>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  fab
                  :to="{ name: 'activities' }"
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
          </v-card-text>
        </v-card>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
              v-for="(md, i) in mediaDefinitions"
              :key="i"
            >
              <mediaLoader
                :attachments="medias[md.type]"
                :mediaDefinition="md"
                :activityId="activityId"
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
  name: "ActivityMultimedia",
  data() {
    return {
      loading: false,
      activityId: null,
      medias: [],
    };
  },
  beforeCreate() {},
  mounted() {
    this.load();
  },
  computed: {
    mediaDefinitions() {
      return this.$store.getters.mediaDefinitions;
    },
  },
  methods: {
    load() {
      this.loading = true;
      var that = this;
      this.activityId = this.$route.params.id;
      console.log(this.activityId);
      this.$http
        .get("activity/attachments/" + this.activityId)
        .then((response) => {
          var resp = response.data;
          if (resp.success) {
            that.medias = resp.result;
            that.loading = false;
          }
        });
    },
  },
};
</script>

<style scoped>
.activityMedia {
  padding-bottom: 100px;
}
</style>