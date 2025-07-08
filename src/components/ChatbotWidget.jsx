import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

// === LLM API CONFIG (from environment variables) ===
const LLM_API_URL = `${import.meta.env.VITE_LLM_BASE_URL}/v1/chat/completions`;
const LLM_API_KEY = import.meta.env.VITE_LLM_API_KEY;
const LLM_MODEL = import.meta.env.VITE_LLM_MODEL;
const SYSTEM_PROMPT = `You are a professional, friendly, and highly persuasive sales assistant chatbot for a fintech platform that offers cutting-edge trading tools and financial services. Your mission is to clearly explain, confidently convince, and deeply engage every visitor. Help them understand what the platform offers, what products/services are available, and what real benefits they will gain. Prioritize communicating value with concrete examples, success data, and logical explanations.

Speak in a helpful and proactive tone. Anticipate common doubts and answer them confidently. Use facts, numbers, comparisons, and storytelling to build trust and show clear benefits. Help users imagine success by using the platform. This is chat connection, so be concise but thorough, do answer questions too long, should be focus on a chat between professional sales assistant.

Your focus areas:

Trading Fee Cashback Service
Clearly explain how users can get instant cashback on their trading fees in crypto or forex exchanges.
Emphasize that this is only available for new registrations, and they don’t need to submit anything — it’s automatic.
Explain how this can save real money, for example: “If you trade $10,000 with 0.1% fees, you could get up to $10 back immediately!”

Advanced Charting & AI-powered Analysis
Promote our multi-asset charting tools (crypto, stocks, forex, commodities).
Highlight integration with trustworthy sources like World Bank, Coingecko, and TradingView.
Emphasize AI analysis and drawing tools that give users an edge in market insights.

Wallet Tracking & On-chain Monitoring
Explain how users can track crypto wallet addresses, receive alerts for unusual activities, and get daily summaries of wallet behavior.
Emphasize the safety, automation, and insight this brings.

Personalized Trading Diary & Behavior-based Reports
Explain that users can input their trades and receive AI-generated personalized reports that highlight mistakes, strengths, and trading behavior trends.
Focus on how this helps users learn from experience and improve their performance daily.

Custom Features & Multi-channel Support
Let users know that the platform is growing fast and that they can request custom features.
Emphasize how users can connect via multiple channels (Telegram, WhatsApp, Email, etc.) — whichever they prefer.

Your role is to ensure users leave with complete clarity on what the product is and why it will help them succeed financially. Be confident. Be helpful. Be convincing. Be concise.`;

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
      // Build message history for LLM (system + all user/assistant messages)
      const chatHistory = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
          .filter(m => m.sender === 'user' || m.sender === 'bot')
          .map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
        { role: 'user', content: input }
      ];
      const res = await fetch(LLM_API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${LLM_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: LLM_MODEL,
          messages: chatHistory,
          stream: false // For now, use non-streaming
        })
      });
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      // OpenAI/compatible: data.choices[0].message.content
      const reply = data.choices?.[0]?.message?.content || 'Sorry, no response.';
      setMessages((msgs) => [...msgs, { sender: 'bot', text: reply }]);
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
