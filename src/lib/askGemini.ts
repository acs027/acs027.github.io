export async function askGemini(prompt: string) {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/gemini`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return data.reply;
}
