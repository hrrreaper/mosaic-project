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


const app = express()
  
  app.use(express.json())
  app.use(morgan("tiny"))

  app.get('/beers', getAllBeers)
  app.get('/beer/:_id', getOneBeer)
  app.delete('/beer/:_id', deleteBeer)
  app.patch('/update/:_id', updateBeer)
  app.post('/add/beer', addBeer)
  app.post('/api/v1/auth/google', setUsers)


  app.use((req, res) => res.status(404).type("txt").send("🤷‍♂️"))

  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
  }
  
app.listen(process.env.PORT || 8000, () => console.log(`🌍 Listening on port 8000`));
