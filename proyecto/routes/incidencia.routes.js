const express = require('express');
const router = express.Router();

const{
    crearIncidencia,
    obtenerIncidencia,
    filtrarIncidencia
} = require('../controllers/incidencias.Controller');

// Punto 2: Registrar incidencia
router.post('/', crearIncidencia);

// Punto 5: Cambiar estado
router.put('/:id/estado', filtrarIncidencia);

module.exports = router;