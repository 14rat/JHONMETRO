const express = require('express');
const path = require('path');
const db = require('./db'); // Importa o módulo do banco de dados (se necessário)
const routes = require('./routes'); // Importa o roteador

const app = express();
const PORT = 3000;

// Servir arquivos estáticos (CSS, JS, imagens, etc.)
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Middleware para processar JSON e formulários
app.use(express.json()); // Para processar JSON
app.use(express.urlencoded({ extended: true })); // Para processar formulários

// Rota da página principal
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: publicPath });
});

// Rotas adicionais (definidas no roteador)
app.use('/', routes); // Usa o roteador importado

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});