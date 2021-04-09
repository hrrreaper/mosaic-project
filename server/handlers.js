const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { OAuth2Client } = require("google-auth-library");
const clientId = new OAuth2Client(process.env.GOOGLE_CLIENT);

const options = {
  useNewUrlParser: true,
  useUnifiesTopology: true,
}

const getAllBeers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Mosaic");
    const results = await db.collection("beers").find().toArray();
    res.status(201).json({
      status: 201,
      data: results,
    })

  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err.message,
    })
  }
  client.close();
}

const getOneBeer = () => {

}

const updateBeer = () => {

}

const addBeer = () => {

}

const deleteBeer = () => {

}

const setUsers = async (req, res) => {
  const {profileObj} = req.body

  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Mosaic");
    const results = await db.collection("users").insertOne({
      name: profileObj.name,
      email: profileObj.email,
      picture: profileObj.imageUrl,
    });
    res.status(201).json({
      status: 201,
      data: results.ops,
    })
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err.message,
    })
  }
  client.close();
}

module.exports = {
  setUsers,
  getAllBeers,
  getOneBeer,
  updateBeer,
  addBeer,
  deleteBeer,
}

