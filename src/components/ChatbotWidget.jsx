import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

const API_URL = 'https://n8n.zephyrboost.com/webhook/chatbot';

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am CryptoLabs AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setMessages((msgs) => [...msgs, { sender: 'bot', text: data.reply || 'Sorry, no response.' }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: 'bot', text: 'Sorry, there was an error. Please try again.' }]);
      setError('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed z-50 bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat assistant"
        style={{ boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.18)' }}
      >
        {open ? <FaTimes className="h-6 w-6" /> : <FaComments className="h-6 w-6" />}
      </button>
      {/* Chat Window */}
      {open && (
        <div className="fixed z-50 bottom-24 right-6 w-80 max-w-[95vw] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col animate-fade-in" style={{ minHeight: '420px', maxHeight: '70vh' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-blue-600 dark:bg-blue-900 rounded-t-2xl">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <FaRobot className="h-5 w-5" /> CryptoLabs AI
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:text-blue-200 p-1 rounded focus:outline-none">
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-slate-50 dark:bg-slate-800" style={{ minHeight: 0 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl shadow text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-bl-sm'} transition-all`}>
                  <span className="inline-flex items-center gap-1">
                    {msg.sender === 'user' ? <FaUser className="inline h-4 w-4 mr-1 opacity-70" /> : <FaRobot className="inline h-4 w-4 mr-1 opacity-70" />}
                    {msg.text}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-b-2xl">
            <input
              type="text"
              className="flex-1 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 flex items-center justify-center transition-colors disabled:opacity-50"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <FaPaperPlane className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
