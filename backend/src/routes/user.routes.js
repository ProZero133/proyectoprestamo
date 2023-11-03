const { Router } = require("express");
const router = Router();
const fs = require('fs').promises;
const path = require('path');
const { handleError } = require("../utils/errorHandler");
const { respondSuccess, respondError } = require("../utils/resHandler");
router.get('/user-home', async (req, res) => {
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