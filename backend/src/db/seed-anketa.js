require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { getPool } = require('../config/database');

const QUESTIONS_PATH = path.join(__dirname, '..', '..', 'data', 'anketa-savollari.json');

async function run() {
  const pool = getPool();
  const questions = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf-8'));

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('TRUNCATE anketa_savollari CASCADE');

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      await client.query(
        `INSERT INTO anketa_savollari
          (key, label, type, required, options_source, depends_on, required_if_key, required_if_equals, min_value, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          q.key,
          q.label,
          q.type,
          !!q.required,
          q.optionsSource || null,
          q.dependsOn || null,
          q.requiredIf ? q.requiredIf.key : null,
          q.requiredIf ? q.requiredIf.equals : null,
          q.min !== undefined ? q.min : null,
          i,
        ]
      );

      if (Array.isArray(q.options)) {
        for (let j = 0; j < q.options.length; j++) {
          const opt = q.options[j];
          await client.query(
            `INSERT INTO anketa_savol_options (savol_key, value, label, sort_order) VALUES ($1, $2, $3, $4)`,
            [q.key, String(opt.value), opt.label, j]
          );
        }
      }
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }

  console.log(`Seeded ${questions.length} anketa savollari.`);
  await pool.end();
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
