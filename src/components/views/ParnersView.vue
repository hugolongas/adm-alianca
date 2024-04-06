<template>
  <v-container class="container parners">
    <v-card>
      <v-card-title>
        Tipus de Socis
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
            :items="items"
            :items-per-page="5"
            class="elevation-1"
            :loading="loading"
          >
          <template v-slot:[`item.actions`]="{ item }">
              <div class="actions">
                <v-layout align-center>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        :to="{ name: 'parnersEdit', params: { id: item.id } }"
                        small
                        color="blue"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Editar</span>
                  </v-tooltip>
                </v-layout>
              </div>
            </template>
            <template v-slot:[`item.info`]="{ item }">
              <div v-html='item.info' />
            </template>
          </v-data-table>
        </v-container>
        <parnersCreate ref="pcdg" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import parnersCreate from "@/components/dialogs/ParnersCreate";
export default {
  components: { parnersCreate },
  name: "ParnersView",
  data() {
    return {
      loading: false,
      headers: [
        {
          text: "Soci",
          align: "start",
          value: "name",
        },        
        { text: "Preu", value: "price" },
        { text: "Informació", value: "info" },
        { text: "Accions", value: "actions", sortable: false },
      ],
    };
  },
  beforeCreated() {
    this.loading = true;
  },
  mounted() {
    this.load();
  },
  computed: {
    items() {
      return this.$store.getters.parners;
    },
  },
  methods: {
    load() {
      this.$store.dispatch("syncParners");
      this.loading = false;
    },
    create() {
      this.$refs.pcdg.show();
    },
  },
};
</script>
<style scoped>
.parners {
  padding-bottom: 100px;
}
</style>