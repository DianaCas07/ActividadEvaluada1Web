const incidencias = require('../data/incidencias.js')


//Punto 3 mostrar todas las incidencia
const listarIncidencia = (req, res) => {
res.json(incidencias);
};


//Punto 4 buscar incidencia por ID
const obtenerIncidencia = (req, res) => {
const {id} = req.params;
const incidencia = incidencias.find(p => p.id === id);

if(!incidencia){
    return res.status(404).json({error: "Incidencia no encontrada"});
}

res.json(incidencia);
}

module.exports = {
    obtenerIncidencia,
    listarIncidencia
};