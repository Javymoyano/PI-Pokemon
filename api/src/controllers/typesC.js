const axios = require("axios");
const { Pokemon, Type } = require("../db");

const { API_TYPES } = process.env;

const getApiTypes = async () => {
  const apiTypes = await axios.get(API_TYPES);
  const typesResults = apiTypes.data.results;
  typesResults.forEach((type) => {
    Type.findOrCreate({
      where: { name: type.name },
    });
  });
  const allTypes = await Type.findAll();
  return allTypes;
};

module.exports = getApiTypes;
