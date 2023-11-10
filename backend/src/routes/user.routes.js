const { Router } = require("express");
const router = Router();
const fs = require('fs').promises;
const path = require('path');
const { handleError } = require("../utils/errorHandler");
const { respondSuccess, respondError } = require("../utils/resHandler");


router.post('/user-home/ObtenerEquipos', async (req, res) => {
  try {
    const { propietario} = req.params;
    const result = await pool.query('SELECT * FROM Equipo WHERE visible = 1 AND propietario_equipo = $1', [propietario]);
    // Devuelve los resultados como JSON
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener datos de equipos desde la base de datos:', error);
    // Manejar el error y enviar una respuesta adecuada
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



router.get('/user-home/solicitar', async (req, res) => {
  try {
      // Lee el contenido del archivo HTML
      const filePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'usuario_solicitar.html');
      const htmlContent = await fs.readFile(filePath, 'utf8');
  
      // Envía el contenido HTML como respuesta
      res.send(htmlContent);
    } catch (error) {
      console.error('Error al leer el archivo HTML', error);
      // Manejar el error y enviar una respuesta adecuada
      res.status(500).send('Error interno del servidor');
    }
});

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