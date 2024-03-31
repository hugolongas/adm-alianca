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
        <div v-if="hasAttachment" class="media-container">
          <v-img :src="mediaUrl" class="activity-img"></v-img>

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
        </div>
        <template v-if="!hasAttachment">
          <div>
            <div :class="computedClasses">
              <canvas
                ref="previewCanvas"
                class="picture-preview"
                tabindex="0"
                @drag.stop.prevent=""
                @dragover.stop.prevent=""
                @dragstart.stop.prevent=""
                @dragend.stop.prevent=""
                @dragenter.stop.prevent="onDragEnter"
                @dragleave.stop.prevent="onDragLeave"
                @drop.stop.prevent="onFileDrop"
                @click.prevent="onClick"
                @keyup.enter="onClick"
              >
                <!-- :style="{height: previewHeight + 'px', zIndex: zIndex + 1 }" -->
              </canvas>
              <div class="picture-inner">
                <span
                  class="picture-inner-text"
                  v-html="'Arrosega els fitxers aqui'"
                ></span>
              </div>
            </div>
            <input
              ref="fileInput"
              type="file"
              @change="onFileChange"
              style="display: none"
            />
          </div>
        </template>
      </div>
    </v-card-text>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Pujar poster</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="AddAttachment"> Guardar </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
          v-if="loading"
        ></v-progress-linear>
        <v-container grid-list-xl fluid>
          <v-layout flex-child wrap>
            <v-flex sm4>
              <div>
                <form>
                  <div class="form-group">
                    <div class="border p-2 mt-3">
                      <cropper
                        ref="cropper"
                        class="cropper my-cropper"
                        @change="onCropChange"
                        :stencilProps="currentStencilProps"
                        :src="currentMedia.data"
                        :defaultSize="() => mdSize"
                      >
                      </cropper>
                    </div>
                  </div>
                </form>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import config from "@/config";
export default {
  name: "mediaLoader",

  components: { Cropper },
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
    id: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      localAttachment: this.attachments,
      dialog: false,
      loading: false,
      currentMedia: {
        id: 0,
        title: "",
        fileName: "",
        fileSize: "",
        fileType: "",
        data: "",
        width: 0,
        height: 0,
      },
      draggingOver: false,

      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
      images: [],
    };
  },
  watch: {
    attachments() {      
      console.log(this.attachments);
      this.localAttachment = this.attachments;
    },

    currentCropData() {
      this.$nextTick(() => {
        if (this.$refs.cropper == null) return;
        this.$refs.cropper.src = this.currentCropData;
        //this.$log("Setting coords, a/r: " + this.currentStencilProps.aspectRatio)
        this.initCoordinates();
      });
    },
  },
  computed: {
    attachment() {
      console.log(this.localAttachment);
      return this.localAttachment;
    },
    mediaUrl() {
      return config.webUrl + "storage/" + this.localAttachment.url;
    },

    hasAttachment() {
      if (this.localAttachment != null) return true;
      return false;
    },

    mdSize() {
      return {
        width: this.mediaDefinition.width,
        height: this.mediaDefinition.height,
      };
    },
    currentStencilProps() {
      return {
        aspectRatio: parseInt(this.mdSize.width) / parseInt(this.mdSize.height),
      };
    },
    computedClasses() {
      const classObject = {
        "preview-container": true,
        "dragging-over": this.draggingOver,
      };
      return classObject;
    },
  },
  methods: {
    show() {
      this.dialog = true;
    },
    close() {
      //this.currentMedia = null;
      this.dialog = false;
    },
    onClick() {
      this.$refs.fileInput.click();
    },

    onDragEnter() {
      this.draggingOver = true;
    },
    onDragLeave() {
      this.draggingOver = false;
    },
    onFileDrop(e) {
      this.onDragLeave();
      this.onFileChange(e);
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      this.filesTarget = e.target || e.dataTransfer;

      this.previewImage(files);
      this.show();
    },

    initCoordinates() {
      if (this.$refs.cropper == null) return;

      this.$refs.cropper.setCoordinates(({ imageSize }) => {
        let width = this.mdSize.width * 1.1;
        let height = this.mdSize.height * 1.1;
        let left = Math.floor(imageSize.width / 2 - width / 2);
        let top = Math.floor(imageSize.height / 2 - height / 2);
        return {
          width: width,
          height: height,
          left: left,
          top: top,
        };
      });
    },

    previewImage(files) {
      console.log(files);
      var that = this;
      var myFiles = Array.isArray(files) ? files : [...files];
      this.images = myFiles.slice(0, 1).map(function (file /*, i*/) {
        var names = file.name.split(".");
        names.pop();
        let title = names.join(" ");
        title = title.replace(/[-_]/g, " ");
        title = title.replace(/\d+x\d+/i, " ").trim();

        var result = {
          id: 0,
          title: title,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          data: "",
          width: 0,
          height: 0,
          url: "",
        };
        let reader = new FileReader();
        reader.onload = (e) => {
          result.data = e.target.result;

          var myImage = new Image();
          myImage.onload = () => {
            result.width = myImage.width;
            result.height = myImage.height;

            if (that.currentCropData == "") that.currentCropData = myImage.src;
          };

          myImage.src = result.data;
        };
        reader.readAsDataURL(file);

        return result;
      });

      if (this.images.length <= 0) return;
      this.currentMedia = this.images[0];
    },

    AddAttachment() {
      var that = this;
      this.loading = true;

      let payload = {
        id: this.id,
        image: this.currentMedia,
        mediaDefinition: this.mediaDefinition,
        cropInfo: this.coordinates,
      };
      console.log("payload: ", payload)
      this.$http
        .post("media/addatachment", payload)
        .then((response) => {
          if (response.status == 200) {
            if (response.data.success) {
              that.localAttachment = response.data.result;
              this.showSuccess("imatge adjunta correctament");
            }
          } else {
            console.log(response);
          }
          that.loading = false;
          that.dialog = false;
        })
        .catch((error) => {
          console.log(error);
          this.showError(error);
          this.loading = false;          
        });
    },

    onCropChange({ coordinates, canvas }) {
      this.coordinates = coordinates || {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      };
      if (canvas != null && this.mustCrop)
        this.croppedImage = canvas.toDataURL();
    },
    removeAttachment(id) {
      this.loading = true;
      if (id > 0) {
        this.$http.delete("/media/removeattachment/" + id).then((response) => {
          if (response.data.success) {
            this.localAttachment = null;
            this.loading = false;
            this.showSuccess("imatge Eliminada correctament");
          }
        });
      }
    },
  },
};
</script>

