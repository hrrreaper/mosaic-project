const express = require('express');
const morgan = require("morgan");
const path = require('path');
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
  .get('/beer/:_id', getOneBeer)
  .delete('/beer/:_id', deleteBeer)
  .patch('/update/:_id', updateBeer)
  .post('/add/beer', addBeer)
  .post('/api/v1/auth/google', setUsers)


  .use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
  }

  app.listen(process.env.PORT || 8000, () => console.log(`🌍 Listening on port 8000`));