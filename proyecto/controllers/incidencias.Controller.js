const incidencias = require('../data/incidencias.js')

//Punto 3 funcion crearIncidencia
const crearIncidencia = (req, res) => {
    const { empleado, area, descripcion, prioridad } = req.body;
    if (
        empleado === undefined ||
        area === undefined ||
        descripcion === undefined ||
        prioridad === undefined
    ) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios"
        });
    }
    if (
        typeof empleado !== "string" ||
        typeof area !== "string" ||
        typeof descripcion !== "string" ||
        typeof prioridad !== "string"
    ) {
        return res.status(400).json({
            error: "Los campos deben contener texto válido"
        });
    }

    if (
        empleado.trim() === "" ||
        area.trim() === "" ||
        descripcion.trim() === "" ||
        prioridad.trim() === ""
    ) {
        return res.status(400).json({
            error: "No se permiten cadenas vacías"
        });
    }

    if (
        prioridad !== "Alta" &&
        prioridad !== "Media" &&
        prioridad !== "Baja"
    ) {
        return res.status(400).json({
            error: "La prioridad solo puede ser Alta, Media o Baja"
        });
    }

    let nuevoId = 1;

    if (incidencias.length > 0) {
        nuevoId = Math.max(
            ...incidencias.map(incidencia => incidencia.id)
        ) + 1;
    }
    const nuevaIncidencia = {
        id: nuevoId,
        empleado: empleado.trim(),
        area: area.trim(),
        descripcion: descripcion.trim(),
        prioridad: prioridad.trim(),
        estado: "Pendiente"
    };
    incidencias.push(nuevaIncidencia);

    res.status(201).json({
        mensaje: "Incidencia registrada correctamente"
    });
};


//Punto 3 mostrar todas las incidencia
const listarIncidencia = (req, res) => {
    res.json(incidencias);
};


//Punto 4 buscar incidencia por ID
const obtenerIncidencia = (req, res) => {
    const { id } = req.params;
    const incidencia = incidencias.find(p => p.id === id);

    if (!incidencia) {
        return res.status(404).json({ error: "Incidencia no encontrada" });
    }

    res.json(incidencia);
}

module.exports = {
    obtenerIncidencia,
    listarIncidencia
};