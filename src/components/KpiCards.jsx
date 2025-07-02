
import React, { useState } from 'react';
import { FaMoneyBillWave, FaUserFriends, FaUser, FaChartLine, FaRobot } from 'react-icons/fa';

const kpis = [
  { icon: <FaMoneyBillWave />, label: 'Trading Fee Cashback', color: 'primary' },
  { icon: <FaUserFriends />, label: 'Referral', value: '8', color: 'accent' },
  { icon: <FaUser />, label: 'Profile', value: 'Verified', color: 'neutral' },
  { icon: <FaChartLine />, label: 'Research Analysis', value: '5 Reports', color: 'accent' },
  { icon: <FaRobot />, label: 'AI Assistant', value: 'Active', color: 'primary' },
];

const HEROKU_APP_URL = 'https://www.cryptolabs.cfd/';

const KpiCards = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [exchange, setExchange] = useState('');
  const [email, setEmail] = useState('');
  const [desc, setDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleCashbackClick = () => setShowPopup(true);
  const handlePopupClose = () => {
    setShowPopup(false);
    setExchange('');
    setEmail('');
    setDesc('');
    setSuccess('');
    setError('');
  };

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
      setExchange(''); setEmail(''); setDesc('');
    } catch (err) {
      setError('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="kpi-cards-row">
      <div className="kpi-card kpi-primary" style={{ cursor: 'pointer' }} onClick={handleCashbackClick}>
        <span className="kpi-icon"><FaMoneyBillWave /></span>
        <span className="kpi-label">Trading Fee Cashback</span>
      </div>
      <div className="kpi-card kpi-accent">
        <span className="kpi-icon"><FaUserFriends /></span>
        <span className="kpi-value">8</span>
        <span className="kpi-label">Referral</span>
      </div>
      <div className="kpi-card kpi-neutral">
        <span className="kpi-icon"><FaUser /></span>
        <span className="kpi-value">Verified</span>
        <span className="kpi-label">Profile</span>
      </div>
      <div className="kpi-card kpi-accent" style={{ cursor: 'pointer' }} onClick={() => window.open(HEROKU_APP_URL, '_blank', 'noopener') }>
        <span className="kpi-icon"><FaChartLine /></span>
        <span className="kpi-value">5 Reports</span>
        <span className="kpi-label">Research Analysis</span>
      </div>
      <div className="kpi-card kpi-primary">
        <span className="kpi-icon"><FaRobot /></span>
        <span className="kpi-value">Active</span>
        <span className="kpi-label">AI Assistant</span>
      </div>

      {showPopup && (
        <div className="cashback-popup-overlay" onClick={handlePopupClose}>
          <div className="cashback-popup" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={handlePopupClose}>&times;</button>
            <h3>Join Trading Fee Cashback Program</h3>
            <p>Only available for <b>new sign up users</b> on supported crypto exchanges. Please fill in your details:</p>
            <form onSubmit={handleSubmit}>
              <div className="popup-group">
                <label>Crypto Exchange Name</label>
                <input type="text" value={exchange} onChange={e => setExchange(e.target.value)} required placeholder="e.g. Binance" />
              </div>
              <div className="popup-group">
                <label>Your Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
              </div>
              <div className="popup-group">
                <label>Description</label>
                <textarea value={desc} onChange={e => setDesc(e.target.value)} required placeholder="Explain why you want to join the cashback program..." />
              </div>
              {success && <div className="popup-success">{success}</div>}
              {error && <div className="popup-error">{error}</div>}
              <button type="submit" className="popup-submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KpiCards;
