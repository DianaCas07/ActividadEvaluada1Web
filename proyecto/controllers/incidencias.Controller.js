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
    const id = parseInt(req.params.id);
    const incidencia = incidencias.find(p => p.id === id);

    if (!incidencia) {
        return res.status(404).json({ error: "Incidencia no encontrada" });
    }

    res.json(incidencia);
}

//Punto 5
const filtrarIncidencia = (req, res) => {

    const { id } = req.params;
    const { estado } = req.body;

    const incidencia = incidencias.find(p => p.id === Number(id));

    if (!incidencia) {

        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });

    }
    if (typeof estado !== "string" || estado.trim() === "") {

        return res.status(400).json({
            error: "El estado es obligatorio y no puede estar vacío"
        });

    }

    switch (estado.trim()) {

        case "Pendiente":
            incidencia.estado = "Pendiente";
            break;

        case "En Proceso":
            incidencia.estado = "En Proceso";
            break;

        case "Resuelta":
            incidencia.estado = "Resuelta";
            break;

        case "Cancelada":
            incidencia.estado = "Cancelada";
            break;

        default:
            return res.status(400).json({
                error: "Estado no válido"
            });
    }

    res.json({
        mensaje: "Estado de incidencia actualizado correctamente",
        incidencia: incidencia
    });

};

//punto 6
const eliminarIncidencia = (req, res) => {
    //get id de la url y convertirla a entero
    const id = parseInt(req.params.id);

    const index = incidencias.findIndex(incidencias => incidencias.id === id); 

    if(index !== -1){
        incidencias.splice(index, 1); 
        res.json({mensaje:"Incidencia eliminada"});
    } else {
        res.status(404).json({mensaje: "La incidencia no fue encontrada"});
    }
};

//punto 7
const obtenerEstadisticas = (req, res) => {
    res.json(
        incidencias.reduce((acumulador, incidencias) => {
            acumulador.totalIncidencias ++;

            switch(incidencias.estado){
                case "Pendiente":
                    acumulador.pendientes++;
                    break;
                case "En Proceso":
                    acumulador.EnProceso++;
                    break;
                case "Resuelta":
                    acumulador.resueltas++;
                    break;
                case "Cancelada":
                    acumulador.canceladas++;
                    break;
            }
            return acumulador;
        }, {
            totalIncidencias: 0,
            pendientes: 0,
            EnProceso: 0,
            resueltas: 0,
            canceladas: 0
        })
    );
};

//punto 8
const clasificarIncidencias = (req, res) => {
    const id = parseInt(req.params.id);
    const incidencia = incidencias.find(inc => inc.id === id);

    if(!incidencia){
        return res.status(404).json({mensaje: "Incidencia no encontrada"})
    }

    let clasificacionResultados = "";

    switch(incidencia.prioridad){
        case "Alta":
            clasificacionResultados = "Critica";
            break;
        case "Media":
            clasificacionResultados = "Importante";
            break;
        case "Baja":
            clasificacionResultados = "Baja";
            break;
    }

    res.json({
        id: incidencia.id,
        clasificacion: clasificacionResultados
    });
};

module.exports = {
    crearIncidencia,
    obtenerIncidencia,
    listarIncidencia,
    filtrarIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    clasificarIncidencias
};

