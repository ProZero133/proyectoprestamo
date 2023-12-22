const { Router } = require("express");
const router = Router();
const fs = require('fs').promises;
const path = require('path');
const { UpdateContrasena } = require("../controllers/user.controller");
const { handleError } = require("../utils/errorHandler");
const { respondSuccess, respondError } = require("../utils/resHandler");
const pool = require("../db");
const { authenticateToken, isUser, isUserWithCarrera } = require('../middlewares/authentication.middleware.js');
const exp = require("constants");
router.post('/user-home/solicitar',authenticateToken,isUser, async (req, res) => {
  try {
    console.log("Buscando equipos para la carrera: "+req.body.carrera);
    const result = await pool.query('SELECT * FROM Equipo WHERE visible_equipo = 1 AND carrera = $1 AND estado = $2', [req.body.carrera, 'disponible']);
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

router.get('/user-home/historial',authenticateToken,isUser, async (req, res) => {
  try {
      // Lee el contenido del archivo HTML
      const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'usuario_historial.html');
      const htmlContent = await fs.readFile(filePath, 'utf8');
  
      // Envía el contenido HTML como respuesta
      res.send(htmlContent);
    } catch (error) {
      console.error('Error al leer el archivo HTML', error);
      // Manejar el error y enviar una respuesta adecuada
      res.status(500).send('Error interno del servidor');
    }
});

router.get('/user-home/ObtenerHistorial/:rut', async (req, res) => {
  try {
    const { rut } = req.params;
    const result = await pool.query('SELECT * FROM historial WHERE rut = $1', [rut]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener datos de la tabla historial:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
router.get('/user-home/Perfil', authenticateToken, async (req, res) => {
  try {
    // Lee el contenido del archivo HTML
    const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'usuario_contra.html');
    const htmlContent = await fs.readFile(filePath, 'utf8');

    // Envía el contenido HTML como respuesta
    res.send(htmlContent);
  } catch (error) {
    console.error('Error al leer el archivo HTML', error);
    // Manejar el error y enviar una respuesta adecuada
    res.status(500).send('Error interno del servidor');
  }
});

router.post('/user-home/Perfil/CambiarContra', authenticateToken, async (req, res) => {
  try {
    const { rut, contrasenaActual, contrasenaNueva } = req.body;
    console.log(rut, contrasenaActual, contrasenaNueva);
    const result = await UpdateContrasena(rut, contrasenaActual, contrasenaNueva);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }

});
router.get('/user-home/ObtenerEquipoHistorial/:EquipoId', async (req, res) => {
  try {
    const { EquipoId } = req.params;
    const result = await pool.query('SELECT * FROM equipo WHERE codigo_equipo = $1', [EquipoId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener datos de la tabla equipo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
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

    // Itera sobre las filas seleccionadas y realiza la inserción en la base de datos
    selectedRows.forEach(async (solicitud) => {
      try {
        // Obtiene la fecha y hora actual del sistema
        const fechaActual = new Date();
        const horaActual = fechaActual.toLocaleTimeString(); // Ajusta el formato según tus necesidades

        // Rellena los campos que no coincidan con la tabla con valores NULL
        const solicitudCompleta = {
          fecha: fechaActual.toISOString().split('T')[0], // Formato YYYY-MM-DD
          hora: horaActual,
          nombre: solicitud.nombre || null,
          rut: solicitud.rut || null,
          correo: solicitud.correo || null,
          carrera: solicitud.carrera || null,
          equipo: solicitud.codigo_equipo || null,
        };

        const { fecha, hora, nombre, rut, correo, carrera, equipo } = solicitudCompleta;
        const insertQuery = 'INSERT INTO solicitud (fecha, hora, nombre, rut, correo, carrera, equipo) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        await pool.query(insertQuery, [fecha, hora, nombre, rut, correo, carrera, equipo]);
        console.log('solicitud:', solicitud);
        console.log('Datos de la solicitud:', solicitudCompleta);
        console.log('Inserción exitosa en la base de datos.');

        const updateEquipoQuery = 'UPDATE equipo SET estado = $1 WHERE codigo_equipo = $2';
        await pool.query(updateEquipoQuery, ['no disponible', equipo]);
        console.log('El equipo '+equipo+' ha sido marcado como no disponible.');

      } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
      }
    });

    // Envía una respuesta al cliente (puedes personalizar según tus necesidades)
    res.json({ success: true, message: 'Datos recibidos y almacenados correctamente en el servidor.' });
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
    console.log('Solicitudes obtenidas desde la base de datos:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener solicitudes desde la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/user-home/getDatosUsuario', async (req, res) => {
  try {
    // Verifica si se proporcionó un parámetro 'rut' en la consulta
    const rut = req.query.rut;
    if (!rut) {
      return res.status(400).json({ error: 'Parámetro "rut" faltante en la consulta.' });
    }

    // Realiza la consulta a la base de datos para obtener el nombre y correo asociados al rut
    const result = await pool.query('SELECT nombre, correo FROM usuario WHERE rut_usuario = $1', [rut]);

    // Si la consulta fue exitosa y se encontraron datos, devuelve el resultado
    if (result.rows.length > 0) {
      const datosUsuario = {
        nombre: result.rows[0].nombre,
        correo: result.rows[0].correo,
      };
      res.json(datosUsuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado en la base de datos.' });
    }
  } catch (error) {
    console.error('Error al realizar la consulta a la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
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