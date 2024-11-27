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

  const [clientLocations, setClientLocations] = useState([]); // Estado para almacenar las ubicaciones de los clientes

  useEffect(() => {

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

    fetchClientLocations();

    //API cada 10 segundos
    const intervalId = setInterval(() => {
      
      fetchClientLocations();
    }, 10000);

    // Limpiar el intervalo y el watchPosition cuando se desmonte el componente
    return () => clearInterval(intervalId);

  }, []); // Dependencias vacías para que se ejecute solo una vez

  return (
    <div className='w-full h-screen flex z-4'>
      <div className='w-full h-screen'>
        <MapContainer className='z-2' center={[location.lat, location.lon]} zoom={16} scrollWheelZoom={false} zoomControl={false} style={{ height: '100%', width: '100%' }}>
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
      
      
    </div>
  );
};

export default Map;
