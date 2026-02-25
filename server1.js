// =====================================================
// SERVIDOR 1 — Conexión por CONFIGURACIÓN (pool)
// Endpoint: GET /finanzas_personales  →  puerto 3001
// =====================================================
import http from 'http';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host:     'localhost',
  port:     5432,
  user:     'postgres',
  password: '2087localc',   
  database: 'db_Mod7',       
});

async function inicializarTabla() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS finanzas_personales (
      nombre        VARCHAR(20)  PRIMARY KEY,
      me_debe       INTEGER,
      cuotas_cobrar INTEGER,
      le_debo       INTEGER,
      cuotas_pagar  INTEGER
    );
  `);

  const { rowCount } = await pool.query(
    'SELECT 1 FROM finanzas_personales LIMIT 1'
  );

  if (rowCount === 0) {
    await pool.query(`
      INSERT INTO finanzas_personales VALUES
        ('tia carmen',        0,      0, 5000,  1),
        ('papa',              0,      0, 15000, 3),
        ('nacho',             10000,  2, 7000,  1),
        ('almacen esquina',   0,      0, 13000, 2),
        ('vicios varios',     0,      0, 35000, 35),
        ('companero trabajo', 50000,  5, 0,     0);
    `);
    console.log('Tabla finanzas_personales creada y poblada.');
  }
}

// ---- Servidor HTTP ----
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/finanzas') {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM finanzas_personales ORDER BY nombre'
      );
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true, data: rows }));
    } catch (error) {
      console.error('Error en /finanzas:', error.message);
      res.writeHead(500);
      res.end(JSON.stringify({ ok: false, mensaje: error.message }));
    }
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ ok: false, mensaje: 'Ruta no encontrada' }));
});

inicializarTabla()
  .then(() => {
    server.listen(3001, () => {
      console.log('Servidor 1 corriendo en http://localhost:3001');
    });
  })
  .catch((err) => {
    console.error('Error al conectar con la base de datos:', err.message);
    process.exit(1);
  });
