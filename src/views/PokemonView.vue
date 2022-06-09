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
          <!-- <td><i class="fa-solid fa-star"></i></td> -->
          <td>fav ürün buraya gelicek</td>          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PokemonView",

  components: {},
  data() {
    return {
      pokemonData: [],
    };
  },
  methods: {
    getPokemonData: function () {
      debugger;
      axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
        debugger;

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
      debugger;
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
