export async function sendAI(message) {
  const res = await fetch("http://localhost:3000/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  return (await res.json()).reply;
}
