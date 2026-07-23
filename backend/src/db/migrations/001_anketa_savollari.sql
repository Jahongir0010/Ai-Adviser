CREATE TABLE IF NOT EXISTS anketa_savollari (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('select', 'text', 'number')),
  required BOOLEAN NOT NULL DEFAULT false,
  options_source TEXT,
  depends_on TEXT,
  required_if_key TEXT,
  required_if_equals TEXT,
  min_value NUMERIC,
  sort_order INT NOT NULL
);

CREATE TABLE IF NOT EXISTS anketa_savol_options (
  id SERIAL PRIMARY KEY,
  savol_key TEXT NOT NULL REFERENCES anketa_savollari(key) ON DELETE CASCADE,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT NOT NULL
);
