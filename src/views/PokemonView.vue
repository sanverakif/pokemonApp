<template>
  <div class="container">
    <table class="table" style="width: 400px">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Url</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pokemonData" :key="item.id">
          <td>{{ item.Id }}</td>
          <td>{{ item.Name }}</td>
          <td>{{ item.Url }}</td>
          <td>
            <v-btn :href="link" class="btn btn-info">
              <router-link
                :to="{ name: 'PokemonDetail', params: { pokemonId: item.Id } }"
                >Detay</router-link
              ></v-btn
            >
          </td>
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
  },
  mounted: function () {   
    this.getPokemonData(); //method1 will execute at pageload
  },
};
</script>
