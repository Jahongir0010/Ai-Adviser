const { getPool } = require('../config/database');

async function findAllQuestions() {
  const pool = getPool();

  const { rows: questionRows } = await pool.query(
    `SELECT key, label, type, required, options_source, depends_on,
            required_if_key, required_if_equals, min_value
     FROM anketa_savollari
     ORDER BY sort_order`
  );

  const { rows: optionRows } = await pool.query(
    `SELECT savol_key, value, label
     FROM anketa_savol_options
     ORDER BY savol_key, sort_order`
  );

  const optionsByKey = new Map();
  for (const row of optionRows) {
    if (!optionsByKey.has(row.savol_key)) optionsByKey.set(row.savol_key, []);
    optionsByKey.get(row.savol_key).push({ value: row.value, label: row.label });
  }

  return questionRows.map((row) => ({
    key: row.key,
    label: row.label,
    type: row.type,
    required: row.required,
    optionsSource: row.options_source || undefined,
    dependsOn: row.depends_on || undefined,
    requiredIf: row.required_if_key ? { key: row.required_if_key, equals: row.required_if_equals } : undefined,
    min: row.min_value !== null ? Number(row.min_value) : undefined,
    options: optionsByKey.get(row.key),
  }));
}

module.exports = { findAllQuestions };
