<template>
  <v-dialog
    v-model="dialog"
    persistent
    transition="dialog-bottom-transition"
    width="800"
  >
    <v-card>
      <v-toolbar color="" dark flat>
        <v-toolbar-title>Crear Categoria</v-toolbar-title>
      </v-toolbar>
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
        v-if="loading"
      ></v-progress-linear>
      <v-container grid-list-xl fluid>
        <v-layout flex-child wrap>
          <v-flex sm12>
            <v-form>
              <v-text-field
                v-model="form.title"
                class="form-input"
                type="text"
                id="title"
                required
                placeholder="Títol Activitat"
              ></v-text-field>
              <v-select
                v-model="form.category"
                :items="items"
                item-text="name"
                item-value="id"
                label="Categoria"
              ></v-select>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="close">tornar</v-btn>
        <v-btn color="green darken-1" @click="create">Crear</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ActivityCreate",

  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        title: "",
        category: 0,
      },
    };
  },
  created() {
    if (this.items == null || this.items.length <= 0) {
      this.$store.dispatch("syncCategories");
    }
  },
  computed: {
    items() {
      return this.$store.getters.categoriesForSelect;
    },
  },
  methods: {
    show() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    create() {
      this.loading = true;
      //var that = this;
      this.$http
        .post("activity/create", this.form)
        .then((response) => {
          if (response.status == 200) {
            var activity = response.data.result;
            console.log(activity.id);
            this.loading = false;
            this.$store.dispatch("syncActivities");
            this.close();
            this.showSuccess("Activitat Creada");
            this.$router.push({
              name: "activityEdit",
              params: { id: activity.id },
            });
          } else {
            let resp = response.data;
            if (!resp.success) this.showError(resp.result);
            this.loading = false;
          }
        })
        .catch((error) => {
          this.showError(error);
          this.loading = false;
          this.dialog = false;
        });
    },
  },
};
</script>

