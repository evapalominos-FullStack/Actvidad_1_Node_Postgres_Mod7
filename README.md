# Node + pg 🚀

## Estructura del proyecto 

pg-activity/
├── server1.js          ← Pool por CONFIGURACIÓN  →  GET /finanzas_personales   (puerto 3001)
├── server2.js          ← Pool por CONN STRING    →  GET /clientes   (puerto 3002)
├── package.json
├── .env      
├── public/
│   ├── finanzas.html   ← Frontend: tabla de finanzas
│   └── clientes.html   ← Frontend: lista de clientes
└── sql/
    └── setup.sql       ← Script para crear las tablas

# Endpoints disponibles

| Servidor | Puerto | Endpoint      | Método | Descripción                    |
|----------|--------|---------------|--------|--------------------------------|
| server1  | 3001   | /finanzas     | GET    | Todos los registros de finanzas_personales |
| server2  | 3002   | /clientes     | GET    | Todos los registros de clientes |

## Respuestas JSON

**Éxito (200)**




**Error (500)**
```json
{ "ok": false, "mensaje": "descripción del error" }
