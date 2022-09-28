const { Router } = require("express");
const getAllPokemons = require("../controllers/pokemonC");
const router = Router();
const { Pokemon, Type } = require("../db");

//!----------Ruta de Todos los pokemones y de busqueda por Name----------//
router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    const pokemonsTodos = await getAllPokemons();
    if (name) {
      let pokeName = await pokemonsTodos.filter(
        (e) => e.name.toLowerCase().includes(name.toLowerCase()) //todo: PROBAR EL "===" EN LUGAR DEL includes() para una busqueda mas precisa
      );
      console.log(pokeName);
      pokeName.length
        ? res.status(200).send(pokeName)
        : res.status(400).send("Ese nombre no corresponde a un Pokemon");
    } else {
      res.status(200).send(pokemonsTodos);
    }
  } catch (error) {
    console.log(error);
  }
});

//!--------Ruta de busqueda por ID------------//

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const pokemonsTotal = await getAllPokemons();
    if (id) {
      const pokeId = await pokemonsTotal.filter((e) => e.id == id);
      pokeId.length
        ? res.status(200).json(pokeId)
        : res.status(400).send("Ese ID no corresponde a un Pokemon");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
