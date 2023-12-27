const pool = require("../db");
const bcrypt = require("bcryptjs");
const { handleError } = require("../utils/errorHandler");
const { respondSuccess, respondError } = require("../utils/resHandler");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const CreateUser = async (req, res) => {
  try {
    const {
      nombre,
      rut_usuario,
      correo,
      contrasena,
      carrera,
      rol,
    } = req.body;
    const carreraMayuscula = carrera.toUpperCase();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasena, salt);
    //console.log(hash);
    const newTask = await pool.query(
      "INSERT INTO usuario (nombre,rut_usuario, correo, contrasena, carrera, rol) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [nombre, rut_usuario, correo, hash, carreraMayuscula, rol]
    );
  } catch (error) {
    handleError(error, "user.controller -> CreateUser");
  }
};

const UpdateContrasena = async (rut, contrasenaActual, contrasenaNueva) => {
  try {
    const user = await pool.query("SELECT * FROM Usuario WHERE rut_usuario = $1", [rut]);
    if (user.rows.length === 0) {
      return { rowCount: 0 };
    }
    const contrasenaValida = await bcrypt.compare(contrasenaActual, user.rows[0].contrasena);
    if (!contrasenaValida) {
      throw new Error("Contraseña actual incorrecta");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasenaNueva, salt);
    const result = await pool.query("UPDATE Usuario SET contrasena = $1 WHERE rut_usuario = $2", [hash, rut]);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const GetUsuarios = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM Usuario WHERE visible_usuario = '1'");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const GetUsuario = async (req, res, next) => {
  try {
    const { rut } = req.params;
    const result = await pool.query("SELECT * FROM Usuario WHERE rut_usuario = $1", [
      rut,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const DeleteUsuario = async (req, res, next) => {
  try {
    const { rut } = req.params;
    const result = await pool.query("UPDATE usuario SET visible_usuario = 0 WHERE rut_usuario = $1", [
      rut,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    return res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const LoginUsuario = async (req, res) => {
  try {
    const { rut, contrasena } = req;
    const rut_usuario = rut;
    const result = await pool.query("SELECT * FROM usuario WHERE rut_usuario = $1", [
      rut_usuario,
    ]);
    const usuario = result.rows[0];
    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    );
    if (!contrasenaValida) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = jwt.sign({ rut: usuario.rut_usuario, rol: 'usuario', carrera: usuario.carrera }, JWT_SECRET);
    console.log(jwt.decode(token));
    // Enviar token como cookie
    res.cookie('token', token, { httpOnly: false, path: '/' });
    res.redirect("/api/user-home");
  } catch (error) {
    handleError(error, "user.controller -> LoginUsuario");
  }
};

const UpdateNReserva = async (req, res, next) => {
  try {
    const { rut } = req.params;
    const user = await pool.query("SELECT * FROM usuario WHERE rut_usuario = $1", [
      rut,
    ]);
    const nuevoValor = user.rows[0].numero_reserva.toString() === "1" ? "0" : "1";
    console.log(nuevoValor)
    const query = await pool.query(
      "UPDATE usuario SET numero_reserva = $1 WHERE rut_usuario = $2",
      [nuevoValor, rut]
    );
    res.json(query.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateUser,
  GetUsuarios,
  GetUsuario,
  DeleteUsuario,
  LoginUsuario,
  UpdateContrasena,
  UpdateNReserva,
};
