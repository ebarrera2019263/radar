import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';

// Configurar icono para Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Map = () => {
  const [location, setLocation] = useState(null);
  const [otherLocations, setOtherLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);

        // Enviar la ubicación a la API
        axios.post('https://radar-back.onrender.com/location', {
          latitude,
          longitude,
          person: 'Persona 1'
        }).then(response => {
          console.log(response.data);
        }).catch(error => {
          console.error('Error al enviar la ubicación:', error);
        });

        // Obtener las ubicaciones de otras personas
        axios.get('https://radar-back.onrender.com/locations')
          .then(response => {
            setOtherLocations(response.data);
          })
          .catch(error => {
            console.error('Error al obtener las ubicaciones:', error);
          });
      },
      (error) => {
        setError('Unable to retrieve your location');
      }
    );
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {location ? (
        <MapContainer center={location} zoom={13} style={{ height: '100vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={location}>
            <Popup>
              Tú estás aquí.
            </Popup>
          </Marker>
          {otherLocations.map((loc, index) => (
            <Marker key={index} position={[loc.latitude, loc.longitude]}>
              <Popup>
                {loc.person}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Obteniendo ubicación...</p>
      )}
    </div>
  );
};

export default Map;
