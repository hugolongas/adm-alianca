<template>
  <v-container class="container category">
    <v-card>
      <v-card-title>
        Activitats
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
            <template v-slot:[`item.published`]="{ item }">
              <div>
                <v-layout align-center>
                  <v-btn v-if="item.published == false" icon>
                    <v-icon>mdi-toggle-switch-off</v-icon>
                  </v-btn>
                  <v-btn v-if="item.published == true" icon>
                    <v-icon>mdi-toggle-switch-on</v-icon>
                  </v-btn>
                </v-layout>
              </div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <div class="actions">
                <v-layout align-center>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        :to="{ name: 'activityEdit', params: { id: item.id } }"
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
          </v-data-table>
        </v-container>

        <ActivityCreate ref="acdg" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import ActivityCreate from "@/components/dialogs/ActivityCreate";
export default {
  components: { ActivityCreate },
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
        { text: "Data Activitat", value: "date" },
        { text: "Hora Activitat", value: "time" },
        { text: "Url", value: "url" },
        { text: "Publicat", value: "published" },
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
      return this.$store.getters.activities;
    },
  },
  methods: {
    load() {
      if (this.items == null || this.items.length == 0) {
        this.$store.dispatch("syncActivities");
      }      
      this.loading = false;
    },
    create() {
      this.$refs.acdg.show();
    },
  },
};
</script>
<style scoped>
.categories {
  padding-bottom: 100px;
}
</style>