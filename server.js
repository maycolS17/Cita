const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/guardar-cita', (req, res) => {
    const { lugar, fecha } = req.body;
    if (!lugar || !fecha) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    const contenido = `# Cita Romantica ❤️

## Proxima Cita

- **Lugar:** ${lugar}
- **Fecha:** ${fecha}

---

_Generado automaticamente el ${new Date().toLocaleDateString('es-ES')}_ 💕
`;

    fs.writeFileSync(path.join(__dirname, 'README.md'), contenido, 'utf8');
    res.json({ exito: true });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:' + PORT);
});
