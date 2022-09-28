const { Router } = require("express");
const { Pokemon, Type } = require("../db");
const router = Router();

//!------Ruta Post para crear personajes-------//
router.post("/", async (req, res) => {
  const { name, image, life, attack, defense, speed, height, weight, types } =
    req.body;

  if (!name || !image) res.status(400).json({ msg: "Falta información" });

  try {
    const obj = {
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    };
    const newPokemon = await Pokemon.create(obj);
    let typesDb = await Type.findAll({
      where: { name: types },
    });

    newPokemon.addType(typesDb);

    res.send(newPokemon);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
