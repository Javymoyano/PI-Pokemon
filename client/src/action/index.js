import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const ALPHABETICAL_FILTER = "ALPHABETICAL_FILTER";
export const FILTER_ATTACK = "FILTER_ATTACK";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const GET_POKEMON_DETAILS = "GET_POKEMON_DETAILS";
export const GET_TYPES_POKEMONS = "GET_TYPES_POKEMONS";
export const DELETE_POKEMON = "DELETE_POKEMON";

export function getPokemons() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}

export function getTypesPokemons() {
  return async function (dispatch) {
    try {
      let jsonTypes = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: "GET_TYPES_POKEMONS",
        payload: jsonTypes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    try {
      const res = await axios.post("http://localhost:3001/create", payload);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterAlphbetical(payload) {
  return {
    type: "ALPHABETICAL_FILTER",
    payload,
  };
}

export function filterByAttack(payload) {
  return {
    type: "FILTER_ATTACK",
    payload,
  };
}

export function filterByTypes(payload) {
  return {
    type: "FILTER_BY_TYPES",
    payload,
  };
}

export function filterByCreated(payload) {
  return {
    type: "FILTER_BY_CREATED",
    payload,
  };
}

export function getPokemonName(name) {
  return async function (dispatch) {
    try {
      let pokemonName = await axios.get(
        "http://localhost:3001/pokemons?name=" + name
      );
      return dispatch({
        type: "GET_POKEMON_NAME",
        payload: pokemonName.data,
      });
    } catch (error) {
      alert("No se encontró ningún Pokemon");
    }
  };
}

export function pokemonDetails(id) {
  return async function (dispatch) {
    try {
      let pokemonJson = await axios.get("http://localhost:3001/pokemons/" + id);
      return dispatch({
        type: "GET_POKEMON_DETAILS",
        payload: pokemonJson.data,
      });
    } catch (error) {
      alert("No se encontró ningun Pokemon con ese ID");
    }
  };
}

export function getClean() {
  return {
    type: "GET_CLEAN",
  };
}

// export function deletePokemon() {
//   return {
//     type: "DELETE_POKEMON",
//   };
// }
