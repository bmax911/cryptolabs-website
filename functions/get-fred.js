const fetch = require('node-fetch');

exports.handler = async function(event) {
  const { endpoint, ...params } = event.queryStringParameters;
  const FRED_API_KEY = process.env.VITE_STLOUIS_FED_API;
  const FRED_BASE_URL = 'https://api.stlouisfed.org/fred';

  if (!endpoint) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing endpoint parameter' }),
    };
  }


  // Build FRED API URL
  const url = new URL(`${FRED_BASE_URL}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  // Always ensure api_key and file_type=json are LAST in the query string
  url.searchParams.delete('api_key');
  url.searchParams.delete('file_type');
  url.searchParams.append('api_key', FRED_API_KEY);
  url.searchParams.append('file_type', 'json');
  console.log('FRED API URL:', url.toString());

  try {
    const res = await fetch(url.toString());
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonErr) {
      // Log the raw response for debugging
      console.error('FRED API non-JSON response:', text);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'FRED API did not return JSON', details: text.slice(0, 200) }),
        headers: { 'Access-Control-Allow-Origin': '*' }
      };
    }

    // Patch for FRED API: always return arrays for releases and series
    if (endpoint === 'releases' && !Array.isArray(data.releases)) {
      data.releases = [];
    }
    if (endpoint === 'release/series' && !Array.isArray(data.seriess)) {
      data.seriess = [];
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', details: err.message }),
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
  }
};