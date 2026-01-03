import { sendMessage } from "./chat.js";

export async function askAI(msg) {
  await sendMessage(msg, "text");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_OPENAI_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: msg }]
    })
  });

  const data = await res.json();
  const reply = data.choices[0].message.content;

  await sendMessage(reply, "ai");
}

