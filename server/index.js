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
const { getMenu } = require('./apiRequests');

express()
  .use(express.json())
  .use(morgan("tiny"))

  .get('/beers', getAllBeers)
  .get('/beer/:_id', getOneBeer)
  .delete('/beer/:_id', deleteBeer)
  .patch('/update/:_id', updateBeer)
  .post('/add/beer', addBeer)

  .post('/api/v1/auth/google', setUsers)

  .get('https://business.untappd.com/api/v1/menus/535383?full=true', getMenu)

  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  .listen(8000, () => console.log(`🌍 Listening on port 8000`));