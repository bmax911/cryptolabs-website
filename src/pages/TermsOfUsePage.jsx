import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfUsePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Terms of Use</h1>
        <div className="space-y-4">
          <p>Placeholder text for Terms of Use. Replace this with your actual content.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUsePage;
