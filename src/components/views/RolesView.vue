<template>
  <v-container class="container parners">
    <v-card>
      <v-card-title>
        Usuaris
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
                <v-layout align-center justify-end>
                  <v-btn
                    depressed
                    text
                    dark
                    color="primary"
                    title="Editar"
                    :disabled="loading"
                    :to="{ name: 'roleEdit', params: { id: item.id } }"
                  >
                    Editar
                  </v-btn>
                </v-layout>
              </div>
            </template>
          </v-data-table>
        </v-container>

        <RoleCreate ref="ucdg" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import RoleCreate from "@/components/dialogs/RoleCreate";
export default {
  components: { RoleCreate },
  name: "RolesView",
  data() {
    return {
      loading: false,
      headers: [
        {
          text: "Role",
          align: "start",
          value: "name",
        },
        { text: "Accions", value: "actions", sortable: false },
      ],
    };
  },
  created() {
    this.loading = true;
    this.$store.dispatch("syncRoles").then(() => {
      this.loading = false;
    });
  },
  mounted() {},
  computed: {
    items() {
      return this.$store.getters.roles;
    },
  },
  methods: {
    create() {
      this.$refs.ucdg.show();
    },
  },
};
</script>
<style scoped>
.users {
  padding-bottom: 100px;
}
</style>