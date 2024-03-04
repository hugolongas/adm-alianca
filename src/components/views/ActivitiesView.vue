<template>
  <v-container class="container category">
    <v-card>
      <v-card-title>
        Categories
        <v-spacer></v-spacer>
        <v-btn @click="create" small>
            <v-icon> mdi-register-outline </v-icon>
            Crear Categoria
          </v-btn>
      </v-card-title>      
      <v-card-text>
        <v-container>
          <v-data-table
            :headers="headers"
            :items="categories"
            :items-per-page="5"
            class="elevation-1"
            :loading="loading"
          >
          <template v-slot:[`item.published`]="{ item }">
              <div class="actions">
                <v-layout align-center justify-end>
                  <v-btn v-if="item==false">
                    <v-icon>mdi-toggle-switch-off</v-icon>
                  </v-btn>
                  <v-btn v-if="item==true">
                    <v-icon>mdi-toggle-switch-on</v-icon>
                  </v-btn>
                </v-layout>
              </div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <div class="actions">
                <v-layout align-center justify-end>
                  <v-btn
                    depressed
                    text
                    dark
                    color="primary"
                    title="Editar"
                    :disabled="loading"
                    :to="{ name: 'activityEdit', params: { id: item.id } }"
                  >
                    Editar
                  </v-btn>
                </v-layout>
              </div>
            </template>
          </v-data-table>
        </v-container>

        <CategoryCreate ref="ccdg" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import CategoryCreate from "@/components/dialogs/CategoryCreate";
export default {
  components: { CategoryCreate },
  name: "ActivitiesView",
  data() {
    return {
      loading: false,
      headers: [
        {
          text: "Actividad",
          align: "start",
          value: "title",
        },
        { text: "Data Activitat", value:"date"},
        { text: "Hora Activitat", value:"time"},
        { text: "Url", value: "url" },
        { text: "Publicat", value: "published" },
        { text: "Accions", value: "actions", sortable: false },
      ],
    };
  },
  created() {
    this.loading = true;
    this.$store.dispatch("syncCategories").then(() => {
      this.loading = false;
    });
  },
  mounted() {},
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
  },
  methods: {
    create() {
      this.$refs.ccdg.show();
    },
  },
};
</script>
<style scoped>
.categories {
  padding-bottom: 100px;
}
</style>