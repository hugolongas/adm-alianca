<template>
  <div class="dashboard">
    <h1 class="title">Classificació</h1>
    <v-container>
      <v-alert 
      icon="mdi-pirate"
      text      
      prominent
      type="error">INFORMACIÓ IMPORTANT
Per motius de pirateria major des de l'organització s'ha decidit que la
cursa de regates serà finalitzada en aquest moment i no es tindrà en
compte pel recompte final de juguesca. Malauradament, no tenim
el temps ni les ganes de posar-nos a revisar tots els comptes fantasmes
que s'han creat sigui en comptes propis o aliens per tal d'afectar a
les puntuacions.
Disculpeu també els errors que han aparegut (coses que passen)
i que han fet que l'experiència no fos la millor.

Moltes gràcies per haver participat aquests dies en les curses i a sentir goig
de la Festa Major que només es pot fer un cop a l'any.</v-alert>
    </v-container>
  </div>
</template>
  
<script>
export default {
  name: "DashboardView",
  components: {  },
  data() {
    return {
      leaderboardList: [],
    };
  },
  async created(){
  },
  computed: {
  },
  methods: {
  },
};
</script>