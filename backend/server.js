import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

let memory = [];

app.post("/ai", async (req, res) => {
  const userMsg = req.body.message;

  memory.push({ role: "user", content: userMsg });

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer YOUR_API_KEY`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: memory.slice(-10)
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  memory.push({ role: "assistant", content: reply });

  res.json({ reply });
});

app.listen(3000);
