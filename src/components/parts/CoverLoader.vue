<template>
  <v-card class="mediaLoader">
    <v-card-text>
      <v-toolbar color="#f1f1f1" flat>
        <v-toolbar-title>{{ localCover.title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :to="{ name: 'coverEdit', params: { id: item.id } }"
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
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              top
              @click="removeAttachment(attachment.id)"
              small
              class="mx-2 delete-img"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-delete-forever-outline</v-icon>
            </v-btn>
          </template>
          <span>Eliminar imatge</span>
        </v-tooltip>
      </v-toolbar>
      <div class="media">
        <div v-if="hasAttachment" class="media-container">
          <v-img :src="mediaUrl" class="activity-img"></v-img>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "coverLoader",
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
      localCover: this.cover,
      dialog: false,
      loading: false,
    };
  },
  watch: {
    attachments() {
      this.localCover = this.cover;
    },
  },
  computed: {},
  methods: {},
};
</script>

<style lang="less">
</style>