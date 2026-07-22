const { Pool } = require('pg');

let pool = null;

// Not called anywhere yet - the app currently runs entirely on the static JSON
// data in backend/data via src/repositories. Once DATABASE_URL is configured
// (Postgres or Supabase), repositories can call getPool() to run real queries
// instead of reading JSON files, without any change needed in services/controllers.
function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set - database is not configured yet');
  }

  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }

  return pool;
}

module.exports = { getPool };
