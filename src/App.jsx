import { useState, useRef, useEffect } from 'react';
import { askIPLBot } from './services/gemini';
import ReactMarkdown from 'react-markdown';

const SUGGESTED = [
  "🏏 Who won IPL 2024?",
  "📊 Kohli's best IPL season?",
  "🔥 Top 5 bowlers of all time?",
  "💡 Best fantasy picks this season?",
  "🏟️ Wankhede vs Eden pitch stats?",
  "⚔️ CSK vs MI head to head?",
];

const WELCOME = "Hey! I'm CricketGPT 🏏 Your personal IPL analyst. Ask me about teams, players, records, or match predictions!";

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: WELCOME }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTeam, setActiveTeam] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(text) {
    const userMsg = (text || input).trim();
    if (!userMsg || loading) return;
    setInput('');
    setError(null);

    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const reply = await askIPLBot(newMessages);
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch {
      setError("Wicket! Something went wrong. Please try again. 🏏");
      setTimeout(() => setError(null), 4000);
    } finally {
      setLoading(false);
    }
  }

  const teams = ['MI','CSK','RCB','KKR','SRH','DC','RR','GT'];
  const showEmpty = messages.length === 1;

  return (
    <div className="app">
      <header className="header">
        <div className="header-logo">🏏</div>
        <div>
          <div className="header-title">CricketGPT</div>
          <div className="header-subtitle">IPL Analyst · Powered by OpenRouter</div>
        </div>
        <div className="live-badge">
          <div className="live-dot"></div>
          <span>Live</span>
        </div>
      </header>

      <div className="team-bar">
        {teams.map(t => (
          <div
            key={t}
            className={`team-pill ${t.toLowerCase()} ${activeTeam === t ? 'active' : ''}`}
            onClick={() => setActiveTeam(activeTeam === t ? null : t)}
          >
            {t}
          </div>
        ))}
      </div>

      <div className="chat">
        <div className="match-banner">
          <div className="match-badge">LIVE</div>
          <div className="match-name">KKR vs MI · Qualifier 1</div>
          <div className="match-score">KKR 142/3 (16.2)</div>
        </div>

        {showEmpty && (
          <div className="empty-state">
            <div className="empty-icon">🏏</div>
            <h2>Ask me anything about IPL</h2>
            <p>Stats, predictions, players, records — I know it all.</p>
            <div className="chips">
              {SUGGESTED.map(q => (
                <div key={q} className="chip" onClick={() => sendMessage(q)}>{q}</div>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.role === 'user' ? 'user' : ''}`}>
            {msg.role === 'assistant' && <div className="bot-avatar">🏏</div>}
            <div className={`bubble ${msg.role === 'assistant' ? 'bot' : 'user'}`}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="msg">
            <div className="bot-avatar">🏏</div>
            <div className="typing-bubble">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="typing-text">Analysing squad data...</div>
            </div>
          </div>
        )}

        {error && <div className="error-banner">{error}</div>}

        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <div className="input-row">
          <input
            value={input}
            onChange={e => setInput(e.target.value.slice(0, 300))}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about IPL teams, players, records..."
          />
          {input.length > 250 && (
            <span className={`char-count ${input.length > 280 ? 'warn' : ''}`}>
              {300 - input.length}
            </span>
          )}
          <button
            className="send-btn"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}