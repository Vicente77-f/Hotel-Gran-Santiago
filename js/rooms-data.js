/**
 * rooms-data.js
 * -----------------------------------------------------------------------
 * Acá guardamos la información de las 6 habitaciones en un solo lugar.
 * Los nombres, descripciones y precios son EXACTAMENTE los mismos que ya
 * estaban escritos en habitaciones.html; esto solo los deja disponibles
 * en JavaScript para que detalle-habitacion.html y carrito.html los
 * puedan usar sin tener que repetir el texto dos veces.
 *
 * En un proyecto real, en vez de este arreglo fijo, estos datos vendrían
 * de una base de datos a través del backend. Por ahora, para el sitio
 * estático, nos sirve un arreglo simple.
 * -----------------------------------------------------------------------
 */

// "var" en vez de "const/let" para mantener el mismo estilo que usan
// login.js y registro.js en este proyecto.
var rooms = [
  {
    id: 1,
    nombre: "Suite vista cordillera",
    descripcion: "Habitacion matrimonial con vista panoramica a la cordillera y balcon privado.",
    huespedes: 2,
    metrosCuadrados: 35,
    precio: 75000, // se muestra formateado como $75.000
    // Varias fotos para la galería del detalle. Usamos imágenes que ya
    // vienen en /img porque las rutas originales (de un disco C:\...)
    // no funcionan en un navegador. Cuando tengas fotos reales de cada
    // habitación, solo reemplaza estas rutas.
    imagenes: ["../img/suite-junior.jpg", "../img/habitacion-doble.jpg", "../img/bano-premium.jpg"],
    amenidades: ["Cama matrimonial", "Balcón privado", "Vista a la cordillera", "Wifi de alta velocidad", "Desayuno incluido"],
    // Video de ejemplo: reemplázalo por el video real del hotel cuando lo tengas.
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    resenas: [
      { nombre: "Javiera M.", calificacion: 5, comentario: "La vista a la cordillera desde la cama es espectacular." },
      { nombre: "Tomás R.", calificacion: 4, comentario: "Muy cómoda, ideal para un fin de semana." }
    ]
  },
  {
    id: 2,
    nombre: "Habitacion Ejecutiva",
    descripcion: "Habitacion ejecutiva pensadas para viajes de negocio, con escritorio y cercano a metro.",
    huespedes: 2,
    metrosCuadrados: 25,
    precio: 65000,
    imagenes: ["../img/habitacion-doble.jpg", "../img/suite-junior.jpg", "../img/edificio.jpg"],
    amenidades: ["Escritorio de trabajo", "Cercana al metro", "Wifi de alta velocidad", "Aire acondicionado", "Desayuno incluido"],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    resenas: [
      { nombre: "Constanza P.", calificacion: 5, comentario: "Perfecta para reuniones de trabajo, muy bien ubicada." }
    ]
  },
  {
    id: 3,
    nombre: "Suite Familiar",
    descripcion: "Suite amplia con living independiente, idela para familias.",
    huespedes: 4,
    metrosCuadrados: 48,
    precio: 105000,
    imagenes: ["../img/bano-premium.jpg", "../img/suite-junior.jpg", "../img/edificio.jpg"],
    amenidades: ["Living independiente", "Ideal para familias", "Wifi de alta velocidad", "Desayuno incluido"],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    resenas: [
      { nombre: "Familia Soto", calificacion: 5, comentario: "Muy amplia, perfecta para viajar con niños." }
    ]
  },
  {
    id: 4,
    nombre: "Habitacion Doble",
    descripcion: "Habitacion luminosa con vista parcial a la torre costanera.",
    huespedes: 2,
    metrosCuadrados: 24,
    precio: 70000,
    imagenes: ["../img/habitacion-doble.jpg", "../img/bano-premium.jpg", "../img/edificio.jpg"],
    amenidades: ["Vista parcial a Torre Costanera", "Wifi de alta velocidad", "Desayuno incluido"],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    resenas: [
      { nombre: "Daniela V.", calificacion: 4, comentario: "Buena ubicación y buen desayuno." }
    ]
  },
  {
    id: 5,
    nombre: "Suite Premium Andes",
    descripcion: "Nuestra Suite mas exclusiva, con terraza privada y vista 360°.",
    huespedes: 3,
    metrosCuadrados: 58,
    precio: 145000,
    imagenes: ["../img/hero-fachada.jpg", "../img/suite-junior.jpg", "../img/bano-premium.jpg"],
    amenidades: ["Terraza privada", "Vista 360°", "Wifi de alta velocidad", "Desayuno en la habitación"],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    resenas: [
      { nombre: "Marcelo I.", calificacion: 5, comentario: "La terraza con vista 360° es increíble al atardecer." }
    ]
  },
  {
    id: 6,
    nombre: "Habitacion Individual Business",
    descripcion: "Habitacion compacta pensadas para viajeros de negocios que viajan solos.",
    huespedes: 1,
    metrosCuadrados: 16,
    precio: 48000,
    imagenes: ["../img/suite-junior.jpg", "../img/habitacion-doble.jpg"],
    amenidades: ["Escritorio compacto", "Wifi de alta velocidad", "Desayuno incluido"],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    resenas: [
      { nombre: "Ignacio T.", calificacion: 4, comentario: "Simple pero muy funcional para una noche de trabajo." }
    ]
  }
];

/**
 * Convierte un número (ej: 75000) en texto con formato de pesos chilenos
 * (ej: "$75.000"), igual como ya se ve escrito a mano en habitaciones.html.
 */
function formatearCLP(numero) {
  return numero.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  });
}
