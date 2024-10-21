import { NextApiRequest, NextApiResponse } from 'next';

let clientLocations = [];

// Función para manejar las solicitudes
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { id, nombre, location } = req.body;  // Recibir el id, nombre y ubicación desde el cuerpo de la solicitud
    
    // Verificar si se han proporcionado el id y el nombre
    if (!id || !nombre) {
      return res.status(401).json({ message: 'ID o nombre no proporcionados, sesión no válida.' });
    }

    // Almacenar la ubicación del cliente
    clientLocations = clientLocations.filter(client => client.id !== id); // Eliminar la ubicación anterior si existe
    clientLocations.push({ id, nombre, location }); // Agregar la nueva ubicación

    console.log(`Ubicación recibida de ${id} (${nombre}):`, location);

    // Devolver una respuesta al cliente
    res.status(200).json({ message: 'Ubicación recibida correctamente', clientLocations });
  } else if (req.method === 'GET') {
    // Endpoint para obtener la lista de ubicaciones de los clientes
    res.status(200).json({ message: 'Lista de ubicaciones', clientLocations });
  } else {
    // Manejar otros métodos HTTP
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