<style lang="less">
.media-container {
  position: relative;
  .activity-img {
    position: relative;
  }
  .delete-img {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}

.picture-preview {
  // canvas
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  //z-index: 1;
  box-sizing: border-box;
  background-color: rgba(200, 200, 200, 0.25);
  min-height: 150px;

  transition: background-color 0.3s ease-out;

  .theme--dark & {
    background-color: rgba(55, 55, 55, 0.25);
  }
}

.preview-container {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  cursor: pointer;
  overflow: hidden;

  max-height: 300px;

  .picture-preview {
    // canvas
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    //z-index: 1;
    box-sizing: border-box;
    background-color: rgba(200, 200, 200, 0.25);
    min-height: 150px;

    transition: background-color 0.3s ease-out;

    .theme--dark & {
      background-color: rgba(55, 55, 55, 0.25);
    }
  }

  .picture-inner {
    position: absolute;
    top: 0;
    //z-index: 2;
    pointer-events: none;
    box-sizing: border-box;
    //margin: 1em auto;
    //padding: 0.5em;
    border: 0.3em dashed rgba(66, 66, 66, 0.15);
    //border-radius: 8px;
    //width: calc(100% - 2.5em);
    //height: calc(100% - 2.5em);
    display: table;
    width: 100%;
    height: 100%;
    margin: 20px;
    max-width: calc(100% - 20px * 2);
    max-height: calc(100% - 20px * 2);

    transition: border-color 0.3s ease-out;

    .theme--dark & {
      border-color: rgba(255, 255, 255, 0.75);
    }

    .picture-inner-text {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      font-size: 25px;
      line-height: 1.5;
      color: #2c3e50;
      padding: 0 10%;

      transition: all 0.3s ease-out;

      .theme--dark & {
        color: rgba(255, 255, 255, 0.75);
      }
    }
  }

  &.dragging-over {
    .picture-preview {
      //filter: brightness(0.5);
      background-color: #ff9e9e;

      .media-creator.primary & {
        background-color: #454545;
      }
    }

    .picture-inner {
      border-color: rgba(255, 255, 255, 0.75);

      .picture-inner-text {
        color: #fff;
      }
    }
  }
}
</style>