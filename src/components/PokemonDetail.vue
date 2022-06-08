<template>
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

          <!-- <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png"> -->
          <!-- <td>
            {{pokemonDetail.sprites.back_default}}
          </td> -->
          <td>{{ pokemonDetail.name }}</td>
          <td>{{ pokemonDetail.types[0].type.name }}</td>
          <td>
            {{ pokemonDetail.abilities[0].ability.name +" "+ pokemonDetail.abilities[1].ability.name }}
          </td>

          <!-- <td v-for="item in pokemonDetail.abilities.ability" :key="item.id">
            {{ item }}
          </td> -->
          <!--gece bakılıcak 2 array var-->

          <td>
            {{
              pokemonDetail.stats[0].stat.name +
              " " +
              pokemonDetail.stats[1].stat.name +
              " " +
              pokemonDetail.stats[2].stat.name
            }}
          </td>

          <td>{{ pokemonDetail.weight }}</td>
          <td>{{ pokemonDetail.height }}</td>
        </tr>

        <thead>
          <th>Abilities/ability/name</th>
        </thead>
        <tbody><tr v-for="item in pokemonDetail.abilities" :key="item.id">
          <td>
           {{item.ability.name}}
        </td>        
        </tr>
        </tbody>    
      </tbody>
    </table>    
    <router-link :to="{ name: 'PokemonView' }"
      ><button class="btn btn-info">Pokemonlar</button></router-link
    >
    <button @click="addFavouritePokemon" class="btn btn-success">Favorilere ekle</button>

  </div>
   
  <!-- {{this.$route.params}} -->
</template>

<script>
import axios from "axios";
export default {
  name: "PokemonDetail",
  components: {},
  data() {
    return {
      pokemonDetail: [],
    };
  },
  methods: {
    getPokemonDetail: function (id) {
      axios.get("https://pokeapi.co/api/v2/pokemon/" + id).then((res) => {
        this.pokemonDetail = res.data;
        console.log(res.data);
      });
    },
    addFavouritePokemon:function(){
this.pokemonDetail = JSON.parse(localStorage.getItem("pokemonDetail"));
     }
  },
  mounted: function () {
    debugger;
    var pokemonId = this.$route.params.pokemonId;
    this.getPokemonDetail(pokemonId); //method1 will execute at pageload
  },
};
</script>

<style></style>
