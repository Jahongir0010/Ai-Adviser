const { getClient, getModel } = require('../config/gemini.config');

function wrapUpstreamError(err) {
  if (err.status === 503) return err; // "not configured" - already a clean error
  const wrapped = new Error('AI xizmatidan javob olishda xatolik yuz berdi');
  wrapped.status = 502;
  wrapped.cause = err;
  return wrapped;
}

async function generateText({ prompt, systemInstruction, temperature, maxOutputTokens }) {
  const ai = getClient();

  try {
    const response = await ai.models.generateContent({
      model: getModel(),
      contents: prompt,
      config: {
        ...(systemInstruction ? { systemInstruction } : {}),
        ...(temperature !== undefined ? { temperature } : {}),
        ...(maxOutputTokens !== undefined ? { maxOutputTokens } : {}),
      },
    });

    return response.text;
  } catch (err) {
    throw wrapUpstreamError(err);
  }
}

async function generateJson({ prompt, systemInstruction, schema, temperature }) {
  const ai = getClient();

  try {
    const response = await ai.models.generateContent({
      model: getModel(),
      contents: prompt,
      config: {
        ...(systemInstruction ? { systemInstruction } : {}),
        ...(temperature !== undefined ? { temperature } : {}),
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });

    return JSON.parse(response.text);
  } catch (err) {
    throw wrapUpstreamError(err);
  }
}

async function sendChatMessage({ message, history, systemInstruction }) {
  const ai = getClient();

  try {
    const chat = ai.chats.create({
      model: getModel(),
      history,
      config: systemInstruction ? { systemInstruction } : undefined,
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (err) {
    throw wrapUpstreamError(err);
  }
}

module.exports = {
  generateText,
  generateJson,
  sendChatMessage,
};
