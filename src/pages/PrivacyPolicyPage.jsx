// Example for PrivacyPolicyPage.jsx
const LegalPageLayout = ({ title, children }) => (
    <div className="bg-white dark:bg-slate-900 py-16 sm:py-20">
      <div className="container mx-auto px-6">
        <div className="prose prose-slate mx-auto dark:prose-invert">
          <h1>{title}</h1>
          {children}
        </div>
      </div>
    </div>
);

const PrivacyPolicyPage = () => {
  return (
    <LegalPageLayout title="Privacy Policy">
        <p>This Privacy Policy outlines how CryptoLabs ("we", "our", or "us") collects, uses, discloses, and protects your personal information when you visit our website or use our services. We are committed to protecting your privacy and complying with data protection laws such as the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA).</p>
        
        <h2>1. Information We Collect</h2>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, company name, phone number, and other contact details when voluntarily provided.</li>
          <li><strong>Account Information:</strong> Login credentials and authentication data.</li>
          {/* ... all other original text content ... */}
        </ul>
        
        <h2>12. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at: <a href="mailto:support@cryptolabs.com">support@cryptolabs.com</a>.</p>
    </LegalPageLayout>
  );
};

export default PrivacyPolicyPage;