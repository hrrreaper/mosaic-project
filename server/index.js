const express = require('express');
const morgan = require("morgan");
require("dotenv").config();
const {
  getAllBeers,
  getOneBeer,
  updateBeer,
  addBeer,
  deleteBeer,
} = require('./handlers')

express()
  .use(express.json())
  .use(morgan("tiny"))


  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(8000, () => console.log(`🌍 Listening on port 8000`));