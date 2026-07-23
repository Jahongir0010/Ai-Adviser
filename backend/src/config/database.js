const { Pool } = require('pg');

let pool = null;

// Repositories still read backend/data JSON directly - nothing has been migrated
// to Postgres yet. getPool() is only used by the /api/health check for now, to
// prove the connection works; once a feature needs real tables, its repository
// can call getPool() to run queries without any change needed in services/controllers.
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
