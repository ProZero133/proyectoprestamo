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
const fs = require('fs').promises;
const path = require('path');
const router = Router();
const pool = require("../db");

router.post("/administrador", CreateAdministrador);
router.get("/administradores", GetAdministradores);
router.get("/administrador/:rut", GetAdministrador);
router.get("/administradornombre/:rut", GetAdministradorNombre);
router.delete("/administrador/:rut", DeleteAdministrador);
router.post("/administrador/login", LoginAdmin);
router.put("/administrador/:rut", UpdateContrasena);


router.get('/admin-home/crear-usuario', async (req, res) => {
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

router.post('/admin-home/crear-usuario', async (req, res) => {
console.log(req.body);
try{
CreateUser(req);
}
catch (error) {
  handleError(error, "admin.controller -> CreateAdministrador");
  respondError(req, res, 500, "No se creo el administrador");
  
}
});

router.get('/admin-home/equipos/crear-equipo', async (req, res) => {
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

router.post('/admin-home/ObtenerEquipos', async (req, res) => {
  try {
    // Obtén los parámetros de búsqueda desde la solicitud
    const { searchInput, filterModel, filterType, filterState, filterCondition, filterOwner } = req.query;

    // Construye la condición de búsqueda
    let condition = "visible_equipo = 1";
    let params = [];

    // Agrega las condiciones de búsqueda según los parámetros proporcionados
    if (searchInput) {
      condition += " AND modelo ILIKE $1";
      params.push(`%${searchInput}%`);
    }

    if (filterModel) {
      condition += " AND tipo = $2";
      params.push(filterModel);
    }

    if (filterType) {
      condition += " AND estado = $3";
      params.push(filterType);
    }

    if (filterState) {
      condition += " AND condicion = $4";
      params.push(filterState);
    }

    if (filterCondition) {
      condition += " AND propietario = $5";
      params.push(filterCondition);
    }

    // Realiza la consulta a la base de datos utilizando la condición de búsqueda
    //const result = await pool.query(`SELECT * FROM Equipo WHERE ${condition}`, params);
    const result = await pool.query('SELECT * FROM Equipo');
    // Devuelve los resultados como JSON
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener datos de equipos desde la base de datos:', error);
    // Manejar el error y enviar una respuesta adecuada
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/admin-home/equipos', async (req, res) => {
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

router.get('/admin-home/prestamos', async (req, res) => {
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

router.get('/admin-home/faltas', async (req, res) => {
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

router.get('/admin-home/historial', async (req, res) => {
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

router.get('/admin-home/solicitudes', async (req, res) => {
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
router.get('/admin-home/observaciones', async (req, res) => {
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

router.get('/admin-home', async (req, res) => {
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
