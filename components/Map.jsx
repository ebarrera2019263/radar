import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';
import L from 'leaflet';

// Configurar icono para Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const socket = io('http://localhost:3001'); // Cambia esto según la configuración de tu servidor en producción

const MapComponent = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState(null);
  const [otherLocations, setOtherLocations] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted && !navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    if (isSubmitted) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);

          // Enviar la ubicación al servidor WebSocket
          socket.emit('sendLocation', { latitude, longitude, person: name });
        },
        (error) => {
          setError('Unable to retrieve your location');
        }
      );
    }
  }, [isSubmitted, name]);

  useEffect(() => {
    // Escuchar las actualizaciones de ubicaciones desde el servidor WebSocket
    socket.on('locations', (locations) => {
      setOtherLocations(locations);
    });

    return () => {
      socket.off('locations');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <label>
            Ingresa tu nombre:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <button type="submit">Enviar</button>
        </form>
      ) : (
        <>
          {error && <p>{error}</p>}
          {location ? (
            <MapContainer center={location} zoom={13} style={{ height: '100vh', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={location}>
                <Popup>
                  {name}
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
        </>
      )}
    </div>
  );
};

export default MapComponent;
