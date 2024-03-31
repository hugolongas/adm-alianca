<template>
  <v-container fluid class="cover">
    <v-progress-linear
      color="deep-purple"
      height="10"
      indeterminate
      v-if="loading"
    ></v-progress-linear>
    <v-card>
      <v-card-title>
        Portada
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
              <span>Afegir element de portada</span>
            </v-tooltip>
          </v-card-text>
        </v-card>
      </v-card-title>
      <v-card-text>
        <v-row dense align="center" justify="center">
          <v-col cols="6"
            ><v-row dense>
              <v-col v-for="(item, i) in items" :key="i" :cols="setColSize(i)">
                <CoverItem :cover="item" />
              </v-col> </v-row
          ></v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
  
<script>
import CoverItem from "../parts/CoverItem.vue";
export default {
  name: "CoverView",
  components: { CoverItem },
  data() {
    return {
      loading: false,
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
      return this.$store.getters.covers;
    },
  },
  methods: {
    load() {
      this.$store.dispatch("syncCovers");
      this.loading = false;
    },

    setColSize(i) {
      if (i == 0) {
        console.log("setCoverClass big: ", i);
        return 12;
      }
      var elements = this.items;
      console.log("setCoverClass elements: " + elements);
      var total = elements.length;
      console.log("setCoverClass total: " + total + " persent: " + (total % 2));
      if (total % 2 == 0 && i == 1) {
        console.log("setCoverClass big: ", i);
        return 12;
      }
      console.log("setCoverClass small: ", i);
      return 6;
    },
    create() {
      this.loading = true;
      //var that = this;
      this.$http
        .post("covers/create", this.form)
        .then((response) => {
          if (response.status == 200) {
            var cover = response.data.result;
            console.log(cover.id);
            this.loading = false;
            this.$store.dispatch("syncCovers");
            this.showSuccess("Element de portada afegit");
            this.$router.push({
              name: "coverEdit",
              params: { id: cover.id },
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