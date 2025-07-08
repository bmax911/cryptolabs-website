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


const DisclaimerPage = () => {
  return (
    <LegalPageLayout title="Disclaimer">
      <p>
        The information provided on this website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
      </p>
      <p>
        Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
      </p>
      <p>
        The site may contain links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
      </p>
    </LegalPageLayout>
  );
};

export default DisclaimerPage;