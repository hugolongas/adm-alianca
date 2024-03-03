<template>
  <v-container class="category">
      <v-card class="md6">
        <v-card-text>
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
      category:[]
    };
  },
  created() {
    this.loading = true;
    var that = this
    var id = this.$route.params.id;
    this.$http.get("category/get/"+id).then((response) => {
      var resp = response.data;      
      if(resp.success){
      that.category = resp.result;
      that.loading = false;
      }
      else{
        //this.showError("hi ha hagut un error");
        this.$router.push({name:"categories"});
      }
    });
  },
  mounted() {},
  computed: {
  },
  methods: {
    delete() {
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