# VENTINO – Instituto de Bellas Artes

> **Siente, crea y expresa.**

Sitio web institucional de **VENTINO – Instituto de Bellas Artes**, desarrollado con **HTML5, CSS3 y JavaScript puro** (sin frameworks ni dependencias).

---

## 📁 Estructura del proyecto

```
VENTINO/
│
├── index.html            → Estructura y contenido de todas las secciones
│
├── css/
│   └── style.css         → Identidad visual, diseño, responsive y animaciones
│
├── js/
│   └── script.js         → Interactividad, validaciones, modales, galería, etc.
│
├── img/
│   ├── logo.png
│   ├── portada.jpg
│   ├── nosotros.jpg
│   ├── diseno-grafico.jpg
│   ├── artes-plasticas.jpg
│   ├── musica.jpg
│   ├── danza.jpg
│   └── galeria/          → pintura-1.jpg, danza-1.jpg, teatro-1.jpg, ...
│
└── README.md
```

---

## ▶️ Cómo ejecutar en Visual Studio Code

1. Abre **Visual Studio Code**.
2. Ve a **Archivo → Abrir carpeta…** y selecciona la carpeta `VENTINO`.
3. Instala la extensión **Live Server** (autor: Ritwick Dey) desde el panel de extensiones (`Ctrl + Shift + X`).
4. Haz clic derecho sobre `index.html` → **Open with Live Server**.
5. El sitio se abrirá en `http://127.0.0.1:5500/index.html` y se recargará automáticamente al guardar cambios.

> También puedes abrir `index.html` con doble clic en el navegador. Se recomienda Live Server para que el mapa, las fuentes y `localStorage` funcionen igual que en un servidor real.

---

## 🎨 Identidad visual

| Color | HEX | Significado | Uso |
|---|---|---|---|
| Violeta creativo | `#A855F7` | Imaginación, creatividad | Color institucional protagonista |
| Rosa pasión | `#FF4ED8` | Emoción, energía, juventud | Botones destacados y acentos |
| Cian futuro | `#00E5FF` | Innovación, tecnología, libertad | Interactivos, líneas, indicadores |
| Negro identidad | `#0B0B0F` | Elegancia, profesionalismo | Fondo principal |

Los colores se definen como variables al inicio de `css/style.css` (`:root`). Cambiándolos ahí se actualiza todo el sitio.

Tipografías: **Syne** (títulos) y **Manrope** (texto), cargadas desde Google Fonts.

---

## ✏️ Cómo editar el contenido

| Qué quieres cambiar | Dónde |
|---|---|
| Dirección, teléfono, correo y ubicación del mapa | `js/script.js` → objeto `CONFIG` |
| Plan de estudios, competencias y perfil de cada carrera | `js/script.js` → objeto `CAREERS` |
| Textos de secciones, noticias, FAQ, fechas | `index.html` (cada sección está comentada) |
| Imágenes | Carpeta `img/` (mantén los mismos nombres o actualiza el `src`) |
| Nuevas obras de la galería | Copia un `<figure class="g-item" data-category="...">` en `index.html` |
| Colores, tamaños y animaciones | `css/style.css` |

Categorías válidas de la galería: `pintura`, `diseno`, `fotografia`, `escultura`, `musica`, `danza`, `teatro`.

---

## ⚙️ Funcionalidades

- Menú fijo con indicador animado de sección activa, se oculta al bajar y reaparece al subir; menú hamburguesa en móviles.
- Preloader con animación SVG del logotipo.
- Hero con texto animado letra por letra, palabras rotativas, parallax con el mouse, orbes de luz y formas SVG flotantes.
- Contadores dinámicos, scroll reveal, barra de progreso, cinta marquee.
- Tarjetas 3D (tilt), botones magnéticos y cursor personalizado opcional (botón ◎ en el menú).
- 4 carreras con modal detallado: plan de estudios por semestre (6), competencias y perfil profesional.
- Botón **INSCRIBIRME** que lleva al formulario y preselecciona la carrera.
- Galería tipo mosaico con filtros por categoría y lightbox (teclado ← →, Esc y swipe en móviles).
- Admisión: requisitos, fechas, proceso, FAQ desplegable e información para nuevos estudiantes.
- Formularios de inscripción y consultas con validación en tiempo real y confirmación.
- Suscripción con validación de correo y detección de duplicados.
- Noticias con modal **VER MÁS**.
- Mapa de Google Maps con carga diferida.
- Botón volver arriba con anillo de progreso.
- Respeta `prefers-reduced-motion` (accesibilidad).

---

## 🗄️ Conexión con base de datos / servicio de correo

Todos los formularios pasan por `DataService.save(tipo, datos)` en `js/script.js`.

- **Modo actual (demo):** los envíos se guardan en `localStorage`. Puedes verlos desde la consola del navegador:
  ```js
  VENTINO.data.list("enroll");    // inscripciones
  VENTINO.data.list("contact");   // consultas
  VENTINO.data.list("subscribe"); // suscriptores
  ```
- **Modo producción:** coloca la URL de tu API en `CONFIG.endpoints`:
  ```js
  endpoints: {
    enroll:    "https://api.ventino.edu/inscripciones",
    contact:   "https://formspree.io/f/XXXXXXX",
    subscribe: "https://tu-backend.com/newsletter"
  }
  ```
  Se enviará un `POST` con cuerpo JSON. Funciona con un backend propio (Node, PHP, Python), Firebase Functions, Supabase, Formspree, o un proxy hacia Mailchimp / Brevo.

Campos enviados por la inscripción: `nombres`, `documento`, `nacimiento`, `correo`, `celular`, `carrera`, `mensaje`, `terminos`, `tipo`, `fecha_envio`.

---

## 🗺️ Google Maps

El mapa se genera a partir de `CONFIG.mapQuery`. Para usar la **Maps Embed API** oficial con tu clave, reemplaza la URL en la función `initMap()` por:

```
https://www.google.com/maps/embed/v1/place?key=TU_API_KEY&q=TU_DIRECCION
```

---

## 📷 Créditos de imágenes

- Imágenes institucionales (`portada`, `nosotros`, carreras, logo): generadas para VENTINO.
- Galería y noticias: fotografías de [Pexels](https://www.pexels.com) (licencia libre). Sustitúyelas por obras reales de los estudiantes.

---

**VENTINO – SIENTE, CREA Y EXPRESA.**
