const express = require('express');
const db = require('./db');
const router = express.Router(); // Cria um novo roteador
const path = require('path');

// Credenciais hardcoded (não recomendado para produção)
const validUsername = 'jhondeclara';
const validPassword = 'amoclara24';

// Rota para a página inicial
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

// Rota para a página de admin
router.get('/admin', (req, res) => {
    res.sendFile('admin.html', { root: path.join(__dirname, '../public') });
});

// Rota para validar credenciais do admin
router.post('/admin/validate', (req, res) => {
    const { username, password } = req.body;

    // Depuração: Verifique as credenciais recebidas
    console.log('Credenciais recebidas:', username, password);

    if (username === validUsername && password === validPassword) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
});

// Rota para adicionar uma nova imagem e legenda
router.post('/admin/upload', (req, res) => {
    const { image, caption } = req.body;
    if (!image || !caption) {
        return res.status(400).json({ success: false, message: 'Dados incompletos' });
    }

    // Remove a entrada anterior antes de adicionar uma nova
    const deleteQuery = `DELETE FROM jhonmetro`;
    db.run(deleteQuery, [], function (err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao limpar dados anteriores' });
        }

        const insertQuery = `INSERT INTO jhonmetro (image, caption) VALUES (?, ?)`;
        db.run(insertQuery, [image, caption], function (err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Erro ao salvar no banco de dados' });
            }
            res.json({ success: true, id: this.lastID });
        });
    });
});

// Rota para obter as imagens e legendas
router.get('/api/jhonmetro', (req, res) => {
    const query = `SELECT * FROM jhonmetro`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao buscar dados' });
        }
        res.json({ success: true, data: rows });
    });
});

// Exporta o roteador
module.exports = router;