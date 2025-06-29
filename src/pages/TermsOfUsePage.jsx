import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfUsePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
        <div className="space-y-6 text-white text-lg">
          <p>
            These Terms of Use ("Terms") govern your use of the CryptoLabs website and any related services provided by CryptoLabs ("we", "our", or "us"). By accessing or using our site, you agree to be bound by these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-6">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our website, you acknowledge that you have read, understood, and agree to comply with these Terms. If you do not agree with these Terms, you must not use the site.
          </p>

          <h2 className="text-2xl font-semibold mt-6">2. Eligibility</h2>
          <p>
            You must be at least 18 years of age or have legal parental or guardian consent to use our services. By using our site, you represent and warrant that you meet this requirement.
          </p>

          <h2 className="text-2xl font-semibold mt-6">3. Use of the Website</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You may use the website for lawful purposes only.</li>
            <li>You must not use our site in a way that violates any applicable laws or regulations.</li>
            <li>You must not attempt to gain unauthorized access to any portion of the website or any systems or networks related to it.</li>
            <li>CryptoLabs reserves the right to suspend or terminate access if any activity is deemed harmful, illegal, or abusive.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">4. Intellectual Property</h2>
          <p>
            All content, including but not limited to text, graphics, logos, and software, is the property of CryptoLabs or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, modify, or publicly display any content without prior written permission.
          </p>

          <h2 className="text-2xl font-semibold mt-6">5. User Accounts</h2>
          <p>
            If you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use.
          </p>

          <h2 className="text-2xl font-semibold mt-6">6. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We do not control or endorse these sites and are not responsible for their content or practices. You access such websites at your own risk.
          </p>

          <h2 className="text-2xl font-semibold mt-6">7. Disclaimers</h2>
          <p>
            Our services are provided "as is" and "as available" without warranties of any kind, express or implied. We do not guarantee that the site will be uninterrupted or error-free.
          </p>

          <h2 className="text-2xl font-semibold mt-6">8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, CryptoLabs shall not be liable for any indirect, incidental, special, or consequential damages arising from or related to your use of the website.
          </p>

          <h2 className="text-2xl font-semibold mt-6">9. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless CryptoLabs and its affiliates from any claims, damages, liabilities, or expenses arising out of your use of the website or your violation of these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-6">10. Changes to the Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Any changes will be effective upon posting on this page. Your continued use of the website after changes are posted constitutes your acceptance of the revised Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-6">11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which CryptoLabs operates, without regard to its conflict of law principles.
          </p>

          <h2 className="text-2xl font-semibold mt-6">12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at: <a href="mailto:support@cryptolabs.com" className="text-blue-400 underline">support@cryptolabs.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUsePage;
