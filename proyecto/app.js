const express = require('express');
const incidenciaRoutes = require('./routes/incidencia.routes');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/incidencias', incidenciaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});