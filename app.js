import express from "express";
import fs from "fs";
// import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const SECRET_KEY = 'boldo123'; // Puedes cambiarla por cualquier otra clave secreta

// Middleware para parsear el body de las peticiones
app.use(bodyParser.json());

// Ruta que generará y enviará el token
app.get('/generate-token', (req, res) => {
    const payload = {
        user: 'boldo',
        role: 'admin'
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // El token expirará en 1 hora
    res.json({ token });
});

// Ruta que verifica el token
app.post('/verify-token', (req, res) => {
    const token = req.body.token;

    if (!token) {
        return res.status(400).json({ message: 'Token no proporcionado.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido.' });
        }

        res.json({ message: 'Token válido!', data: decoded });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});