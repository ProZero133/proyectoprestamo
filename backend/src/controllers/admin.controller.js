const pool = require("../db");
const bcrypt = require("bcryptjs");

const CreateAdministrador = async (req, res, next) => {
  try {
    const { rut, nombre, apellido, correo, contrasena } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasena, salt);
    //console.log(hash);
    const newTask = await pool.query(
      "INSERT INTO Administrador (rut, nombre, apellido, correo, contrasena) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [rut, nombre, apellido, correo, hash]
    );

    res.json(newTask.rows[0]);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const GetAdministradores = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM Administrador");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const GetAdministrador = async (req, res, next) => {
  try {
    const { rut } = req.params;
    const result = await pool.query(
      "SELECT * FROM Administrador WHERE rut = $1",
      [rut]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Administrador no encontrado" });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
const GetAdministradorNombre = async (req, res, next) => {
  try {
    const { rut } = req.params;
    const result = await pool.query(
      "SELECT nombre, apellido FROM Administrador WHERE rut = $1",
      [rut]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Administrador no encontrado" });

    const { nombre, apellido } = result.rows[0];
    res.json({ nombre, apellido });
  } catch (error) {
    next(error);
  }
};

const DeleteAdministrador = async (req, res) => {
  try {
    const { rut } = req.params;
    const result = await pool.query(
      "DELETE FROM Administrador WHERE rut = $1",
      [rut]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Administrador no encontrado" });
    return res
      .status(200)
      .json({ message: "Administrador eliminado exitosamente" });
  } catch (error) {
    next(error);
  }
};

const LoginAdmin = async (req, res, next) => {
  try {
    const { rut, contrasena } = req.body;
    const result = await pool.query(
      "SELECT * FROM Administrador WHERE rut = $1",
      [rut]
    );
    const usuario = result.rows[0];
    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    );
    if (!contrasenaValida) {
      return res.status(401).json({ message: "Credenciales inválidas " });
    }
    return res
      .status(200)
      .json({ message: "Inicio de sesión exitoso", usuario });
  } catch (error) {
    next(error);
  }
};

const UpdateContrasena = async (req, res, next) => {
  try {
    const { rut } = req.params;
    const { contrasenaActual, contrasenaNueva } = req.body;

    const result = await pool.query(
      "SELECT * FROM Administrador WHERE rut = $1",
      [rut]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }
    const administrador = result.rows[0];

    const contrasenaValida = await bcrypt.compare(
      contrasenaActual,
      administrador.contrasena
    );
    if (!contrasenaValida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasenaNueva, salt);

    await pool.query(
      "UPDATE Administrador SET contrasena = $1 WHERE rut = $2",
      [hash, rut]
    );

    return res.status(201).json({ message: "Contraseña cambiada con exito" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateAdministrador,
  GetAdministradores,
  GetAdministrador,
  GetAdministradorNombre,
  DeleteAdministrador,
  LoginAdmin,
  UpdateContrasena,
};
