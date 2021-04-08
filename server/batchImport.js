var fs = require('file-system');
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiesTopology: true,
}

const mosaicBeers = JSON.parse(fs.readFileSync("data/mosaicBeers.json"));

const batchImport = async () => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Mosaic");
    await db.collection("beers").insertMany(mosaicBeers);
    console.log("success");
  } catch(err) {
    console.log("ERROR", err.message);
  }

  client.close();
}

batchImport();