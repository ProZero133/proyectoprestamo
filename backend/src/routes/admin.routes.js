const { Router } = require("express");
const {
  CreateAdministrador,
  GetAdministradores,
  GetAdministrador,
  GetAdministradorNombre,
  DeleteAdministrador,
  LoginAdmin,
  UpdateContrasena,
} = require("../controllers/admin.controller");
const { handleError } = require("../utils/errorHandler");
const { respondSuccess, respondError } = require("../utils/resHandler");
const {CreateUser} = require("../controllers/user.controller");
const {CreateEquipo} = require("../controllers/equipo.controller");
const fs = require('fs').promises;
const path = require('path');
const router = Router();
const pool = require("../db");
const { authenticateToken, isAdmin } = require('../middlewares/authentication.middleware.js');

router.post("/administrador", CreateAdministrador);
router.get("/administradores", GetAdministradores);
router.get("/administrador/:rut", GetAdministrador);
router.get("/administradornombre/:rut", GetAdministradorNombre);
router.delete("/administrador/:rut", DeleteAdministrador);
router.post("/administrador/login", LoginAdmin);
router.put("/administrador/:rut", UpdateContrasena);

async function eliminarSolicitud(solicitudId) {
  try {
    // Realiza la lógica para eliminar la solicitud de la base de datos
    console.log(`Eliminando solicitud: ${solicitudId}`);
    const deleteQuery = 'DELETE FROM solicitud WHERE id = $1';
    await pool.query(deleteQuery, [solicitudId]);
    console.log(`Solicitud eliminada con éxito: ${solicitudId}`);
  } catch (error) {
    console.error('Error al eliminar la solicitud:', error);
    throw error;
  }
}

async function obtenerSolicitud(solicitudId) {
  try {
    const result = await pool.query('SELECT * FROM solicitud WHERE id = $1', [solicitudId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener la solicitud:', error);
    throw error;
  }
}


router.get('/admin-home/crear-usuario',authenticateToken,isAdmin, async (req, res) => {
  try{
  const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'admin_crear.html');
  const htmlContent = await fs.readFile(filePath, 'utf8');
  res.send(htmlContent);
} catch (error) {
  console.error('Error al leer el archivo HTML', error);
  // Manejar el error y enviar una respuesta adecuada
  res.status(500).send('Error interno del servidor');
}
});

router.post('/admin-home/crear-usuario',authenticateToken,isAdmin, async (req, res) => {
try{
await CreateUser(req);
}
catch (error) {
  handleError(error, "user.controller -> CreateUser");
  respondError(req, res, 500, "No se creo el usuario");
  
}
});


router.get('/admin-home/crear-admin',authenticateToken,isAdmin, async (req, res) => {
  try{
  const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'admin_crear_admin.html');
  const htmlContent = await fs.readFile(filePath, 'utf8');
  res.send(htmlContent);
} catch (error) {
  console.error('Error al leer el archivo HTML', error);
  // Manejar el error y enviar una respuesta adecuada
  res.status(500).send('Error interno del servidor');
}
});

router.post('/admin-home/crear-admin',authenticateToken,isAdmin, async (req, res) => {
  try{
  CreateAdministrador(req);
  }
  catch (error) {
    handleError(error, "admin.controller -> CreateAdministrador");
    respondError(req, res, 500, "No se creo el administrador");
    
  }
  });

router.get('/admin-home/equipos/crear-equipo',authenticateToken,isAdmin, async (req, res) => {
  try {
    // Lee el contenido del archivo HTML
    const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'admin_equipos.html');
    const htmlContent = await fs.readFile(filePath, 'utf8');

    // Envía el contenido HTML como respuesta
    res.send(htmlContent);
  } catch (error) {
    console.error('Error al leer el archivo HTML', error);
    // Manejar el error y enviar una respuesta adecuada
    res.status(500).send('Error interno del servidor');
  }
});

router.post('/admin-home/equipos/crear-equipo',authenticateToken,isAdmin, async (req, res) => {
  try {
    // Transforma las claves de req.body para que coincidan con las que esperas
    const transformedBody = {
      ...req.body,
      FechaLlegada: req.body['fecha-llegada'],
      FechaSalida: req.body['fecha-salida']
    };
    delete transformedBody['fecha-llegada'];
    delete transformedBody['fecha-salida'];

    // Transforma la variable visible-equipo de req.body que contiene "Si" o "No" a 1 o 0
    transformedBody['visible_equipo'] = transformedBody['visible_equipo'] === "Si" ? 1 : 0;

    // Llama a la función CreateEquipo con req.body modificado
    await CreateEquipo({ body: transformedBody }, res);
  } catch (error) {
    handleError(error, "equipo.controller -> CreateEquipo");
    respondError(req, res, 500, "No se agregó el equipo");
  }
});


