import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios'; // Importar axios para realizar solicitudes HTTP

// Corregir el problema de los íconos no mostrados
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

const Map = () => {
  const [location, setLocation] = useState({ lat: -34.985426, lon: -71.239312 });
  const [userId, setUserId] = useState(null); // Estado para almacenar el id del usuario
  const [userName, setUserName] = useState(null); // Estado para almacenar el nombre del usuario
  const [clientLocations, setClientLocations] = useState([]); // Estado para almacenar las ubicaciones de los clientes

  useEffect(() => {
    console.log('useEffect');
    // Acceder a los valores de localStorage
    const id = localStorage.getItem('id');
    const nombre = localStorage.getItem('nombre');
    console.log(nombre)
    setUserId(id);
    setUserName(nombre);

    // Función para obtener la ubicación actual
    const getCurrentLocation = () => {
      return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const newLocation = { lat: latitude, lon: longitude };
              setLocation(newLocation);
              resolve(newLocation);
            },
            (error) => reject(error),
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            }
          );
        } else {
          reject(new Error('Geolocalización no está disponible en este dispositivo.'));
        }
      });
    };

    // Función para enviar la ubicación a la API
    const sendLocationToAPI = async () => {
      try {
        const currentLocation = await getCurrentLocation();
        const response = await axios.post(
          '/api/ubicaciones', // Usar la API de Next.js
          {
            location: currentLocation,
            id, // Incluir el id en el cuerpo
            nombre, // Incluir el nombre en el cuerpo
          }
        );

        console.log('Ubicación enviada a la API:', response.data);
      } catch (error) {
        console.error('Error enviando la ubicación a la API:', error);
      }
    };

    // Función para consultar la lista de clientLocations
    const fetchClientLocations = async () => {
      console.log('Traer ubicaciones');
      try {
        const response = await axios.get('/api/ubicaciones'); // Usar la API de Next.js
        setClientLocations(response.data.clientLocations); // Asignar la lista de ubicaciones al estado
      } catch (error) {
        console.error('Error al obtener la lista de ubicaciones:', error);
      }
    };

    // Llamar inmediatamente para enviar la ubicación
    sendLocationToAPI();
    fetchClientLocations();

    // Enviar la ubicación a la API cada 10 segundos
    const intervalId = setInterval(() => {
      sendLocationToAPI();
      fetchClientLocations();
    }, 10000);

    // Limpiar el intervalo y el watchPosition cuando se desmonte el componente
    return () => clearInterval(intervalId);

  }, []); // Dependencias vacías para que se ejecute solo una vez

  return (
    <div className='w-12 h-auto flex'>
      <div className='w-8 h-30rem'>
        <MapContainer center={[location.lat, location.lon]} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          />

          {/* Marcador para la ubicación actual */}
          <Marker position={[location.lat, location.lon]}>
            <Popup>
              Tu ubicación: Latitud {location.lat}, Longitud {location.lon}
            </Popup>
          </Marker>

          {/* Marcadores para las ubicaciones de los clientes */}
          {clientLocations.map((client) => (
            <Marker key={client.id} position={[parseFloat(client.location.lat), parseFloat(client.location.lon)]}>
              <Popup>
                Ubicación de {client.nombre}: Latitud {parseFloat(client.location.lat)}, Longitud {parseFloat(client.location.lon)}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className='w-4 h-auto'>
        <div>
          <h3>Tu ubicación:</h3>
          <p>Latitud: {location.lat}</p>
          <p>Longitud: {location.lon}</p>
          {/* Mostrar id y nombre del localStorage */}
          <p>ID: {userId}</p>
          <p>Nombre: {userName}</p>
        </div>

        {/* Mostrar lista de clientLocations */}
        <div>
          <h3>Lista de ubicaciones de usuarios:</h3>
          <ul>
            {clientLocations.map((client) => (
              <li key={client.id}>
                ID: {client.id}, Nombre: {client.nombre}, Latitud: {client.location.lat}, Longitud: {client.location.lon}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Map;
