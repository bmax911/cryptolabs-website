const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.verifyEmail = functions.https.onCall(async (data, context) => {
  const { email } = data;

  // Basic domain check against personal email providers
  const domain = email.split("@")[1].toLowerCase();
  const personalEmailDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "aol.com",
    "icloud.com",
    "mail.com",
    "zoho.com",
    "yandex.com",
    "protonmail.com",
  ];

  if (personalEmailDomains.includes(domain)) {
    return {
      is_safe: false,
      message:
        "Please use a work email address. Personal emails are not allowed.",
    };
  }

  // If not a known personal domain, add it to the waitlist.
  try {
    await admin.firestore().collection("waitlist").add({
      email,
      domain,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    return {
      is_safe: true,
      message: "Thank you! Your request has been added to the waitlist.",
    };
  } catch (error) {
    console.error("Error adding email to waitlist:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while adding you to the waitlist."
    );
  }
});
