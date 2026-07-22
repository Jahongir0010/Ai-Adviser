const fs = require('fs');
const path = require('path');
const geoService = require('./geo.service');

const QUESTIONS_PATH = path.join(__dirname, '..', '..', 'data', 'anketa-savollari.json');

const questions = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf-8'));
const questionByKey = new Map(questions.map((q) => [q.key, q]));

function resolveOptions(question, answersSoFar) {
  if (question.options) {
    return question.options;
  }

  if (question.optionsSource === 'regions') {
    return geoService.getRegions().map((r) => ({ value: r.id, label: r.name }));
  }

  if (question.optionsSource === 'districts') {
    const hududValue = answersSoFar ? answersSoFar[question.dependsOn] : undefined;
    if (hududValue === undefined) return [];
    return geoService.getDistrictsByRegionId(hududValue).map((d) => ({ value: d.id, label: d.name }));
  }

  if (question.optionsSource === 'mahallalar') {
    const tumanValue = answersSoFar ? answersSoFar[question.dependsOn] : undefined;
    if (tumanValue === undefined) return [];
    return geoService.getMahallasByDistrictId(tumanValue).map((m) => ({ value: m.id, label: m.name }));
  }

  return [];
}

const DYNAMIC_OPTIONS_SOURCES = new Set(['districts', 'mahallalar']);

function isRequired(question, data) {
  if (question.requiredIf) {
    return data[question.requiredIf.key] === question.requiredIf.equals;
  }
  return !!question.required;
}

function getQuestions() {
  return questions.map((q) => ({
    key: q.key,
    label: q.label,
    type: q.type,
    required: q.required,
    dependsOn: q.dependsOn || null,
    requiredIf: q.requiredIf || null,
    options: q.type === 'select' && !DYNAMIC_OPTIONS_SOURCES.has(q.optionsSource) ? resolveOptions(q) : undefined,
  }));
}

function validateAnswers(answers = {}) {
  const errors = [];
  const data = {};

  // Relies on anketa-savollari.json listing a question after the ones it dependsOn.
  for (const question of questions) {
    const raw = answers[question.key];
    const isEmpty = raw === undefined || raw === null || raw === '';

    if (isRequired(question, data) && isEmpty) {
      errors.push({ key: question.key, message: `"${question.label}" majburiy` });
      continue;
    }

    if (isEmpty) continue;

    if (question.type === 'number') {
      const num = Number(raw);
      if (Number.isNaN(num)) {
        errors.push({ key: question.key, message: `"${question.label}" son bo'lishi kerak` });
        continue;
      }
      if (question.min !== undefined && num < question.min) {
        errors.push({ key: question.key, message: `"${question.label}" kamida ${question.min} bo'lishi kerak` });
        continue;
      }
      data[question.key] = num;
      continue;
    }

    if (question.type === 'select') {
      const validOptions = resolveOptions(question, data);
      const match = validOptions.find((opt) => String(opt.value) === String(raw));
      if (!match) {
        errors.push({ key: question.key, message: `"${question.label}" uchun noto'g'ri qiymat tanlandi` });
        continue;
      }
      data[question.key] = match.value;
      continue;
    }

    data[question.key] = String(raw).trim();
  }

  return { valid: errors.length === 0, errors, data };
}

module.exports = {
  getQuestions,
  validateAnswers,
};
