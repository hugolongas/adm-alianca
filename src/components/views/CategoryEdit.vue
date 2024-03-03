<template>
  <v-container class="category">
    <v-progress-linear color="deep-purple" height="10" indeterminate v-if="loading"></v-progress-linear>
    <v-card>
      <v-card-title>
        Categories
        <v-spacer></v-spacer>
        <v-btn color="primary" fab @click="save()" small dark>
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn color="primary" fab @click="save()" small v-show="!hasChanges" dark>
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn color="error" fab @click="remove()"  small dark>
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form>
            <v-text-field v-model="category.name"></v-text-field>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "CategoryEdit",
  data() {
    return {
      loading: false,
      category: [],
      originalCategory: ""
    };
  },
  created() {
    this.loading = true;
    var that = this
    var id = this.$route.params.id;
    this.$http.get("category/get/" + id).then((response) => {
      var resp = response.data;
      if (resp.success) {
        that.category = resp.result;
        that.originalCategory = JSON.stringify(that.category);
        that.loading = false;
      }
      else {
        //this.showError("hi ha hagut un error");
        this.$router.push({ name: "categories" });
      }
    });
  },
  mounted() { },
  computed: {
    hasChanges() {
      var result = this.originalCategory == JSON.stringify(this.category);
      return result;
    }
  },
  methods: {
    save() {

    },
    remove() {
      this.loading = true;
      var catId = this.category.id;
      this.$http.post("category/delete/" + catId).then((response) => {
        if (response.data.result) {
          this.$store.dispatch("syncCategories").then((response) => {
            if (response.data) {
              this.showSuccess("Categoria Eliminada");
              this.loading = false;
            }
          });
        } else {
          let error = response.data.data;
          this.loading = false;
          this.showError(error);
        }
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