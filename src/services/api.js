import axios from "axios";

const baseUrl = "https://api.skypicker.com";

export async function getFlights(flyFrom, to, date, limit = 100, offset = 0) {

  if (Array.isArray(flyFrom)) flyFrom = flyFrom.join(",");
  if (Array.isArray(to)) to = to.join(",");
  date = date.split("-").reverse().join("/");
  const endpoint = "flights";
  const query = {
    flyFrom,
    to,
    date,
    limit,
    offset,
    v: "3" // <----
  }; // Use API v3 (snatched that idea from requests made by kiwi.com)
     // to fix no results for eg. new-york-city_ny_us and more.
     // To reproduce, try calling the following with a REST client:
     // https://api.skypicker.com/flights?flyFrom=prague_cz&to=new-york-city_ny_us     NO FLIGHTS
     // https://api.skypicker.com/flights?v=2&flyFrom=prague_cz&to=new-york-city_ny_us NO FLIGHTS
     // https://api.skypicker.com/flights?v=3&flyFrom=prague_cz&to=new-york-city_ny_us CORRECT FLIGHTS

  const url = _buildUrl(endpoint, query);

  return await axios.get(url);
}

export async function getLocations(term) {

  const endpoint = "locations/";
  const query = { term };

  const url = _buildUrl(endpoint, query);

  return await axios.get(url);
}

function _buildUrl(endpoint, query) {

  let params = [];
  for (const param in query) {
    params.push(`${param}=${encodeURIComponent(query[param])}`)
  }

  return `${baseUrl}/${endpoint}?${params.join("&")}`
}