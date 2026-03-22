import { IPL_SYSTEM_PROMPT } from "../data/iplKnowledge.js";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function askIPLBot(messages) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": "https://cricket-gpt-indol.vercel.app/",
        "X-Title": "CricketGPT",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [
          { role: "system", content: IPL_SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 1024,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("OpenRouter error:", err);
      throw new Error("API request failed");
    }

    const data = await response.json();
    console.log("Response:", data);
    return data.choices[0].message.content;

  } catch (err) {
    console.error("FULL ERROR:", err);
    throw err;
  }
}