// /functions/fetchEconomicData.js

// This is a server-side file. Your API key is safe here.
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

exports.handler = async function (event, context) {
  // Get the 'indicator' and other parameters from the frontend's request
  const { indicator, interval, maturity } = event.queryStringParameters;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key is not configured on the server." }),
    };
  }

  if (!indicator) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Indicator parameter is required." }),
    };
  }

  // Base URL for the Alpha Vantage API
  const BASE_URL = 'https://www.alphavantage.co/query';

  // Use URLSearchParams to safely build the query string
  const params = new URLSearchParams({
    function: indicator,
    apikey: API_KEY,
  });

  // Add optional parameters only if they are provided
  if (indicator === 'TREASURY_YIELD' && interval && maturity) {
    params.append('interval', interval);
    params.append('maturity', maturity);
  }
  // You can add more 'else if' blocks here for other indicators with special params

  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    const data = await response.json();

    // Alpha Vantage returns an error message in its JSON if something is wrong
    if (data["Error Message"] || data["Information"]) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: data["Error Message"] || data["Information"] })
        };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from your frontend
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data from Alpha Vantage.' }),
    };
  }
};