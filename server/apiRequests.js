require("dotenv").config();
const { API_ID } = process.env;
const request = require('request-promise');


const getMenu = async () => {
  
  const auth = 'Basic ' + Buffer.from("info@mosaichamilton.ca" + ':' + API_ID).toString('base64');

  try {
      const response = await request({
        uri: 'https://business.untappd.com/api/v1/sections/535383',
        headers: {
          "Accept": "application/json",
          "Authorization": auth,
        },
      })
    const profile = JSON.parse(response);
    return profile;
  } catch (err) {
    console.log("error", err.message)
  }
}

// getMenu().then((data) => console.log(data));

module.exports = { getMenu };