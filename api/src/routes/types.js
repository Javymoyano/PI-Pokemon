const { Router } = require("express");
const getApiTypes = require("../controllers/typesC");

const router = Router();

router.get("/", async (req, res) => {
  const types = await getApiTypes();
  console.log("types cargadas");
  res.send(types);
});

module.exports = router;
