const { Type } = require('@google/genai');
const geminiService = require('./gemini.service');

function toGeminiHistory(history = []) {
  return history.map((turn) => ({
    role: turn.role,
    parts: [{ text: turn.text }],
  }));
}

async function chat({ message, history }) {
  const reply = await geminiService.sendChatMessage({
    message,
    history: toGeminiHistory(history),
    systemInstruction: 'You are the AI Adviser assistant for Uzbek entrepreneurs. Be concise and practical.',
  });
  return { reply };
}

async function generate({ prompt }) {
  const text = await geminiService.generateText({ prompt });
  return { text };
}

async function summarize({ text }) {
  const summary = await geminiService.generateText({
    prompt: text,
    systemInstruction: 'Summarize the given text clearly and concisely, preserving the key points. Reply with only the summary, no preamble.',
  });
  return { summary };
}

async function generateTitle({ text }) {
  const title = await geminiService.generateText({
    prompt: text,
    systemInstruction: 'Generate one short, descriptive title (under 10 words) for the given text. Reply with only the title, no quotes, no preamble.',
    temperature: 0.4,
  });
  return { title: title.trim() };
}

async function improve({ text, instructions }) {
  const systemInstruction = instructions
    ? `Rewrite the given text to improve it, following this instruction: "${instructions}". Reply with only the rewritten text.`
    : 'Rewrite the given text to improve clarity, grammar, and tone, while preserving its original meaning. Reply with only the rewritten text.';

  const improved = await geminiService.generateText({ prompt: text, systemInstruction });
  return { improved };
}

const IDEAS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    ideas: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ['title', 'description'],
      },
    },
  },
  required: ['ideas'],
};

async function brainstormIdeas({ topic, count }) {
  const result = await geminiService.generateJson({
    prompt: `Brainstorm ${count} distinct ideas about: ${topic}`,
    systemInstruction: 'You are a business brainstorming assistant. Generate practical, distinct ideas, each with a short title and a one-to-two sentence description.',
    schema: IDEAS_SCHEMA,
    temperature: 0.9,
  });
  return { ideas: result.ideas };
}

module.exports = {
  chat,
  generate,
  summarize,
  generateTitle,
  improve,
  brainstormIdeas,
};
