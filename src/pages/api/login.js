// src/pages/api/login.js
import { serialize } from 'cookie';

const users = [
  {
    id: 1,
    nombre: 'Admin',
    username: 'admin',
    password: '1234',
  },
  {
    id: 2,
    nombre: 'Emanuel',
    username: 'emanuel',
    password: 'emanuel123',
  },
  {
    id: 3,
    nombre: 'Ricardo',
    username: 'ricardo',
    password: 'ricardo123',
  },
];

export default async function handler(req, res) {
  // Solo permitir el método POST
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Buscar el usuario en el arreglo
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Si las credenciales son correctas, establecer el token en las cookies
      const token = 'sampleAuthToken'; // Aquí deberías generar un token real en un entorno de producción
      const cookie = serialize('authToken', token, {
        httpOnly: true, // La cookie solo puede ser accedida por el servidor
        secure: process.env.NODE_ENV === 'production', // Solo enviar cookie por HTTPS en producción
        maxAge: 24 * 60 * 60, // 1 día
        path: '/', // La cookie estará disponible en toda la aplicación
      });

      // Establecer la cookie en la respuesta
      res.setHeader('Set-Cookie', cookie);
      res.status(200).json({
        message: 'Login successful',
        id: user.id,
        nombre: user.nombre,
      });
    } else {
      // Si las credenciales son incorrectas
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    // Responder con un método no permitido si no es POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
