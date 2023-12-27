const jwt = require('jsonwebtoken');
const { handleError } = require("../utils/errorHandler"); // Asegúrate de tener la ruta correcta a tu archivo de utilidades
require('dotenv').config();

// Asignar process.env.JWT_SECRET a una variable
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Acceso no autorizado" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
    // Verificar si el usuario es un administrador
    if (req.user.rol === 'admin') {
      next();
    } else {
      return res.status(403).json({ message: "Acceso autorizado solo para administradores" });
    }
  };
  
  const isUser = (req, res, next) => {
    // Verificar si el usuario es un usuario normal
    if (req.user.rol === 'usuario' || req.user.rol === 'docente') {
      next();
    } else {
      return res.status(403).json({ message: "Acceso autorizado solo para usuarios" });
    }
  };
  const isUserWithCarrera = (carreraText) => (req, res, next) => {
    // Verificar si el usuario es un usuario normal y la carrera coincide con el texto proporcionado
    if (req.user.rol === 'usuario' && req.user.carrera === carreraText) {
      next();
    } else {
      return res.status(403).json({ message: "Acceso no autorizado para esta carrera" });
    }
  };
  
  module.exports = { authenticateToken, isAdmin,isUser, isUserWithCarrera };