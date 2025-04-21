import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { BsRobot } from "react-icons/bs";


const formatResponse = (text) => {
  const boldText = text.replace(/\*\*(.*?)\*\*/g, '<span class="bold-text">$1</span>');
  const bulletPoints = boldText.replace(/\* (.*?)(?=\n|$)/g, '<div class="bullet"><span>•</span><span>$1</span></div>');
  const withLineBreaks = bulletPoints.replace(/\n/g, '<br />');
  return withLineBreaks;
};

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: input }] }],
      });

      const text = result.response.text();
      const assistantMessage = {
        role: 'assistant',
        content: text,
        formatted: formatResponse(text),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: `Error: ${error.message || 'Something went wrong.'}`,
        formatted: `<span class="error-text">Error: ${error.message || 'Something went wrong.'}</span>`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>
        <BsRobot />
      </div>

      {isOpen && (
        <div className="chatbot-box" ref={wrapperRef}>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'user' ? 'user' : 'assistant'}`}
              >
                {message.role === 'assistant' && message.formatted ? (
                  <div dangerouslySetInnerHTML={{ __html: message.formatted }} />
                ) : (
                  message.content
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message assistant loading">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="chatbot-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              disabled={isLoading}
            />
            <button type="submit" disabled={!input.trim() || isLoading}>
              <PaperAirplaneIcon className="icon" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
