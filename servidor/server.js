const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const app = require('./app');
const { registerSocketEvents } = require('./controllers/socketController');

require('dotenv').config();

//Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once('open', () => {
  console.log('🟢 Conectado à base de dados MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('🔴 Erro de conexão com o MongoDB:', err);
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Estado do jogo
global.gameState = { players: new Map() };

registerSocketEvents(io);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Servidor Cartas Contra Tugas na porta ${PORT}`);
  console.log(`📱 Interface: http://localhost:3000`);
});

module.exports = { server, io, app };
