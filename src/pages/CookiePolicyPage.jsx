import React from 'react';

// Helper layout component for consistent styling
const LegalPageLayout = ({ title, children }) => (
    <div className="bg-white dark:bg-slate-900 py-16 sm:py-20">
      <div className="container mx-auto px-6">
        <div className="prose prose-slate mx-auto max-w-4xl dark:prose-invert">
          <h1>{title}</h1>
          {children}
        </div>
      </div>
    </div>
);


const CookiePolicyPage = () => {
  return (
    <LegalPageLayout title="Cookie Policy">
      <p>
        This Cookie Policy explains how we, CryptoLabs, use cookies and similar tracking technologies on our website. By using our site, you consent to the use of cookies as described in this policy.
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit websites. They help us recognize your device, enhance your experience, and provide insights into how our site is being used.
      </p>

      <h2>2. Types of Cookies We Use</h2>
      <ul>
        <li>
          <strong>Essential Cookies:</strong> Necessary for the functioning of our website. These include session management and security features.
        </li>
        <li>
          <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website, such as Google Analytics or similar tools.
        </li>
        <li>
          <strong>Preference Cookies:</strong> Remember your settings and preferences to personalize your experience (e.g., language or region).
        </li>
        <li>
          <strong>Marketing Cookies:</strong> Used to deliver relevant ads and track the effectiveness of our marketing campaigns.
        </li>
      </ul>

      <h2>3. How We Use Cookies</h2>
      <p>
        We use cookies to:
      </p>
      <ul>
        <li>Operate and secure our website</li>
        <li>Improve performance and user experience</li>
        <li>Analyze traffic and usage trends</li>
        <li>Support marketing and advertising efforts</li>
      </ul>

      <h2>4. Third-Party Cookies</h2>
      <p>
        We may allow third-party service providers to set cookies on your device for analytics and advertising purposes. These providers may collect information about your online activities over time and across different websites.
      </p>

      <h2>5. Your Cookie Choices</h2>
      <p>
        You can control or disable cookies through your browser settings. However, disabling essential cookies may impact the functionality of our website.
      </p>

      <h2>6. Data Privacy Compliance</h2>
      <p>
        We comply with applicable data protection laws including the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA). For more information on how we handle your data, please see our <a href="/privacy-policy">Privacy Policy</a>.
      </p>

      <h2>7. Updates to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in legal requirements or our practices. We encourage you to review this page periodically.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions about our Cookie Policy, please contact us at <a href="mailto:support@cryptolabs.com">support@cryptolabs.com</a>.
      </p>
    </LegalPageLayout>
  );
};

export default CookiePolicyPage;