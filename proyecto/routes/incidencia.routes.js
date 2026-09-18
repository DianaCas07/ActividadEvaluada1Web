const express = require('express');
const router = express.Router();

const{
    crearIncidencia,
    obtenerIncidencia,
    filtrarIncidencia,
    listarIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    clasificarIncidencias
} = require('../controllers/incidencias.Controller');

// punto 3: listar todas las incidencias
router.get('/', listarIncidencia)

//punto 4: obtener incidencia por ID
router.get('/id', obtenerIncidencia)

// Punto 2: Registrar incidencia
router.post('/', crearIncidencia);

// Punto 5: Cambiar estado
router.put('/:id/estado', filtrarIncidencia);

// Punto 6: Eliminar incidencia
router.delete('/:id', eliminarIncidencia);

// Punto 7: Obtener estadisticas
router.get('/estadisticas', obtenerEstadisticas);

// Punto 8: Clasificar incidencias
router.get('/:id/clasificacion', clasificarIncidencias)

module.exports = router;