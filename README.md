# Patricia Batalla Estética

Web de una sola página para **Patricia Batalla Estética** (Marcos Juárez, Córdoba), pensada para anuncios de Instagram y para que los clientes pidan turno por WhatsApp.

Es un sitio estático (HTML, CSS y JavaScript sin dependencias): no necesita instalación ni compilación.

## Qué incluye

- Inicio con foto de Patricia y botón para pedir turno por WhatsApp.
- Tratamientos por categoría: fotos en carrusel y lista con descripción y precio.
- Videos que se reproducen solos y sin sonido cuando se ven en pantalla.
- Sección "Sobre Patricia", preguntas frecuentes y pie de página.
- Botón flotante de WhatsApp en todas las pantallas.
- Diseño responsive (celular, tablet y escritorio) con paleta clara.
- Meta Pixel y Google Analytics 4 opcionales: solo se activan si se cargan sus IDs.
- Datos para buscadores (título, descripción, Open Graph y JSON-LD).

## Estructura

```
├── index.html          Estructura y textos de la página
├── css/
│   └── styles.css      Colores, tipografías y diseño
├── js/
│   ├── config.js       Datos editables (ver abajo)
│   └── app.js          Lógica: carruseles, videos y botones de WhatsApp
└── assets/
    ├── favicon.svg
    ├── logo-patricia.png
    └── img/            Fotos y videos de los tratamientos
```

## Cómo editar el contenido

Casi todo se cambia en `js/config.js`:

| Campo | Para qué sirve |
| --- | --- |
| `whatsapp`, `whatsappTexto` | Número de WhatsApp (formato `54 9 código-de-área número`) y cómo se muestra |
| `instagram` | Usuario de Instagram, sin `@` |
| `promo` | Aviso corto arriba de todo (vacío = no se muestra) |
| `servicios` | Tratamientos: categoría, nombre, descripción y precio (`null` = "Consultá el precio") |
| `galeria` | Fotos por categoría; `servicio` debe coincidir con el nombre de un tratamiento |
| `videos` | Videos con su imagen de portada (`poster`) |
| `profesional` | Foto, frase, años de experiencia, formación e historia de Patricia |
| `metaPixelId`, `ga4Id` | IDs de medición (vacío = desactivado) |

Los textos fijos (títulos, preguntas frecuentes, etc.) están en `index.html`.

## Probarlo en tu computadora

Abrí `index.html` en el navegador, o levantá un servidor local desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Después entrá a `http://localhost:8000`.


- Diseño y desarrollo: [Maria Florencia Gala](https://mariaflorenciagala.netlify.app/)
- Cliente: Patricia Batalla Estética, [@patriciabatalla.estetica](https://www.instagram.com/patriciabatalla.estetica/)
- Las fotos, videos y el logo pertenecen a Patricia Batalla Estética.
