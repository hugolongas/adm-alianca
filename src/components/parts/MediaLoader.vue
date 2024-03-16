<template>
  <v-card class="mediaLoader">
    <v-card-text>
      <v-toolbar color="#f1f1f1" flat>
        <v-toolbar-title>{{ mediaDefinition.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-chip small color="orange"
          >{{ mediaDefinition.width }}x{{ mediaDefinition.height }}</v-chip
        >
      </v-toolbar>
      <div class="media">
        <template v-if="hasAttachment">                 
            <v-img :src="mediaUrl"></v-img>
            attachment: {{ localAttachment }}
            <v-btn @click="removeAttachment(localAttachment.id)">Delete</v-btn>
          
        </template>
        <template v-if="!hasAttachment">
          <attachmentLoader
            :mediaDefinition="mediaDefinition"
            :activityId="activityId"
          />
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import config from "@/config";
import AttachmentLoader from "../dialogs/AttachmentLoader.vue";
export default {
  name: "mediaLoader",
  components: { AttachmentLoader },
  props: {
    mediaDefinition: {
      type: Object,
    },
    attachments: {
      type: Object,
      default: function () {
        return null;
      },
    },
    activityId: null,
  },
  data() {
    return {
      localAttachment: this.attachments,
    };
  },
  watch: {
    attachments() {
      this.localAttachment = this.attachments;
    },
  },
  computed: {
    mediaUrl(url){
      return config.apiRootUrl+url;
    },

    hasAttachment() {         
      if (this.localAttachment !=null)
        return true;
      return false;
    },
  },
  methods: {
    removeAttachment(id) {
      if (id > 0) {
        this.$http.delete("/media/removeattachment/" + id).then((response) => {
          if (response.data.success) {
            this.localAttachment =null;
          }
        });
      }
    },
  },
};
</script>

<style>
</style>