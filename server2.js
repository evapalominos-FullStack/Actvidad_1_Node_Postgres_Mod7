// =====================================================
// SERVIDOR 2 — Conexión por CONNECTION STRING (pool)
// Endpoint: GET /clientes  →  puerto 3002
// =====================================================
import http from 'http';
import pkg from 'pg';
const { Pool } = pkg;

// --- Pool por connection string ---
// Formato: postgres://usuario:password@host:puerto/base_de_datos
const pool = new Pool({
  connectionString: 'postgres://postgres:2087localc@localhost:5432/db_Mod7',
  // ↑ cambia usuario, password y nombre de base de datos
});

// ---- Crear tabla e insertar datos si no existe ----
async function inicializarTabla() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clientes (
      id      SERIAL       PRIMARY KEY,
      nombre  VARCHAR(50)  NOT NULL,
      email   VARCHAR(100) NOT NULL,
      ciudad  VARCHAR(50),
      activo  BOOLEAN      DEFAULT TRUE
    );
  `);

  const { rowCount } = await pool.query('SELECT 1 FROM clientes LIMIT 1');

  if (rowCount === 0) {
    await pool.query(`
      INSERT INTO clientes (nombre, email, ciudad, activo) VALUES
        ('Ana Garcia',     'ana@example.com',    'Santiago',     TRUE),
        ('Juan Perez',     'juan@example.com',   'Valparaiso',   TRUE),
        ('Maria Lopez',    'maria@example.com',  'Concepcion',   FALSE),
        ('Carlos Ruiz',    'carlos@example.com', 'La Serena',    TRUE),
        ('Laura Martinez', 'laura@example.com',  'Antofagasta',  TRUE);
    `);
    console.log('Tabla clientes creada y poblada.');
  }
}

// ---- Servidor HTTP ----
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/clientes') {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM clientes ORDER BY nombre'
      );
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true, data: rows }));
    } catch (error) {
      console.error('Error en /clientes:', error.message);
      res.writeHead(500);
      res.end(JSON.stringify({ ok: false, mensaje: error.message }));
    }
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ ok: false, mensaje: 'Ruta no encontrada' }));
});

// ---- Arrancar ----
inicializarTabla()
  .then(() => {
    server.listen(3002, () => {
      console.log('Servidor 2 corriendo en http://localhost:3002');
    });
  })
  .catch((err) => {
    console.error('Error al conectar con la base de datos:', err.message);
    process.exit(1);
  });
