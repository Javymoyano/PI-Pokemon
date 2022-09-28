const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { API } = process.env;

//!-------GET DATOS DE LA API---------//
const getPokeInfo = async () => {
  try {
    const pokeApi = [];
    const consultaApi = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=25" // volver a 40
    );
    //console.log(consultaApi.data);
    const otraConsultaApi = consultaApi.data.results.map((cons) => cons.url);
    //console.log(otraConsultaApi);

    await axios
      .all(otraConsultaApi.map((otraConsultaApi) => axios.get(otraConsultaApi)))
      .then((poke) => {
        poke.map((el) =>
          pokeApi.push({
            id: el.data.id,
            name: el.data.name,
            image: el.data.sprites.other.dream_world.front_default,
            hp: el.data.stats[0].base_stat,
            attack: el.data.stats[1].base_stat,
            defense: el.data.stats[2].base_stat,
            speed: el.data.stats[5].base_stat,
            height: el.data.height,
            weight: el.data.weight,
            createdInDb: false,
            types: el.data.types.map((t) => t.type.name),
          })
        );
      });
    console.log(pokeApi);
    return pokeApi;
  } catch (error) {
    console.log(error);
  }
};

//!---------GET A LA BD--------//
const getPokeDb = async () => {
  let pokeDb = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  let pokeAux = pokeDb.map((el) => {
    return {
      id: el.id,
      name: el.name,
      image: el.image,
      hp: el.life,
      attack: el.attack,
      defense: el.defense,
      speed: el.speed,
      height: el.height,
      weight: el.weight,
      createdInDb: true,
      types: el.types.map((t) => t.name),
    };
  });

  console.log("Soy pokeDB", pokeAux);
  return pokeAux;
};

//   const dbPokemon = pokeDb.map((poke) => {
//     const resultMap = poke.toJSON();
//     return {
//       ...resultMap,
//       types: resultMap.types.map((type) => type.name),
//     };
//   });

//!-------CONCATENADO DE GET API Y GET BD---------//
const getAllPokemons = async () => {
  const apiPoke = await getPokeInfo();
  const dbPoke = await getPokeDb();
  const pokeTotal = apiPoke.concat(dbPoke);
  //const pokeTotal = [...apiPoke, ...dbPoke];
  return pokeTotal;
};

module.exports = getAllPokemons;
