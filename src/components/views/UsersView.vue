<template>
  <v-container class="categories">
    <h1 class="title">Categories</h1>
    <div>
      
        <v-btn @click="create" small>
          <v-icon>
            mdi-register-outline
          </v-icon>
          Crear Categoria
        </v-btn>
    </div>
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
                :to="{name: 'categoryEdit', params: { id: item.id}}"
              >
                Editar
              </v-btn>
            </v-layout>
          </div>
        </template>
      </v-data-table>
    </v-container>
    
    <CategoryCreate ref="ccdg" />
  </v-container>
</template>

<script>

import CategoryCreate from "@/components/dialogs/CategoryCreate";
export default {
  components: { CategoryCreate},
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
        { text: "Url", value: "slug" },
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
    create(){
      this.$refs.ccdg.show();
    }
  },
};
</script>
<style scoped>
.categories {
  padding-bottom: 100px;
}
</style>