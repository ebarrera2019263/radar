# Proyecto Radar en Tiempo Real con Next.js y WebSockets

Este proyecto es una aplicación web que muestra en un mapa las ubicaciones de los usuarios en tiempo real utilizando Next.js, OpenStreetMap y WebSockets. Los usuarios pueden ingresar su nombre, y su ubicación se actualizará en el mapa junto con la de otros usuarios.

## Funcionalidades

- **Geolocalización en tiempo real**: Muestra la ubicación actual de los usuarios en un mapa.
- **WebSockets**: Actualiza las ubicaciones de todos los usuarios en tiempo real.
- **Interfaz de usuario**: Permite a los usuarios ingresar su nombre, que se mostrará en el mapa junto con su ubicación.

## Dependencias

### Cliente

- **react**: Biblioteca de JavaScript para construir interfaces de usuario.
- **next**: Framework de React para aplicaciones web con renderizado del lado del servidor.
- **react-leaflet**: Biblioteca para integrar Leaflet (un popular motor de mapas) con React.
- **leaflet**: Biblioteca de JavaScript para mapas interactivos.
- **socket.io-client**: Cliente de WebSockets para comunicarse con el servidor de WebSockets.
- **axios**: Cliente HTTP basado en promesas para realizar solicitudes a la API.

### Servidor

- **socket.io**: Biblioteca para facilitar la implementación de WebSockets en el servidor.

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar el servidor de WebSockets

Crea un archivo `server.js` en la raíz del proyecto para configurar el servidor de WebSockets. Este archivo manejará las conexiones y la lógica de transmisión de ubicaciones en tiempo real.

### 4. Configurar `vercel.json`

Crea un archivo `vercel.json` en la raíz del proyecto para asegurar que Vercel ejecute tu servidor de WebSocket correctamente.

### 5. Crear el componente `Map`

Crea el componente `Map` en la carpeta `components` para manejar la geolocalización del usuario y la integración con WebSockets. Asegúrate de integrar correctamente `react-leaflet` y `socket.io-client`.

### 6. Ejecutar el proyecto

Para ejecutar el proyecto localmente, usa:

```bash
npm run dev
```

### 7. Desplegar en Vercel

Sigue los pasos para desplegar tu proyecto en Vercel. Asegúrate de que todos los archivos de configuración estén correctos y que el servidor de WebSocket esté configurado para funcionar en producción.

## Uso

1. Abre la aplicación en tu navegador.
2. Ingresa tu nombre en el formulario.
3. Permite que el navegador acceda a tu ubicación.
4. Observa cómo tu ubicación y la de otros usuarios se muestran en el mapa en tiempo real.



