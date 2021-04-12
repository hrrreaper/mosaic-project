const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
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

const getOneBeer = async (req, res) => {
  const _id = req.params._id;
  const client = await MongoClient(MONGO_URI, options);
  
  try {
    await client.connect();
    const db = client.db("Mosaic");
    await db.collection("beers").findOne({ "_id": ObjectId(_id) }, (err, result) => {
      console.log("result!", result)
      result
        ? res.status(201).json({ status: 201, _id, data: result })
        : res.status(404).json({ status: 404, _id, data: "Not Found" });
    });
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err.message,
    })
  }
  client.close();
}

const updateBeer = async(req, res) => {
  // const client = await MongoClient(MONGO_URI, options);
  // // const { seatId, isBooked, fullName, email } = req.body;
  // // const _id = seatId;
  // // const query = { _id };
  // // const newValue = { $set: { isBooked: isBooked, fullName: fullName, email: email } };

  // try {
  //   await client.connect();
  //   const db = client.db("Mosaic");
  //   const results = await db.collection("beers").updateOne(query, newValue);
  //   res.status(200).json({status: 200, data: results})

  // } catch (err) {
  //   res.status(404).json({status: 404, message: err.message})
  // }
  // client.close();
}

const addBeer = async(req, res) => {
  // const client = await MongoClient(MONGO_URI, options);

  // try {
  //   await client.connect();
  //   const db = client.db("Mosaic");
  //   const results = await db.collection("beers").insertOne({

  //   });
  //   res.status(201).json({
  //     status: 201,
  //     data: results,
  //   })

  // } catch (err) {
  //   res.status(404).json({
  //     status: 404,
  //     message: err.message,
  //   })
  // }
  // client.close();
}

const deleteBeer = () => {

}

const setUsers = async (req, res) => {

  //check to see if the user is already in the DB

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

