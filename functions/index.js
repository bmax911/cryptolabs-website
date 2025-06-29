const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();

exports.verifyEmail = functions.https.onCall(async (data, context) => {
  const { email, "g-recaptcha-response": token } = data;

  // 1. reCAPTCHA verification
  const recaptchaSecret = functions.config().recaptcha.secret;
  const recaptchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}`,
    {
      method: "POST",
    }
  );
  const recaptchaData = await recaptchaResponse.json();

  if (!recaptchaData.success || recaptchaData.score < 0.5) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "reCAPTCHA verification failed. Please try again."
    );
  }

  // 2. Email domain validation
  const emailValidationApiKey = functions.config().email_validation.api_key;

  if (!emailValidationApiKey) {
    console.error("Email validation API key is not configured.");
    // Fallback to basic domain check if API key is not set
    const domain = email.split("@")[1];
    const personalEmailDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
    ]; // Add more if needed
    if (personalEmailDomains.includes(domain)) {
      return { is_safe: false, message: "Please use a work email address." };
    }
    // If not a known personal domain, we'll accept it for now.
    await admin
      .firestore()
      .collection("waitlist")
      .add({
        email,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    return {
      is_safe: true,
      message: "Thank you! Your request has been received.",
    };
  }

  try {
    // Using Reoon.com Email Verification API
    const validationResponse = await fetch(
      `https://api.reoon.com/api/v1/email-verify/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": emailValidationApiKey, // Reoon API key sent in header
        },
        body: JSON.stringify({ email: email }),
      }
    );
    const validationData = await validationResponse.json();

    // Check if the email is valid according to Reoon API
    if (
      validationData.status !== "safe" ||
      validationData.is_disposable ||
      validationData.is_free
    ) {
      let message = "Please use a valid work email address.";
      if (validationData.is_disposable) {
        message = "Disposable email addresses are not allowed.";
      } else if (validationData.is_free) {
        message =
          "Please use a work email. Personal email addresses are not allowed.";
      } else if (validationData.status === "unsafe") {
        message = "This email address is considered unsafe.";
      } else if (validationData.status === "risky") {
        message = "This email address is considered risky.";
      }
      return { is_safe: false, message };
    }

    // 3. Add email to waitlist in Firestore
    await admin.firestore().collection("waitlist").add({
      email: email,
      domain: validationData.domain,
      status: validationData.status,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return {
      is_safe: true,
      message: "Thank you! Your request has been added to the waitlist.",
    };
  } catch (error) {
    console.error("Email validation or Firestore error:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while processing your request."
    );
  }
});
