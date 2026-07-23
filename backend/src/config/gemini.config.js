const { GoogleGenAI } = require('@google/genai');

// "-latest" alias always resolves to Google's current recommended flash model,
// so this doesn't need updating every time a dated model version is retired.
const DEFAULT_MODEL = 'gemini-flash-latest';

let client = null;

function getClient() {
  if (!process.env.GEMINI_API_KEY) {
    const err = new Error('GEMINI_API_KEY is not set - AI features are not configured yet');
    err.status = 503;
    throw err;
  }

  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  return client;
}

function getModel() {
  return process.env.GEMINI_MODEL || DEFAULT_MODEL;
}

module.exports = { getClient, getModel };
