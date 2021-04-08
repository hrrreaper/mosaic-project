const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiesTopology: true,
}

const getAllBeers = () => {

}

const getOneBeer = () => {

}

const updateBeer = () => {

}

const addBeer = () => {

}

const deleteBeer = () => {

}

module.exports = {
  getAllBeers,
  getOneBeer,
  updateBeer,
  addBeer,
  deleteBeer,
}

