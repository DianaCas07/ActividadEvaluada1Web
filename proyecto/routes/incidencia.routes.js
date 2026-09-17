const express = require('express');
const router = express.Router();

const{
    crearIncidencia,
    obtenerIncidencia,
    filtrarIncidencia
} = require('../controllers/incidencias.Controller');