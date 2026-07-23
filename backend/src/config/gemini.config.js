const { GoogleGenAI } = require('@google/genai');

const DEFAULT_MODEL = 'gemini-2.5-flash';

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
