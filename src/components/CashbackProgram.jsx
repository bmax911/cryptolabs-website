import React, { useState } from 'react';
import './CashbackProgram.css';

const CashbackProgram = () => {
  const [exchange, setExchange] = useState('');
  const [email, setEmail] = useState('');
  const [desc, setDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess('');
    setError('');
    try {
      const res = await fetch('https://n8n.zephyrboost.com/webhook/cashback-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exchange, email, desc }),
      });
      if (!res.ok) throw new Error('Failed to submit request');
      setSuccess('Request submitted! We will review your eligibility.');
      setExchange('');
      setEmail('');
      setDesc('');
    } catch (err) {
      setError('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cashback-container">
      <div className="cashback-card">
        <h3>Join Trading Fee Cashback Program</h3>
        <p>Only available for <b>new sign up users</b> on supported crypto exchanges. Please fill in your details:</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Crypto Exchange Name</label>
            <input type="text" value={exchange} onChange={e => setExchange(e.target.value)} required placeholder="e.g. Binance" />
          </div>
          <div className="form-group">
            <label>Your Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} required placeholder="Explain why you want to join the cashback program..." />
          </div>
          {success && <div className="popup-success">{success}</div>}
          {error && <div className="popup-error">{error}</div>}
          <button type="submit" className="submit-button" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
        </form>
      </div>
    </div>
  );
};

export default CashbackProgram;
