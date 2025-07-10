const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔹 Summarize gig description
async function summarizeGig(description) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: `Summarize this gig description in 1-2 sentences:\n${description}` }
    ],
  });

  return response.choices[0].message.content.trim();
}

// 🔹 Extract keywords from description
async function extractKeywords(description) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: `Extract 5 relevant keywords from the following gig description:\n${description}` }
    ],
  });

  return response.choices[0].message.content
    .split(/[,|\n]+/)
    .map((kw) => kw.trim())
    .filter((kw) => kw.length);
}

module.exports = { summarizeGig, extractKeywords };
console.log("OpenAI KEY:", process.env.OPENAI_API_KEY); // 👈 should log full key

