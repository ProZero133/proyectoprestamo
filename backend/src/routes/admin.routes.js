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
