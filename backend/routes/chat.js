import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "No message provided" });
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
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: message }
          ],
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    // 🔍 DEBUG LOG (important)
    console.log("GROQ RAW RESPONSE:", JSON.stringify(data, null, 2));

    let reply = "No response from AI";

    if (data?.choices && data.choices.length > 0) {
      reply = data.choices[0].message?.content || reply;
    }

    if (data?.error) {
      reply = `Groq Error: ${data.error.message || "Unknown error"}`;
    }

    res.json({ reply });

  } catch (err) {
    console.error("GROQ ERROR:", err.message);
    res.status(500).json({ reply: "AI service unavailable" });
  }
});

export default router;

