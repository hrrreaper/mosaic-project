const express = require('express');
const morgan = require("morgan");
require("dotenv").config();
const {
  getAllBeers,
  getOneBeer,
  updateBeer,
  addBeer,
  deleteBeer,
  setUsers,
} = require('./handlers');

express()
  .use(express.json())
  .use(morgan("tiny"))

  .get('/beers', getAllBeers)
  
  .post('/api/v1/auth/google', setUsers)

  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(8000, () => console.log(`🌍 Listening on port 8000`));