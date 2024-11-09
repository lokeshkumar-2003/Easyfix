const axios = require("axios");

async function getGeocode(address) {
  const apiKey = "YOUR_API_KEY";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const location = response.data.results[0].geometry.location;
    console.log("Latitude:", location.lat);
    console.log("Longitude:", location.lng);
  } catch (error) {
    console.error("Error fetching geocode data:", error);
  }
}

getGeocode(
  "Amman Thirumana Mandapam, Bhavani Main Road, Kongampalayam, Chithode, Tamil Nadu, India"
);
