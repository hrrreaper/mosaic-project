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
  const { brewery, beerName, beerStyle, breweryLocation, abv, tappedOn, tappedOut, kegSize, daysOnTap, itemId} = req.body;
  const  _id = req.params._id;
  const newValue = {
    $set: {
      brewery: brewery,
      beerName: beerName,
      beerStyle: beerStyle,
      breweryLocation: breweryLocation,
      ABV: abv,
      tappedOn: tappedOn,
      tappedOut: tappedOut,
      kegSize: kegSize,
      daysOnTap: daysOnTap,
      itemId: itemId,
    }
  };

  try {
    await client.connect();
    const db = client.db("Mosaic");
    const results = await db.collection("beers").updateOne({_id: ObjectID(_id)}, newValue);
    res.status(200).json({status: 200, data: results})

  } catch (err) {
    res.status(404).json({status: 404, message: err.message})
  }
  client.close();
}

const addBeer = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { brewery, beerName, beerStyle, breweryLocation, abv, tappedOn, tappedOut, kegSize, daysOnTap, delivery, kegCost, cost, untappdId, logo, itemId  } = req.body;

  try {
    await client.connect();
    const db = client.db("Mosaic");
    const results = await db.collection("beers").insertOne({
      brewery: brewery,
      beerName: beerName,
      beerStyle: beerStyle,
      breweryLocation: breweryLocation,
      ABV: abv,
      tappedOn: tappedOn,
      tappedOut: tappedOut,
      kegSize: kegSize,
      daysOnTap: daysOnTap,
      deliveryDate: delivery,
      kegCost: kegCost,
      cost: cost,
      untappdId: untappdId,
      logo: logo,
      itemId: itemId
      
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
  
  const {profileObj} = req.body
  const client = await MongoClient(MONGO_URI, options);
  
  try {
  await client.connect();
  const db = client.db("Mosaic");
    const existingUser = await db.collection("users").findOne({ email: profileObj.email })
    console.log("existing user", existingUser)
    console.log("profile", profileObj)
    if (!existingUser || existingUser === null) {
      const results = await db.collection("users").insertOne({
        name: profileObj.name,
        firstName: profileObj.givenName,
        email: profileObj.email,
        imageUrl: profileObj.imageUrl,
      });
      console.log("results", results.ops)
      res.status(201).json({
        status: 201,
        data: results.ops,
      })
    } else if (existingUser.email === profileObj.email) {
      res.status(201).json({
        status: 201,
        data: profileObj,
      })
    } 
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

