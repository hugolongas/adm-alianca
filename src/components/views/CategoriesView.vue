<template>
  <v-container class="container category">
    <v-card>
      <v-card-title>
        Categories
        <v-spacer></v-spacer>
        <v-card>
          <v-card-text>            
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="green"
                  fab
                  @click="create"
                  small
                  dark
                  class="mx-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>Crear</span>
            </v-tooltip>
          </v-card-text>
        </v-card>
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
                    :to="{ name: 'categoryEdit', params: { id: item.id } }"
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
  name: "CategoryView",
  data() {
    return {
      loading: false,
      headers: [
        {
          text: "Categoria",
          align: "start",
          value: "name",
        },
        { text: "Url", value: "lower_name" },
        { text: "Accions", value: "actions", sortable: false },
      ],
    };
  },
  beforeCreate() {
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