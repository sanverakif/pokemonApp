<template>
  <div class="container">
    <table class="table" style="width: 400px">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Url</th>
          <th>Favoriler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pokemonData" :key="item.id">
          <td>{{ item.Id }}</td>
          <td>{{ item.Name }}</td>
          <td>
            <button @click="gotoDetail(item.Id)" class="btn btn-info">
              Detay
            </button>
            <!-- <router-link
              :to="{ name: 'PokemonDetail', params: { pokemonId: item.Id } }"
              ><v-btn class="btn btn-info">Detay</v-btn></router-link
            > -->
          </td>
          <td>
            <h6>Sonuç: {{ hesaplama }}</h6>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import PokemonDetail from "../components/PokemonDetail";
export default {
  name: "PokemonView",
  components: { PokemonDetail },

  data() {
    return {
      pokemonData: [],
      hesaplama: "değer bekleniyor",
    };
  },
  methods: {
    gelen(sonucdata) {
      debugger;
      this.hesaplama = sonucdata;
    },
    getPokemonData: function () {
      axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
        res.data.results.forEach((row) => {
          var pokemonItem = {};
          pokemonItem.Id = row.url.split("/")[row.url.split("/").length - 2];
          pokemonItem.Name = row.name;
          pokemonItem.url = row.url;
          this.pokemonData.push(pokemonItem);
        });
        console.log(this.pokemonData);
      });
    },
    //roota parametre ekledim Evente çağırırken döngüde olduğu için id yi atayabildim.
    gotoDetail: function (id) {
      this.$router.push("PokemonDetail/" + id);

      // this.$router.push('/PokemonDetail');
      // this.$router.push({ name: "PokemonDetail", params: { id: this.pokemonItem. Id } });
      // this.$router.push({ name: "PokemonDetail", params: { pokemonId: this.pokemonItem.Id } });
      // this.$router.push({ name: "PokemonDetail" + this.$route.params.pokemonItem.id });
    },
  },
  mounted: function () {
    this.getPokemonData(); //method1 will execute at pageload
  },
};
</script>
