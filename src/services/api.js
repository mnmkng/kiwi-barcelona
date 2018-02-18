import axios from "axios";

/**
 * Base URL of Kiwi.com public API.
 * @type {string}
 */
const BASE_URL = "https://api.skypicker.com";

/**
 * Abstraction of API call to the "flights" endpoint.
 * Performs some parameter preprocessing before invocation.
 * @param flyFrom
 * @param to
 * @param date
 * @param limit
 * @param offset
 * @returns {Promise<any>}
 */
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

/**
 * Abstraction of API call to the "locations/" endpoint.
 * ("locations" endpoint call fails on CORS)
 * @param term
 * @returns {Promise<any>}
 */
export async function getLocations(term) {

  const endpoint = "locations/";
  const query = { term };

  const url = _buildUrl(endpoint, query);

  return await axios.get(url);
}

/**
 * Helper function to build correct request URL.
 * @param endpoint
 * @param query
 * @returns {string}
 * @private
 */
function _buildUrl(endpoint, query) {

  let params = [];
  for (const param in query) {
    params.push(`${param}=${encodeURIComponent(query[param])}`)
  }

  return `${BASE_URL}/${endpoint}?${params.join("&")}`
}