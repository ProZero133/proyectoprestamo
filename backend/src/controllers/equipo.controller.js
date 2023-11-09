const pool = require("../db");

const CreateEquipo = async (req, res, next) => {
  try {
    const {
      codigo_equipo,
      tipo,
      estado,
      condicion,
      propietario,
      modelo,
      visible_equipo,
      FechaLlegada,
      FechaSalida
    } = req.body;
    const newTask = await pool.query(
      "INSERT INTO Equipo (codigo_equipo, tipo, estado, condicion, propietario,modelo, visible_equipo,FechaLlegada,FechaSalida) VALUES($1, $2, $3, $4, $5, $6 , $7, $8, $9) RETURNING *",
      [
        codigo_equipo,
        tipo,
        estado,
        condicion,
        propietario,
        modelo,
        visible_equipo,
        FechaLlegada,
        FechaSalida
      ]
    );

    res.json(newTask.rows[0]);
  } catch (error) {
    next(error);
  }
};

const GetEquipos = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM Equipo WHERE visible_equipo = 1" );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const GetEquiposA = async (req, res, next) => {
  try {
    const { propietario } = req.params;
    const result = await pool.query(
      "SELECT codigo_equipo, tipo, modelo, descripcion FROM Equipo WHERE estado = 'disponible' AND (propietario = $1 OR propietario = 'Arriendo' OR propietario = 'Dep. Sist. Información')",
      [propietario]
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const GetEquipo = async (req, res, next) => {
  try {
    const { codigo_equipo } = req.params;
    const result = await pool.query(
      "SELECT * FROM Equipo WHERE codigo_equipo = $1",
      [codigo_equipo]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    } else {
      return res.json(result.rows[0]);
    }
  } catch (error) {
    next(error);
  }
};

const DeleteEquipo = async (req, res, next) => {
  try {
    const { codigo_equipo } = req.params;
    const result = await pool.query(
      "UPDATE equipo SET visible_equipo = 0 WHERE codigo_equipo = $1",
      [codigo_equipo]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Equipo no encontrado" });
    return res.status(200).json({ message: "Equipo eliminado exitosamente" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const EquipoCodigo = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT codigo_equipo FROM Equipo");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const EquipoModelo = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT DISTINCT modelo FROM Equipo");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const EquipoTipo = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT DISTINCT tipo FROM Equipo");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const EquipoEstado = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT DISTINCT estado FROM Equipo");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const EquipoCondicion = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT DISTINCT condicion FROM Equipo");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const EquipoPropietario = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT DISTINCT propietario FROM Equipo");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

const UpdateEquipo = async (req, res, next) => {
  try {
    const {
      codigo_equipo,
      tipo,
      modelo,
      descripcion,
      estado,
      condicion,
      propietario,
      ultimo_mantenimiento,
    } = req.body;

    const updatedEquipo = await pool.query(
      "UPDATE Equipo SET tipo=$1, modelo=$2, descripcion=$3, estado=$4, condicion=$5, propietario=$6, ultimo_mantenimiento=$7 WHERE codigo_equipo=$8 RETURNING *",
      [
        tipo,
        modelo,
        descripcion,
        estado,
        condicion,
        propietario,
        ultimo_mantenimiento,
        codigo_equipo,
      ]
    );

    res.json(updatedEquipo.rows[0]);
  } catch (error) {
    next(error);
  }
};

const UpdateFecha = async (req, res) => {
  try {
    const { ultimo_mantenimiento, codigo_equipo } = req.body;
    const query = await pool.query(
      "UPDATE equipo SET ultimo_mantenimiento = $1 WHERE codigo_equipo = $2",
      [ultimo_mantenimiento, codigo_equipo]
    );
    res.json(query.rows[0]);
  } catch (error) {
    console.error("Error al actualizar la fecha:", error);
    res.status(500).json({ mensaje: "Error al actualizar la fecha" });
  }
};

const UpdateEstado = async (req, res) => {
  try {
    const {estado, codigo_equipo} = req.body;
    const query = await pool.query('UPDATE equipo SET estado = $1 WHERE codigo_equipo = $2',
    [estado, codigo_equipo]);
    res.json(query.rows[0]);
  } catch (error) {
    console.error("Error al modificar el estado",error);
    res.status(500).json({mensaje:"Error al actualizar el estado"})
  }
};

const FilterEquipo = async (req, res, next) => {
  try {
    const {
      codigo_equipo,
      modelo,
      tipo,
      estado,
      condicion,
      propietario,
      startDate,
      endDate,
    } = req.body;
    let query = "SELECT * FROM equipo WHERE ";

    let queryParams = [];
    let paramCount = 1;

    if (codigo_equipo) {
      query += `codigo_equipo = $${paramCount} AND `;
      queryParams.push(codigo_equipo);
      paramCount++;
    }
    if (modelo) {
      query += `modelo = $${paramCount} AND `;
      queryParams.push(modelo);
      paramCount++;
    }

    if (tipo) {
      query += `tipo = $${paramCount} AND `;
      queryParams.push(tipo);
      paramCount++;
    }

    if (estado) {
      query += `estado = $${paramCount} AND `;
      queryParams.push(estado);
      paramCount++;
    }

    if (condicion) {
      query += `condicion = $${paramCount} AND `;
      queryParams.push(condicion);
      paramCount++;
    }

    if (propietario) {
      query += `propietario = $${paramCount} AND `;
      queryParams.push(propietario);
      paramCount++;
    }

    if (startDate && endDate) {
      query += `ultimo_mantenimiento BETWEEN $${paramCount} AND $${
        paramCount + 1
      } AND `;
      queryParams.push(startDate);
      queryParams.push(endDate);
      paramCount += 2;
    }

    // Remover el último "AND" y agregar punto y coma
    query = query.slice(0, -4) + ";";

    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Equipos no encontrados" });
    }

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  CreateEquipo,
  GetEquipo,
  GetEquipos,
  GetEquiposA,
  DeleteEquipo,
  EquipoCodigo,
  EquipoModelo,
  EquipoTipo,
  EquipoEstado,
  EquipoCondicion,
  EquipoPropietario,
  FilterEquipo,
  UpdateEquipo,
  UpdateFecha,
  UpdateEstado,
};
