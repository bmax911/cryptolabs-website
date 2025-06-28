const fetch = require('node-fetch');

exports.handler = async function (event) {
  // We only want to accept POST requests from our form
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { email } = JSON.parse(event.body);
    const API_KEY = process.env.REOON_API_KEY; // Securely gets your key from Netlify's settings

    // --- Server-side validation ---
    if (!API_KEY) {
      console.error('Reoon API Key is not configured on the server.');
      return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error.' }) };
    }
    if (!email || !email.includes('@')) {
      return { statusCode: 400, body: JSON.stringify({ error: 'A valid email is required.' }) };
    }

    // --- Call the Reoon API ---
    const reoonResponse = await fetch(`https://api.reoon.com/api/v1/email-verify/${email}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    if (!reoonResponse.ok) {
        console.error(`Reoon API responded with status: ${reoonResponse.status}`);
        return { statusCode: 502, body: JSON.stringify({ error: 'Could not connect to verification service.' }) };
    }

    const data = await reoonResponse.json();

    // --- The Core Logic: Define what is a "good" email ---
    // We will accept 'safe' (verified) and 'catch-all' (valid domain, common for businesses).
    // We will REJECT 'risky' (disposable/temp email) and 'unsafe' (invalid/bounced).
    // We will also REJECT free email providers (e.g., gmail.com, yahoo.com).
    const isGoodEmail = (data.status === 'safe' || data.status === 'catch-all') && !data.is_disposable && !data.is_free;

    // --- Send a clean, simple response back to our frontend ---
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        is_safe: isGoodEmail,
        message: isGoodEmail ? 'Success! You have been added to the waitlist.' : 'This email address is not accepted. Please use a valid work email.' 
      }),
    };
  } catch (error) {
    console.error('Verification Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An unexpected server error occurred.' }),
    };
  }
};