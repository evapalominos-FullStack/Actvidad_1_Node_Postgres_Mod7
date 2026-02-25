-- =====================================================
-- SCRIPT SQL — Tablas y datos de ejemplo
-- =====================================================

-- ---- Tabla: finanzas_personales ----
CREATE TABLE IF NOT EXISTS finanzas_personales (
    nombre        VARCHAR(20)  PRIMARY KEY,
    me_debe       INTEGER,
    cuotas_cobrar INTEGER,
    le_debo       INTEGER,
    cuotas_pagar  INTEGER
);

INSERT INTO finanzas_personales (nombre, me_debe, cuotas_cobrar, le_debo, cuotas_pagar) VALUES
  ('tia carmen',        0,      0, 5000,  1),
  ('papa',              0,      0, 15000, 3),
  ('nacho',             10000,  2, 7000,  1),
  ('almacen esquina',   0,      0, 13000, 2),
  ('vicios varios',     0,      0, 35000, 35),
  ('companero trabajo', 50000,  5, 0,     0)
ON CONFLICT (nombre) DO NOTHING;


-- ---- Tabla: clientes ----
CREATE TABLE IF NOT EXISTS clientes (
    id      SERIAL       PRIMARY KEY,
    nombre  VARCHAR(50)  NOT NULL,
    email   VARCHAR(100) NOT NULL,
    ciudad  VARCHAR(50),
    activo  BOOLEAN      DEFAULT TRUE
);

INSERT INTO clientes (nombre, email, ciudad, activo) VALUES
  ('Ana García',     'ana@example.com',    'Buenos Aires', TRUE),
  ('Juan Pérez',     'juan@example.com',   'Córdoba',      TRUE),
  ('María López',    'maria@example.com',  'Rosario',      FALSE),
  ('Carlos Ruiz',    'carlos@example.com', 'Mendoza',      TRUE),
  ('Laura Martínez', 'laura@example.com',  'La Plata',     TRUE)
ON CONFLICT DO NOTHING;
