const { Router } = require("express");
const router = Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {LoginUsuario}=require("../controllers/user.controller");
const {LoginAdmin}=require("../controllers/admin.controller");
router.post("/", async (req, res) => {
    const { rut } = req.body;
    const User=req.body;

    try {
      // Consulta a la tabla de usuarios
      const resultUsuario = await pool.query("SELECT * FROM usuario WHERE rut_usuario = $1", [rut]);
  
      if (resultUsuario.rows.length > 0) {
        // Llamar a la función cuando se encuentra un usuario en la tabla de usuarios
        console.log("Usuario encontrado, pasando a la función LoginUsuario");
        LoginUsuario(User,res);
      }
  
      // Si no se encuentra un usuario en la tabla de usuarios, consultar la tabla de administradores
      const resultAdmin = await pool.query("SELECT * FROM Administrador WHERE rut = $1", [rut]);
  
      if (resultAdmin.rows.length > 0) {
        // Llamar a la función cuando se encuentra un administrador en la tabla de administradores
        LoginAdmin(User,res);
      }
      // Si no se encuentra ni usuario ni administrador
    } catch (error) {
      console.error("Error en la autenticación:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  });
  router.get("/LogOut", async (req, res) => {
    try {
      res.clearCookie('token');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
res.setHeader('Pragma', 'no-cache');
res.setHeader('Expires', '0');
      // Lee el contenido del archivo HTML
      res.redirect('/');
    } catch (error) {
      console.error('Error al leer el archivo HTML', error);
      // Manejar el error y enviar una respuesta adecuada
      res.status(500).send('Error interno del servidor');
    }
   

  });
module.exports = router;