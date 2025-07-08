import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaLightbulb, FaHeart, FaArrowRight } from 'react-icons/fa';

const Section = ({ children, className = '' }) => (
  <section className={`py-16 sm:py-20 ${className}`}>
    <div className="container mx-auto px-6">{children}</div>
  </section>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">{children}</h2>
);

const HonorCard = ({ icon, title, description }) => (
  <div className="rounded-lg border bg-white p-8 dark:bg-slate-800">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-bold">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400">{description}</p>
  </div>
);

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Section className="bg-slate-50 dark:bg-slate-900 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          About CryptoLabs
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
          Empowering traders and investors with cutting-edge technology, AI-driven insights, and a comprehensive suite of tools designed for financial success.
        </p>
      </Section>

      {/* Mission Section */}
      <Section>
        <SectionTitle>Our Mission</SectionTitle>
        <p className="mx-auto mt-6 max-w-4xl text-center text-xl text-slate-600 dark:text-slate-400">
          We believe that every trader deserves access to professional-grade tools, real-time data, and intelligent insights that were once exclusive to large institutions.
        </p>
      </Section>
      
      {/* Code of Honor Section */}
      <Section className="bg-slate-50 dark:bg-slate-900">
        <SectionTitle>Our Code of Honor</SectionTitle>
        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3">
          <HonorCard
            icon={<FaUsers className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
            title="Users First"
            description="We succeed when you succeed. Our focus is on providing objective tools and data to help you make better decisions."
          />
          <HonorCard
            icon={<FaLightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
            title="Empowerment Through Data"
            description="We provide the charts and data, but our real product is the freedom and opportunity that comes with financial literacy."
          />
          <HonorCard
            icon={<FaHeart className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
            title="Finance is Social"
            description="We foster open discussion and learning within our community, because shared knowledge is the key to understanding."
          />
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to Transform Your Trading?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Join thousands of traders using our platform to make smarter, more profitable decisions.
        </p>
        <div className="mt-8">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
          >
            <span>Get Started Free</span>
            <FaArrowRight />
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default AboutPage;