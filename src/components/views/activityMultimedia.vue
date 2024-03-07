<template>
  <v-container class="category">
    <v-progress-linear
      color="deep-purple"
      height="10"
      indeterminate
      v-if="loading"
    ></v-progress-linear>
    <v-card>
      <v-card-title>
        Activitat:
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              icon
              :to="{ name: 'activityEdit', params: { id: activity.id } }"
              small
              class="mx-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <span>Editar Text</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              icon
              :to="{ name: 'activityMultimedia', params: { id: activity.id } }"
              small
              class="mx-2"
              v-bind="attrs"
              v-on="on"
            >
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
            <v-tooltip bottom v-if="!isPublished">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="warning"
                  fab
                  @click="publish()"
                  small
                  dark
                  class="mx-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-publish</v-icon>
                </v-btn>
              </template>
              <span>Publicar</span>
            </v-tooltip>
            <v-tooltip bottom v-if="isPublished">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="warning"
                  fab
                  @click="unpublish()"
                  small
                  dark
                  class="mx-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-publish-off</v-icon>
                </v-btn>
              </template>
              <span>Despublicar</span>
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
          <v-form>
            <v-text-field
              v-model="activity.title"
              label="Títol de l'activitat"
              placeholder="Títol de l'activitat"
            ></v-text-field>
            Url: {{ SlugName }}

            <v-card outlined>
              <v-card-title> Informació básica </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-select
                      v-model="activity.category_id"
                      :items="categories"
                      item-text="name"
                      item-value="id"
                      label="Categoria"
                    ></v-select>
                  </v-col>
                  <v-col cols="6" sm="4">
                    <v-menu
                      v-model="showDatePicker"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="computedDateFormatted"
                          label="Data Activitat"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="activity.date"
                        @input="showDatePicker = false"
                        locale="cat"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6" sm="4">
                    <v-menu
                      ref="menuTime"
                      v-model="showTime"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="activity.time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="activity.time"
                          label="Hora activitat"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="showTime"
                        v-model="activity.time"
                        full-width
                        @click:minute="$refs.menuTime.save(activity.time)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <h2>Resum activitat</h2>
                    <ckeditor
                      :editor="editor"
                      v-model="activity.summary"
                    ></ckeditor>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card>
              <v-card-title> Informació Adicional </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="activity.price"
                      label="Preu de l'activitat"
                      placeholder="Preu de l'activitat"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="activity.buy_url"
                      label="Enllaç de compra"
                      placeholder="Enllaç de compra"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <h2>Descripció activitat</h2>
                    <ckeditor
                      :editor="editor"
                      v-model="activity.description"
                    ></ckeditor>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  name: "ActivityEdit",
  data() {
    return {
      loading: false,
      showDatePicker: false,
      showTime: false,
      activity: [],
      originalActivity: "",
      editor: ClassicEditor,
    };
  },
  beforeCreate() {},
  mounted() {
    if (this.categories == null || this.categories.length <= 0) {
      this.$store.dispatch("syncCategories");
    }
    this.load();
  },
  computed: {
    hasChanges() {
      var result = this.originalActivity == JSON.stringify(this.activity);
      return result;
    },
    isPublished() {
      return this.activity.published;
    },
    categories() {
      return this.$store.getters.categoriesForSelect;
    },

    computedDateFormatted() {
      return this.formatDate(this.activity.date);
    },
    SlugName() {
      console.log("SlugName", this.activity);
      if (this.activity == null || this.activity.length <= 0) return "";
      console.log("SlugName ok", this.activity);
      return this.activity.category.lower_name + "/" + this.activity.url;
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    load() {
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
    save() {
      this.loading = true;
      var that = this;
      this.$http.put("activity/update", this.activity).then((response) => {
        var resp = response.data;
        if (resp.success) {
          console.log(resp.result);
          that.activity = resp.result;
          that.originalActivity = JSON.stringify(that.activity);
          that.loading = false;
        } else {
          this.showError("hi ha hagut un error");
        }
      });
    },
    publish() {
      this.loading = true;
      var that = this;
      this.$http
        .post("activity/publish/" + this.activity.id)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            that.activity = response.data.result;
            that.originalActivity = JSON.stringify(that.activity);
            that.showSuccess("Activitat Publicada");
            this.loading = false;
          } else {
            let error = response.data.result;
            that.loading = false;
            that.showError(error);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    unpublish() {
      this.loading = true;
      var that = this;
      this.$http
        .post("activity/unpublish/" + this.activity.id)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            that.activity = response.data.result;
            that.originalActivity = JSON.stringify(that.activity);
            that.showSuccess("Activitat Despublicada");
            this.loading = false;
          } else {
            let error = response.data.result;
            this.loading = false;
            this.showError(error);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    remove() {
      this.loading = true;
      this.$http
        .delete("activity/delete/" + this.activity.id)
        .then((response) => {
          console.log(response);
          if (response.data.result) {
            this.showSuccess("Activitat Eliminada");
            this.$router.push({ name: "activities" });
          } else {
            let error = response.data.result;
            this.loading = false;
            this.showError(error);
          }
        })
        .catch(function (error) {
          console.log(error);
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