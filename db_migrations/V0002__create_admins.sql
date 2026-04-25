CREATE TABLE t_p96024764_project_zenith_2166.admins (
  id SERIAL PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);