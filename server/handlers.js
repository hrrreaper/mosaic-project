const { MongoClient, ObjectID } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { OAuth2Client } = require("google-auth-library");
const clientId = new OAuth2Client(process.env.GOOGLE_CLIENT);


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

const getOneBeer = async (req, res) => {
  const _id = req.params._id;
  const client = await MongoClient(MONGO_URI, options);
  
  try {
    await client.connect();
    const db = client.db("Mosaic");
    const result = await db.collection("beers").findOne({ _id: ObjectID(_id) })
    res.status(201).json({
      status: 201,
      data: result,
    })
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err.message,
    })
  }
  client.close();
}

const updateBeer = async(req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { _id, brewery, beerName, beerStyle, abv, tappedOn, tappedOut, kegSize, daysOnTap, deliveryDate, kegCost, cost } = req.body;
  const id = _id;
  const query = { id };
  const newValue = {
    $set: {
      brewery: brewery,
      beerName: beerName,
      beerStyle: beerStyle,
      ABV: abv,
      tappedOn: tappedOn,
      tappedOut: tappedOut,
      kegSize: kegSize,
      daysOnTap: daysOnTap,
      deliveryDate: deliveryDate,
      kegCost: kegCost,
      cost: cost
    }
  };

  try {
    await client.connect();
    const db = client.db("Mosaic");
    const results = await db.collection("beers").updateOne(query, newValue);
    res.status(200).json({status: 200, data: results})

  } catch (err) {
    res.status(404).json({status: 404, message: err.message})
  }
  client.close();
}

const addBeer = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { beerName, beerStyle, brewery, abv, kegSize, delivery, kegCost, cost } = req.body;

  try {
    await client.connect();
    const db = client.db("Mosaic");
    const results = await db.collection("beers").insertOne({
      beerName: beerName,
      beerStyle: beerStyle,
      brewery: brewery,
      ABV: abv,
      kegSize: kegSize,
      deliveryDate: delivery,
      kegCost: kegCost,
      cost: cost
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

const deleteBeer = async (req, res) => {
  const _id = req.params._id;
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Mosaic");
    const results = await db.collection("beers").deleteOne({ _id: ObjectID(_id) });
    res.status(204).json({
      status: 204,
    })
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err.message,
    })
  }
}

const setUsers = async (req, res) => {

  //TODO check to see if the user is already in the DB

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

