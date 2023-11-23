const { Router } = require("express");
const router = Router();
const fs = require('fs').promises;
const path = require('path');
const { handleError } = require("../utils/errorHandler");
const { respondSuccess, respondError } = require("../utils/resHandler");
const pool = require("../db");
const { authenticateToken, isUser, isUserWithCarrera } = require('../middlewares/authentication.middleware.js');
const exp = require("constants");
router.post('/user-home/solicitar',authenticateToken,isUser, async (req, res) => {
  try {
    console.log("Buscando equipos para la carrera: "+req.body.carrera);
    const result = await pool.query('SELECT * FROM Equipo WHERE visible_equipo = 1 AND carrera = $1', [req.body.carrera]);
    // Devuelve los resultados como JSON
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener datos de equipos desde la base de datos:', error);
    // Manejar el error y enviar una respuesta adecuada
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



router.get('/user-home/solicitar',authenticateToken,isUser, async (req, res) => {
  try {
      // Lee el contenido del archivo HTML
      const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'usuario_equipos.html');
      const htmlContent = await fs.readFile(filePath, 'utf8');
  
      // Envía el contenido HTML como respuesta
      res.send(htmlContent);
    } catch (error) {
      console.error('Error al leer el archivo HTML', error);
      // Manejar el error y enviar una respuesta adecuada
      res.status(500).send('Error interno del servidor');
    }
});
router.post('/user-home/EnviarSolicitud', authenticateToken, isUser, async (req, res) => {
  try {
    // Verifica si se proporcionaron datos en el cuerpo de la solicitud
    if (!req.body || !req.body.selectedRows) {
      return res.status(400).json({ error: 'Datos faltantes en la solicitud.' });
    }

    // Obtiene los datos de las filas seleccionadas desde el cuerpo de la solicitud
    const selectedRows = req.body.selectedRows;

    // Puedes realizar acciones con los datos aquí, como almacenarlos en la base de datos
    // o realizar alguna lógica específica para tu aplicación

    // Itera sobre las filas seleccionadas y realiza la inserción en la base de datos
    selectedRows.forEach(async (solicitud) => {
      try {
        // Rellena los campos que no coincidan con la tabla con valores NULL
        const solicitudCompleta = {
          fecha: solicitud.fecha || null,
          hora: solicitud.hora || null,
          nombre: solicitud.nombre || null,
          rut: solicitud.rut || null,
          correo: solicitud.correo || null,
          carrera: solicitud.carrera || null,
          equipo: solicitud.equipo || null,
        };

        const { fecha, hora, nombre, rut, correo, carrera, equipo } = solicitudCompleta;
        const insertQuery = 'INSERT INTO solicitud (fecha, hora, nombre, rut, correo, carrera, equipo) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        await pool.query(insertQuery, [fecha, hora, nombre, rut, correo, carrera, equipo]);
        console.log('Inserción exitosa en la base de datos:', solicitudCompleta);
      } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
      }
    });

    // Envía una respuesta al cliente (puedes personalizar según tus necesidades)
    res.json({ success: true, message: 'Datos recibidos correctamente en el servidor.' });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});


router.get('/user-home/getSolicitudes', async (req, res) => {
  try {
    // Realizar una consulta a la base de datos para obtener las solicitudes
    const result = await pool.query('SELECT * FROM solicitud');

    // Devolver las solicitudes como respuesta
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener solicitudes desde la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/user-home',authenticateToken,isUser, async (req, res) => {
    try {
        // Lee el contenido del archivo HTML
        const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'usuario_inicio.html');
        const htmlContent = await fs.readFile(filePath, 'utf8');
    
        // Envía el contenido HTML como respuesta
        res.send(htmlContent);
      } catch (error) {
        console.error('Error al leer el archivo HTML', error);
        // Manejar el error y enviar una respuesta adecuada
        res.status(500).send('Error interno del servidor');
      }
});

module.exports = router;