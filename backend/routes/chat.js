import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: userMessage
        })
      }
    );

    const data = await response.json();

    let reply = "No response from AI";

    if (Array.isArray(data) && data[0]?.generated_text) {
      reply = data[0].generated_text;
    } else if (data?.generated_text) {
      reply = data.generated_text;
    } else if (data?.error) {
      reply = `HF Error: ${data.error}`;
    }

    res.json({ reply });

  } catch (err) {
    console.error("CHAT ERROR:", err.message);
    res.status(500).json({ reply: "AI service unavailable" });
  }
});

export default router;
