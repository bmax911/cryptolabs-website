import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-white text-lg">
          <p>
            This Privacy Policy outlines how CryptoLabs ("we", "our", or "us") collects, uses, discloses, and protects your personal information when you visit our website or use our services. We are committed to protecting your privacy and complying with data protection laws such as the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA).
          </p>

          <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, company name, phone number, and other contact details when voluntarily provided.</li>
            <li><strong>Account Information:</strong> Login credentials and authentication data.</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on site, referring websites, IP address, browser type, and device information.</li>
            <li><strong>Cookies and Tracking:</strong> See our <a href="/cookie-policy" className="text-blue-400 underline">Cookie Policy</a> for more details.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide, operate, and maintain our services</li>
            <li>To respond to inquiries and provide customer support</li>
            <li>To improve user experience and optimize performance</li>
            <li>To send service-related updates, newsletters, and promotional messages (with your consent)</li>
            <li>To ensure security and prevent fraud or abuse</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">3. Legal Basis for Processing (GDPR)</h2>
          <p>We process personal data under the following lawful bases:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Consent</li>
            <li>Contractual necessity</li>
            <li>Legal obligation</li>
            <li>Legitimate interests</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">4. How We Share Information</h2>
          <p>We do not sell or rent your personal information. We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Trusted third-party service providers (e.g., analytics, hosting, marketing)</li>
            <li>Law enforcement or government agencies when legally required</li>
            <li>Business partners with your consent or where legally permissible</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">5. Data Retention</h2>
          <p>
            We retain personal data only as long as necessary for the purposes described in this policy, or as required by law. Once data is no longer required, we securely delete or anonymize it.
          </p>

          <h2 className="text-2xl font-semibold mt-6">6. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold mt-6">7. Your Rights</h2>
          <p>If you are located in certain jurisdictions, you may have the following rights:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access to your personal data</li>
            <li>Correction or deletion of your information</li>
            <li>Objection or restriction to certain processing</li>
            <li>Data portability</li>
            <li>Withdrawal of consent at any time (for consent-based processing)</li>
          </ul>
          <p>To exercise any of these rights, please contact us at <a href="mailto:support@cryptolabs.com" className="text-blue-400 underline">support@cryptolabs.com</a>.</p>

          <h2 className="text-2xl font-semibold mt-6">8. International Data Transfers</h2>
          <p>
            We may transfer your data outside your country of residence. Where applicable, we ensure appropriate safeguards are in place, such as standard contractual clauses.
          </p>

          <h2 className="text-2xl font-semibold mt-6">9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of these sites. We encourage you to read their privacy policies.
          </p>

          <h2 className="text-2xl font-semibold mt-6">10. Children’s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 13, and we do not knowingly collect personal data from children.
          </p>

          <h2 className="text-2xl font-semibold mt-6">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on this page.
          </p>

          <h2 className="text-2xl font-semibold mt-6">12. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p>
            CryptoLabs<br />
            Email: <a href="mailto:support@cryptolabs.com" className="text-blue-400 underline">support@cryptolabs.com</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
