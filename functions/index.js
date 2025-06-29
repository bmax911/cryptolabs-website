
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();

exports.verifyEmail = functions.https.onCall(async (data, context) => {
  const { email, "g-recaptcha-response": token } = data;

  // reCAPTCHA verification
  const secretKey = functions.config().recaptcha.secret;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    {
      method: "POST",
    }
  );
  const recaptchaData = await response.json();

  if (!recaptchaData.success || recaptchaData.score < 0.5) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "reCAPTCHA verification failed."
    );
  }

  // Add your email verification logic here.
  // For example, you could add the email to a Firestore collection
  // of pending users, or send a verification email.

  return { is_safe: true, message: "Email verification successful." };
});
