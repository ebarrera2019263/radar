import Head from 'next/head';
import dynamic from 'next/dynamic';

// Cargar el componente Map de forma dinámica para deshabilitar SSR
const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mapa de Ubicaciones</title>
        <meta name="description" content="Mapa de ubicaciones usando Next.js y OpenStreetMap" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Map />
      </main>
    </div>
  );
}
