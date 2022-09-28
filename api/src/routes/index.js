const { Router } = require("express");

const pokemonsRoute = require("./pokemons");
const pokemonCreate = require("./pokemon");
const pokemonTypes = require("./types");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", pokemonsRoute);
router.use("/create", pokemonCreate);
router.use("/types", pokemonTypes);
module.exports = router;
