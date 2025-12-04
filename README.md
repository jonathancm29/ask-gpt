# Nuestra Historia - Sitio Web Interactivo

Este proyecto es un sitio web moderno y optimizado para dispositivos móviles, diseñado para celebrar una historia de amor.

## Características

- **Carrusel Interactivo:** Navegación táctil, zoom en imágenes y transiciones suaves.
- **Fondo Dinámico:** Cielo nocturno con estrellas parpadeantes y efecto de lluvia que responde al scroll.
- **Playlist Musical:** Reproductor integrado de YouTube Music con diseño elegante.
- **Optimización:** Alto rendimiento en dispositivos móviles (especialmente iPhone).

## Tecnologías

- Vite
- React 18
- TailwindCSS
- Framer Motion

## Cómo ejecutar el proyecto

1. **Instalar Node.js:**
   Asegúrate de tener instalado Node.js (versión 16 o superior) en tu computadora. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).

2. **Instalar dependencias:**
   Abre una terminal en la carpeta del proyecto y ejecuta:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   Ejecuta el siguiente comando:
   ```bash
   npm run dev
   ```

4. **Ver el sitio:**
   Abre el enlace que aparece en la terminal (generalmente `http://localhost:5173`) en tu navegador. Para probar la experiencia móvil, puedes usar las herramientas de desarrollador de Chrome (F12 -> Toggle Device Toolbar) o acceder desde tu celular si estás en la misma red Wi-Fi.

## Personalización

- **Fotos:** Reemplaza las URLs en `src/components/Carousel.jsx` con tus propias fotos.
- **Música:** Cambia el `playlistId` en `src/components/MusicPlayer.jsx` por el ID de tu playlist favorita de YouTube.
