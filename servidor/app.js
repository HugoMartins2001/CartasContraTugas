const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Importar rotas
const cardsRoutes = require('./routes/cards');
const roomsRoutes = require('./routes/rooms');

app.use('/api/cards', cardsRoutes);
app.use('/api/rooms', roomsRoutes);

module.exports = app;
