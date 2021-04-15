require("dotenv").config();
const { API_ID } = process.env;
const request = require('request-promise');


const getMenu = async (req, res) => {
  const auth = 'Basic ' + Buffer.from("info@mosaichamilton.ca" + ':' + API_ID).toString('base64');

  try {
    const response = await request({
      uri: 'https://business.untappd.com/api/v1/sections/610810/items',
      headers: {
        "Accept": "application/json",
        "Authorization": auth,
      },
    })
    const data = JSON.parse(response);
    res.status(201).json({
      status: 201,
      data: data,
    })
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err.message,
    })
  }
}

module.exports = { getMenu };