import express from "express";
import dotenv from "dotenv";
import pool from "./bd/bd.js";
dotenv.config();

const app = express();


app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'usuario.html'));
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