router.delete('/user-home/RechazarSolicitud/:id', async (req, res) => {
  try {
    const solicitudId = req.params.id;

    // Realiza la lógica para eliminar la solicitud de la base de datos
    await eliminarSolicitud(solicitudId);

    res.json({ success: true, message: 'Solicitud rechazada correctamente.' });
  } catch (error) {
    console.error('Error al rechazar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

router.post('/admin-home/AceptarSolicitud/:id', authenticateToken, isAdmin, async (req, res) => {
  const client = await pool.connect();
  try {
    const solicitudId = req.params.id;

    // Realiza la lógica para obtener los datos de la solicitud
    const solicitud = await obtenerSolicitud(solicitudId);

    // Realiza la lógica para eliminar la solicitud de la base de datos
    await eliminarSolicitud(solicitudId);

    // Obtiene la fecha y hora actuales
    const fechaActual = new Date();
    const horaActual = fechaActual.toLocaleTimeString();
console.log('datos solicitud: '+solicitud);
console.log('datos del req: '+req.params);
    // Realiza la inserción en la tabla Reserva
    const result = await client.query(
      'INSERT INTO reserva (fecha, hora_solicitud, hora_inicio,hora_fin, estado, codigo_equipo, rut_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [fechaActual, horaActual,horaActual, null, 'pendiente', solicitud.equipo, solicitud.rut]
    );

    res.json({ success: true, message: 'Solicitud aceptada correctamente.' });
  } catch (error) {
    console.error('Error al aceptar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  } finally {
    client.release();
  }
});

router.get('/admin-home/ObtenerPrestamos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reserva');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener datos de la tabla reserva:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener la carrera de un usuario por su rut
router.get('/admin-home/ObtenerCarrera/:rut', async (req, res) => {
  try {
    const { rut } = req.params;
    const result = await pool.query('SELECT nombre, correo, carrera FROM usuario WHERE rut_usuario = $1', [rut]);
console.log('resultado: '+result.rows);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener la carrera del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


router.post('/admin-home/ObtenerEquipos',authenticateToken,isAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Equipo');
    // Devuelve los resultados como JSON
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener datos de equipos desde la base de datos:', error);
    // Manejar el error y enviar una respuesta adecuada
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/admin-home/equipos',authenticateToken,isAdmin, async (req, res) => {
  try {
    // Lee el contenido del archivo HTML
    const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'admin_ver_equipos.html');
    const htmlContent = await fs.readFile(filePath, 'utf8');

    // Envía el contenido HTML como respuesta
    res.send(htmlContent);
  } catch (error) {
    console.error('Error al leer el archivo HTML', error);
    // Manejar el error y enviar una respuesta adecuada
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/admin-home/prestamos',authenticateToken,isAdmin, async (req, res) => {
  try {
    // Lee el contenido del archivo HTML
    const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'admin_prestamos.html');
    const htmlContent = await fs.readFile(filePath, 'utf8');

    // Envía el contenido HTML como respuesta
    res.send(htmlContent);
  } catch (error) {
    console.error('Error al leer el archivo HTML', error);
    // Manejar el error y enviar una respuesta adecuada
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/admin-home/faltas',authenticateToken,isAdmin, async (req, res) => {
  try {
    // Lee el contenido del archivo HTML
    const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'admin_faltas.html');
    const htmlContent = await fs.readFile(filePath, 'utf8');

    // Envía el contenido HTML como respuesta
    res.send(htmlContent);
  } catch (error) {
    console.error('Error al leer el archivo HTML', error);
    // Manejar el error y enviar una respuesta adecuada
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/admin-home/historial',authenticateToken,isAdmin, async (req, res) => {
  try {
    // Lee el contenido del archivo HTML
    const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'admin_historial.html');
    const htmlContent = await fs.readFile(filePath, 'utf8');

    // Envía el contenido HTML como respuesta
    res.send(htmlContent);
  } catch (error) {
    console.error('Error al leer el archivo HTML', error);
    // Manejar el error y enviar una respuesta adecuada
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/admin-home/solicitudes', authenticateToken,isAdmin,async (req, res) => {
  try {
    // Lee el contenido del archivo HTML
    const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'admin_solicitudes.html');
    const htmlContent = await fs.readFile(filePath, 'utf8');

    // Envía el contenido HTML como respuesta
    res.send(htmlContent);
  } catch (error) {
    console.error('Error al leer el archivo HTML', error);
    // Manejar el error y enviar una respuesta adecuada
    res.status(500).send('Error interno del servidor');
  }
});
router.get('/admin-home/observaciones',authenticateToken,isAdmin, async (req, res) => {
  try {
    // Lee el contenido del archivo HTML
    const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'admin_ver_observacion.html');
    const htmlContent = await fs.readFile(filePath, 'utf8');

    // Envía el contenido HTML como respuesta
    res.send(htmlContent);
  } catch (error) {
    console.error('Error al leer el archivo HTML', error);
    // Manejar el error y enviar una respuesta adecuada
    res.status(500).send('Error interno del servidor');
  }
});

router.get('/admin-home', authenticateToken,isAdmin,async (req, res) => {
  try {
    // Lee el contenido del archivo HTML
    const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'admin_inicio.html');
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
