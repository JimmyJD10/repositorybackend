const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const SECRET = 'clave_secreta_jwt';

// Middleware
app.use(cors());
app.use(express.json());

// Usuario de prueba
const usuarios = [
  { email: 'admin@tecsup.edu.pe', password: '123456' }
];

// Ruta pública
app.get('/', (req, res) => {
  res.send('🔥 Bienvenido al backend JWT de Jimmy');
});

// Ruta de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (!usuario) {
    return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Ruta protegida
app.get('/protected', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ mensaje: 'Token no enviado' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ mensaje: 'Token inválido' });

    res.json({
      mensaje: '🎉 Accediste a la ruta protegida',
      usuario: decoded.email
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
