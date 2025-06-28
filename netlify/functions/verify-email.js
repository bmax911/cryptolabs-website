const fetch = require('node-fetch');

exports.handler = async function (event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email } = JSON.parse(event.body);
    const API_KEY = process.env.REOON_API_KEY; // Securely access the API key

    if (!API_KEY) {
      throw new Error('API Key not configured.');
    }

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email is required.' }) };
    }

    // Call the Reoon API
    const reoonResponse = await fetch(`https://api.reoon.com/api/v1/email-verify/${email}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    if (!reoonResponse.ok) {
        throw new Error(`Reoon API responded with status: ${reoonResponse.status}`);
    }

    const data = await reoonResponse.json();

    // Analyze the response from Reoon
    // We consider 'safe' and 'catch-all' as acceptable for a waitlist.
    // We reject 'risky' and 'unsafe'.
    const isSafe = data.status === 'safe' || data.status === 'catch-all';

    // Send a simple response back to our frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        is_safe: isSafe,
        status: data.status,
        message: isSafe ? 'Email is valid.' : 'This email address is not accepted.' 
      }),
    };
  } catch (error) {
    console.error('Verification Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error. Could not verify email.' }),
    };
  }
};