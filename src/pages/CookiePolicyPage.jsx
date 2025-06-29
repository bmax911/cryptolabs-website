import Header from '../components/Header';
import Footer from '../components/Footer';

const CookiePolicyPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        <div className="space-y-6 text-white text-lg">
          <p>
            This Cookie Policy explains how we, CryptoLabs, use cookies and similar tracking technologies on our website. By using our site, you consent to the use of cookies as described in this policy.
          </p>

          <h2 className="text-2xl font-semibold mt-6">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit websites. They help us recognize your device, enhance your experience, and provide insights into how our site is being used.
          </p>

          <h2 className="text-2xl font-semibold mt-6">2. Types of Cookies We Use</h2>
          <ul className="list-disc pl-6 space-y-2">
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

          <h2 className="text-2xl font-semibold mt-6">3. How We Use Cookies</h2>
          <p>
            We use cookies to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Operate and secure our website</li>
            <li>Improve performance and user experience</li>
            <li>Analyze traffic and usage trends</li>
            <li>Support marketing and advertising efforts</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">4. Third-Party Cookies</h2>
          <p>
            We may allow third-party service providers to set cookies on your device for analytics and advertising purposes. These providers may collect information about your online activities over time and across different websites.
          </p>

          <h2 className="text-2xl font-semibold mt-6">5. Your Cookie Choices</h2>
          <p>
            You can control or disable cookies through your browser settings. However, disabling essential cookies may impact the functionality of our website.
          </p>
          <p>
            You can also opt-out of third-party tracking via tools such as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Google Analytics Opt-Out</a></li>
            <li><a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">YourAdChoices</a></li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">6. Data Privacy Compliance</h2>
          <p>
            We comply with applicable data protection laws including the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA). For more information on how we handle your data, please see our <a href="/privacy-policy" className="text-blue-400 underline">Privacy Policy</a>.
          </p>

          <h2 className="text-2xl font-semibold mt-6">7. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in legal requirements or our practices. We encourage you to review this page periodically.
          </p>

          <h2 className="text-2xl font-semibold mt-6">8. Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at <a href="mailto:support@cryptolabs.com" className="text-blue-400 underline">support@cryptolabs.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
