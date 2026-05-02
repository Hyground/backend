import express from "express";
import dotenv from "dotenv";
import pool from "./bd/bd.js";
import path from "path"; // MODIFICACION: Importación de path necesaria para manejar rutas
import { fileURLToPath } from "url"; // MODIFICACION: Importación de fileURLToPath para definir __dirname en ES Modules
import cors from "cors"; // MODIFICACION: Importación de cors para permitir peticiones desde el frontend

dotenv.config();

const app = express();

// MODIFICACION: Definición de __dirname para que funcione con "type": "module"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors()); // MODIFICACION: Uso de cors para evitar bloqueos de seguridad en las peticiones
app.use(express.json());

// MODIFICACION: Middleware para servir archivos estáticos (esto corrige el 404 de usuarios.html)
app.use(express.static(path.join(__dirname, 'frontend')));

// MODIFICACION: Ruta para manejar el favicon.ico y evitar el error 404 en la consola
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/', (req, res) => {
    // MODIFICACION: Se corrigió 'usuario.html' a 'usuarios.html' que es el nombre real del archivo
    res.sendFile(path.join(__dirname, 'frontend', 'usuarios.html'));
});

app.get("/usuarios", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        res.json(rows);
    } catch (error) {
        console.log("Error SQL:", error.message);
        res.status(500).json({ error: error.message });
    }
});



const port = process.env.PORT;
app.listen(port, () => console.log(`Servidor funcionando en http://localhost:${port}`));


