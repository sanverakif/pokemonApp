<template>
  <div>
    <div class="container">
      <table class="table" style="margin-top: 50px">
        <thead>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col">Abilities/ability/name</th>
          <th scope="col">Hp/attack/defense</th>
          <th scope="col">Weight</th>
          <th scope="col">Height</th>
        </thead>
        <tbody>
          <tr>
            <td><img :src="pokemonDetail.sprites.back_default" /></td>
            <td>{{ pokemonDetail.name }}</td>
            <td>{{ pokemonDetail.types[0].type.name }}</td>
            <td>
              <ul>
                <li v-for="item in pokemonDetail.abilities" :key="item.id">
                  {{ item.ability.name }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li
                  v-for="(item, index) in pokemonDetail.stats.slice(0, 3)"
                  :key="item.id"
                >
                  {{ index }} {{ item.stat.name }}
                </li>
              </ul>
            </td>

            <td>{{ pokemonDetail.weight }}</td>
            <td>{{ pokemonDetail.height }}</td>
          </tr>
        </tbody>

        <td v-for="item in pokemonDetail.abilities.ability" :key="item.id">
          {{ item }}
        </td>
      </table>

      <router-link :to="{ name: 'PokemonView' }"
        ><button class="btn btn-info">Pokemonlar</button></router-link
      >

      <button
        @click="setLocalStorageGetData(true), (show = !show)"
        class="btn btn-success"
        style="margin-left: 5px"
        v-show="show"
      >
        Favorilere ekle
      </button>
      <button
        @click="deleteLocalStorageGetData(false), (show = show)"
        class="btn btn-danger"
        style="margin-left: 5px"
        v-show="!show"
      >
        Favorilerden sil
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PokemonDetail",
  components: {},
  data() {
    return {
      result: "kalp",
      pokemonDetail: [],
      pokemon: [],
      localData: localStorage.getItem("pokemonDetail"),
      akif: [],
      show: true,
      favoriPokemon: [],
    };
  },
  methods: {
    getPokemonDetail: function (id) {
      axios.get("https://pokeapi.co/api/v2/pokemon/" + id).then((res) => {
        this.pokemonDetail = res.data;
        console.log(res.data);
      });
    },
    setLocalStorageGetData: function (show) {
      if (this.favoriPokemon != null) {
        debugger;

        this.favoriPokemon.push(
          this.pokemonDetail.sprites.back_default,
          this.pokemonDetail.name,
          this.pokemonDetail.types[0].type.name,
          this.pokemonDetail.weight,
          this.pokemonDetail.height
        );
        localStorage.setItem(
          "favoriPokemon",
          JSON.stringify(this.favoriPokemon)
        );
        console.log(this.favoriPokemon);

        // localStorage.setItem(
        //   "favoriPokemon",
        //   JSON.stringify(
        //     this.pokemonDetail.sprites.back_default +
        //       " " +
        //       this.pokemonDetail.name +
        //       " " +
        //       this.pokemonDetail.types[0].type.name +
        //       " " +
        //       this.pokemonDetail.weight +
        //       " " +
        //       this.pokemonDetail.height
        //   )
        // );
        // debugger;
        // this.favoriPokemon.push(
        //   this.pokemonDetail.sprites.back_default,
        //   this.pokemonDetail.name,
        //   this.pokemonDetail.types[0].type.name,
        //   this.pokemonDetail.weight,
        //   this.pokemonDetail.height
        // );

        // localStorage.setItem(
        //   "favoriPokemon",
        //   JSON.stringify(this.favoriPokemon)
        // );
        this.topla();
      }
      this.show = show;
    },

    getLocalStorageGetData: function () {
      // this.localData = localStorage.getItem("pokemonDetail");
      this.localData.split(" ");
      this.akif = this.localData.split(" ");
      var x = {};
      x.image = this.akif[0];
      x.name = this.akif[1];
      x.typesName = this.akif[2];
      x.weight = this.akif[3];
      x.height = this.akif[4];

      this.akif.push(x);
    },
    deleteLocalStorageGetData: function (shows) {
      if (this.favoriPokemon == null) {
        this.setLocalStorageGetData();
      } else {
        localStorage.removeItem("favoriPokemon");
        this.show = !shows;
      }
    },
  },

  mounted: function () {
    var pokemonId = this.$route.params.pokemonId;
    this.getPokemonDetail(pokemonId); //method1 will execute at pageload
  },
};
</script>

<style>
.btnHidden {
  visibility: hidden !important;
}
</style>
