import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const API_URL = import.meta.env.VITE_API_URL;

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  // ✅ DEFAULT DARK MODE CHANGE (only modification)
  const [dark, setDark] = useState(
    localStorage.getItem("chat-dark") !== "false"
  );

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, `**You:** ${input}`]);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setMessages(prev => [...prev, `**Bot:**\n${data.reply}`]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        "**Bot:** Backend not reachable"
      ]);
    }

    setInput("");
  };

  const theme = {
    bg: dark ? "#121212" : "#ffffff",
    text: dark ? "#eaeaea" : "#000000",
    border: dark ? "#333" : "#ccc"
  };

  return (
    <>
      {/* Floating button */}
      <button
        className="chatbot-floating-btn"
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 999,
          width: 56,
          height: 56,
          borderRadius: "50%",
          fontSize: "26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(0,0,0,0.3)"
        }}
      >
        🤖
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 340,
            height: 450,
            background: theme.bg,
            color: theme.text,
            border: `1px solid ${theme.border}`,
            padding: 10,
            overflowY: "auto",
            zIndex: 999
          }}
        >
          {/* Dark mode toggle */}
          <button
            onClick={() => {
              localStorage.setItem("chat-dark", (!dark).toString());
              setDark(!dark);
            }}
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* Messages */}
          {messages.map((m, i) => (
            <ReactMarkdown
              key={i}
              components={{
                code({ children }) {
                  return (
                    <SyntaxHighlighter language="javascript">
                      {String(children)}
                    </SyntaxHighlighter>
                  );
                }
              }}
            >
              {m}
            </ReactMarkdown>
          ))}

          {/* Input */}
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask text or code..."
            style={{
              width: "100%",
              marginTop: 8,
              background: dark ? "#1e1e1e" : "#fff",
              color: theme.text
            }}
          />

          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </>
  );
};

export default Chatbot;
