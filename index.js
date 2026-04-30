import express from 'express';
import pool from './db/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());

const PORT = process.env.PORT || 3001;





app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'usuario.html'));
});


app.get('/usuarios', async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM estudiantes');
        res.json(rows);
    }catch (error) {
        res.status(500).json({message: 'Error al obtener datos', error});
    }
});

app.listen(PORT, () => {
    console.log('Servidor escuchando en http://localhost:${PORT}');
}); 