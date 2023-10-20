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




router.get('/admin-home', async (req, res) => {
  try {
    // Lee el contenido del archivo HTML
    const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'menu_principal.html');
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
