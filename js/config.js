/* ==========================================================================
   Patricia Batalla Estética · CONFIGURACIÓN
   Es el único archivo que hace falta editar para personalizar la web:
   datos de contacto, tratamientos, fotos y videos.
   Los turnos se piden por WhatsApp.
   ========================================================================== */
window.PB_CONFIG = {
  whatsapp: '5493472584367',           // Formato internacional: 54 + 9 + código de área + número (sin 0 ni 15)
  whatsappTexto: '+54 9 3472 58-4367', // Cómo se muestra en pantalla
  instagram: 'patriciabatalla.estetica',
  ciudad: 'Marcos Juárez, Córdoba',
  metaPixelId: '',                     // ID del Pixel de Meta (Facebook/Instagram Ads). Vacío = desactivado
  ga4Id: '',                           // ID de Google Analytics 4 (G-XXXXXXX). Vacío = desactivado
  promo: '',                           // Texto de aviso arriba de todo. Ej: '10% off en depilación esta semana'. Vacío = no se muestra

  /* Tratamientos. precio: número (ej: 15000) o null = "Consultá el precio".
     domicilio:true = se coordina por WhatsApp como servicio a domicilio. */
  servicios: [
    { cat:'Rostro', nombre:'Limpieza facial', desc:'Limpieza profunda para una piel más fresca, pareja y luminosa.', precio:null },
    { cat:'Rostro', nombre:'Alta frecuencia facial', desc:'Aparatología facial para complementar tu limpieza y cuidar tu piel.', precio:null },
    { cat:'Rostro', nombre:'Eliminación de impurezas', desc:'Extracción cuidadosa de puntos negros e impurezas.', precio:null },
    { cat:'Cejas y pestañas', nombre:'Perfilado de cejas', desc:'Diseño y perfilado a medida para enmarcar tu mirada.', precio:null },
    { cat:'Cejas y pestañas', nombre:'Lifting de pestañas', desc:'Curvatura y definición natural de tus pestañas, sin extensiones.', precio:null },
    { cat:'Depilación', nombre:'Depilación con cera', desc:'Depilación tradicional con cera en todo el cuerpo. Contanos las zonas que querés.', precio:null },
    { cat:'Depilación', nombre:'Depilación con cera a domicilio', desc:'Depilación tradicional con cera en tu casa, disponible solo en Marcos Juárez.', precio:null, domicilio:true },
    { cat:'Manos y pies', nombre:'Esmaltado tradicional', desc:'Esmaltado prolijo y clásico para tus manos.', precio:null },
    { cat:'Manos y pies', nombre:'Esmaltado semipermanente', desc:'Color y brillo de larga duración.', precio:null },
    { cat:'Manos y pies', nombre:'Restauración de uñas', desc:'Cuidado y recuperación de tus uñas.', precio:null },
    { cat:'Manos y pies', nombre:'Pedicuría', desc:'Cuidado completo de tus pies, con un acabado prolijo.', precio:null }
  ],

  /* Fotos de tratamientos. Se agrupan solas por categoría, cada categoría con su propio carrusel.
     servicio = nombre exacto del tratamiento de arriba (define en qué categoría va la foto). */
  galeria: [
    { img:'assets/img/Piel-1.jpg', titulo:'Alta frecuencia facial', texto:'Un plus para tu piel.', servicio:'Alta frecuencia facial' },
    { img:'assets/img/eliminaImpurezas.jpg', titulo:'Eliminación de impurezas', texto:'Antes y después: piel limpia, suave y libre de obstrucciones.', servicio:'Eliminación de impurezas' },
    { img:'assets/img/depilacion.jpeg', titulo:'Depilación con cera', texto:'Verano sin preocupaciones: piel lista todos los días.', servicio:'Depilación con cera' },
    { img:'assets/img/piel-3.jfif', titulo:'Pedicuría', texto:'Tus pies también merecen verse lindos y saludables.', servicio:'Pedicuría' },
    { img:'assets/img/restauracionDeUnias.jpg', titulo:'Restauración de uñas', texto:'Antes y después.', servicio:'Restauración de uñas' }
  ],

  /* Videos: van en su propia sección. poster = imagen que se ve antes de reproducirlo. */
  videos: [
    { video:'assets/img/limpiezaFacial.mp4', poster:'assets/img/piel-4.jpg', titulo:'Limpieza facial', texto:'Mirá cómo trabajamos.', servicio:'Limpieza facial' },
    { video:'assets/img/cejas.mp4', poster:'assets/img/piel-2.jpg', titulo:'Perfilado de cejas', texto:'Antes y después.', servicio:'Perfilado de cejas' }
  ],


  profesional: {
    foto: 'assets/img/patricia.jpg',
    frase: 'Total discreción y profesionalismo', 
    anios: '15',                    
    formacion: ['Depilación tradicional','Pedicuria','Lifting de pestañas'], 
    historia: 'Hola ! Trabajo hace mas de 15 años en depilación y 5  realizando tratamientos en rostro cuidando tu piel y con productos de la mejor calidad ' 
  }
};
