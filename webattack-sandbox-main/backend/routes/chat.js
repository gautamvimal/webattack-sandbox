import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("✅ /api/chat HIT");

  const userMessage = req.body.message;

  try {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/Meta-Llama-3-8B-Instruct",
          messages: [
            {
              role: "system",
              content: "You are a text-only assistant. Answer using text or code only."
            },
            {
              role: "user",
              content: userMessage
            }
          ]
        })
      }
    );

    // 🚨 IMPORTANT: handle non-JSON responses
    if (!response.ok) {
      const text = await response.text();
      console.error("HF NON-JSON RESPONSE:", text);
      return res.json({ reply: `HF Error: ${text}` });
    }

    const data = await response.json();
    console.log("HF RAW RESPONSE:", JSON.stringify(data, null, 2));

    let reply = "No response from AI";

    if (data?.choices?.[0]?.message?.content) {
      reply = data.choices[0].message.content;
    }

    res.json({ reply });

  } catch (error) {
    console.error("🔥 CHATBOT ERROR:", error.message);
    res.status(500).json({
      reply: "Backend error",
      error: error.message
    });
  }
});

export default router;
