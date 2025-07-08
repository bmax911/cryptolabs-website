import React, { useState } from 'react';

const CashbackProgram = () => {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: '', text: '' });
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('https://n8n.zephyrboost.com/webhook/cashback-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to submit request');
      setMessage({ type: 'success', text: 'Request submitted! We will review your eligibility.' });
      e.target.reset();
    } catch (err) {
      setMessage({ type: 'error', text: 'Submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "block w-full rounded-md border-slate-300 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 focus:border-blue-500 focus:ring-blue-500 sm:text-sm";
  const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-lg border bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-bold">Join Trading Fee Cashback Program</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Only available for <b>new sign up users</b> on supported crypto exchanges. Please fill in your details.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label htmlFor="exchange" className={labelClass}>Crypto Exchange Name</label>
            <input type="text" name="exchange" id="exchange" required placeholder="e.g. Binance" className={`mt-1 ${inputClass}`} />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Your Email</label>
            <input type="email" name="email" id="email" required placeholder="you@example.com" className={`mt-1 ${inputClass}`} />
          </div>
          <div>
            <label htmlFor="desc" className={labelClass}>Description</label>
            <textarea name="desc" id="desc" rows="4" required placeholder="Explain why you want to join..." className={`mt-1 ${inputClass}`}></textarea>
          </div>
          
          {message.text && (
            <div className={`rounded-md p-3 text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
              {message.text}
            </div>
          )}

          <button type="submit" disabled={submitting} className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50">
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CashbackProgram;