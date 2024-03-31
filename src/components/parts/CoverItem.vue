<template>
  <v-card class="CoverItem">
    <v-card-text>
      <v-toolbar color="#f1f1f1" flat>
        <v-toolbar-title><h3>{{ cover.title }}</h3>
          </v-toolbar-title>        
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :to="{ name: 'coverEdit', params: { id: cover.id } }"
              icon
              small
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </template>
          <span>Editar</span>
        </v-tooltip>
      </v-toolbar>
      <div class="media">
        <div class="media-container" :v-show="hasAttachment">
          <v-img :src="mediaUrl" width="100%" />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import config from "@/config";
export default {
  name: "CoverItem",
  props: {
    cover: {
      type: Object,
      default: function () {
        return null;
      },
    },
  },
  data() {
    return {
      medias: {
        cover: {
          url: "",
        },
      },
    };
  },
  beforeCreate() {},
  mounted() {
    this.load();
  },
  computed: {
    mediaUrl() {
      return config.webUrl + "storage/" + this.medias["cover"].url;
    },
    hasAttachments() {
      return this.medias["cover"].url != "";
    },
  },
  methods: {
    load() {
      var that = this;
      console.log(this.cover.id);
      this.$http.get("covers/attachments/" + this.cover.id).then((response) => {
        var resp = response.data;
        if (resp.success) {
          if (resp.result.length != 0) {
            that.medias = resp.result;
          }
        }
      });
    },
  },
};
</script>

<style lang="less">
</style>