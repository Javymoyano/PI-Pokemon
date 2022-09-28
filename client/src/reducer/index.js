import {
  ALPHABETICAL_FILTER,
  DELETE_POKEMON,
  FILTER_ATTACK,
  FILTER_BY_CREATED,
  FILTER_BY_TYPES,
  GET_POKEMONS,
  GET_POKEMON_DETAILS,
  GET_POKEMON_NAME,
  GET_TYPES_POKEMONS,
} from "../action";

const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  details: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };

    case ALPHABETICAL_FILTER:
      let sortedAlphetical = [...state.pokemons];
      sortedAlphetical =
        action.payload === "az"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedAlphetical,
        allPokemons: action.payload,
      };

    case FILTER_ATTACK:
      let attackFilter = [...state.pokemons];
      attackFilter = attackFilter.sort((a, b) => {
        if (a.attack < b.attack) {
          return action.payload === "asc" ? 1 : -1;
        }
        if (a.attack > b.attack) {
          return action.payload === "asc" ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        pokemons:
          action.payload === "Fuerza" ? state.allPokemons : attackFilter,
      };
    case FILTER_BY_TYPES:
      const allPokes = [...state.allPokemons];
      const filterTypes =
        action.payload === "type"
          ? allPokes
          : allPokes.filter((e) => e.types.includes(action.payload));
      return {
        ...state,
        pokemons: filterTypes,
      };

    case FILTER_BY_CREATED:
      //const allPokemons = [...state.allPokemons];

      const filterCreated =
        action.payload === "creados"
          ? state.allPokemons.filter((e) => e.createdInDb)
          : state.allPokemons.filter((e) => !e.createdInDb);
      return {
        ...state,
        pokemons: action.payload === "all" ? state.allPokemons : filterCreated,
      };

    case GET_POKEMON_NAME:
      return {
        ...state,
        pokemons: action.payload,
      };

    case GET_POKEMON_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case "POST_POKEMONS":
      return {
        ...state,
      };

    case GET_TYPES_POKEMONS:
      return {
        ...state,
        types: action.payload,
      };

    // case 'GET_CLEAN':
    //   return {
    //     ...state,
    //     details: [],
    //   };
    case "GET_CLEAN":
      return {
        ...state,
        details: [],
      };

    // case DELETE_POKEMON:
    //   const pokes = [...state.pokemons];
    //   const pokesId= action.payload === "id"? pokes.filter()
    //   console.log("SOY POKES", pokes);
    //   return {
    //     ...state,
    //     pokemons: action.payload,
    //   };

    default:
      return state;
  }
}

export default rootReducer;
