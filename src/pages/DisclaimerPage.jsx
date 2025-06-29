import Header from '../components/Header';
import Footer from '../components/Footer';

const DisclaimerPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
        <div className="space-y-6 text-white text-lg">
          <p>
            The information provided on this website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>
          <p>
            Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
          </p>
          <p>
            The site may contain links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DisclaimerPage;
