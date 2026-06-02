const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const inscricaoRoutes = require('./routes/inscricaoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS corrigido - aceita as portas do front-end
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/inscricoes', inscricaoRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});