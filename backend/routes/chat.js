import express from "express";

const router = express.Router();

/* ======================
   DOMAIN CONTROL
====================== */

const SYSTEM_PROMPT = `
You are an enthusiastic cybersecurity teacher inside a platform called "WebAttack Sandbox".

Your mission:
- Teach web security concepts, vulnerabilities, and defenses
- Help users understand how attacks work in theory and how to prevent them in practice
- Encourage ethical, legal, and responsible learning

Rules:
- Only discuss cybersecurity, web security, and secure software engineering topics
- Never provide instructions for illegal, unethical, or harmful activities
- You may explain attack concepts at a high level, but always focus on defense, detection, and secure design
- If a user asks about unrelated topics (movies, politics, life advice, memes, random facts), gently guide them back to cybersecurity

Tone:
- Friendly, enthusiastic, and mentor-like
- Curious, supportive, and educational
- Encourage hands-on learning in a safe, legal environment
`;

// Keywords to detect cybersecurity-related intent
const SECURITY_KEYWORDS = [
  "sql", "sqli", "xss", "csrf", "injection", "auth", "authentication",
  "login", "password", "hash", "hashing", "encryption", "jwt", "session",
  "cookie", "vulnerability", "exploit", "attack", "defense", "secure",
  "security", "pentest", "penetration", "firewall", "cors", "api",
  "backend", "frontend", "input validation", "sanitization", "rate limit",
  "ddos", "bruteforce", "owasp", "sandbox"
];

function isSecurityRelated(text) {
  const lower = text.toLowerCase();
  return SECURITY_KEYWORDS.some((k) => lower.includes(k));
}

/* ======================
   ROUTE
====================== */

router.post("/", async (req, res) => {
  const { message, lab } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "No message provided." });
  }

  // Hard domain filter — no AI call if it's not security-related
  if (!isSecurityRelated(message)) {
    return res.json({
      reply: `🛡️ I'm your cybersecurity assistant!

I focus only on **web security and ethical hacking topics**.

Since you're in the **${lab || "WebAttack Sandbox"}**, you can try asking things like:
- Why did this login fail?
- How does SQL injection work here?
- How can this be secured properly?
- What OWASP risk does this demonstrate?

Let’s learn how to **break things safely and build them securely! 🔐**`
    });
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `
Context:
You are assisting inside WebAttack Sandbox.
Current lab: ${lab || "General Security Training"}

User question:
${message}
`
            }
          ],
          temperature: 0.6
        })
      }
    );

    const data = await response.json();

    let reply = "No response from AI.";

    if (data?.choices?.length) {
      reply = data.choices[0].message?.content || reply;
    }

    if (data?.error) {
      console.error("GROQ API ERROR:", data.error);
      reply = "AI service is temporarily unavailable. Please try again.";
    }

    res.json({ reply });
  } catch (err) {
    console.error("GROQ ERROR:", err.message);
    res.status(500).json({ reply: "AI service unavailable." });
  }
});

export default router;
