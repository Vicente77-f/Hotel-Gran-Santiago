/**
 * cart.js
 * -----------------------------------------------------------------------
 * Este archivo NO EXISTÍA en el proyecto (solo estaba el link roto
 * <script scr="js/cart.js">), así que aquí lo creamos completo.
 *
 * Guarda el carrito en localStorage, que es una "cajita" de almacenamiento
 * que el navegador guarda por sitio web. Así, si agregas una habitación en
 * detalle-habitacion.html y luego entras a carrito.html, el navegador
 * todavía se acuerda de lo que agregaste (aunque hayas cambiado de página).
 *
 * OJO: esto queda guardado solo en TU navegador, no en un servidor. Si
 * entras desde otro computador o borras los datos del navegador, el
 * carrito vuelve a estar vacío. Para un carrito "de verdad" (que se vea
 * igual desde cualquier dispositivo) se necesitaría un backend.
 * -----------------------------------------------------------------------
 */

// Nombre de la "llave" bajo la cual se guarda el carrito en localStorage.
var CART_KEY = "hotelGranSantiagoCarrito";

/** Devuelve el arreglo de habitaciones que hay guardadas en el carrito. */
function obtenerCarrito() {
  try {
    var datosGuardados = localStorage.getItem(CART_KEY);
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  } catch (error) {
    // Si algo sale mal leyendo localStorage, mejor devolver un carrito vacío
    // que romper la página.
    return [];
  }
}

/** Guarda el carrito completo en localStorage y refresca el contador. */
function guardarCarrito(carrito) {
  localStorage.setItem(CART_KEY, JSON.stringify(carrito));
  actualizarContadorCarrito();
}

/** Agrega una habitación reservada (con sus fechas) al carrito. */
function agregarAlCarrito(item) {
  var carrito = obtenerCarrito();
  carrito.push(item);
  guardarCarrito(carrito);
}

/** Quita del carrito el ítem que está en la posición "indice". */
function quitarDelCarrito(indice) {
  var carrito = obtenerCarrito();
  carrito.splice(indice, 1);
  guardarCarrito(carrito);
}

/** Vacía completamente el carrito (se usa después de confirmar la reserva). */
function vaciarCarrito() {
  guardarCarrito([]);
}

/** Calcula cuántas noches hay entre la fecha de llegada y la de salida. */
function calcularNoches(fechaLlegada, fechaSalida) {
  var milisegundosPorDia = 1000 * 60 * 60 * 24;
  var diferencia = new Date(fechaSalida + "T00:00:00") - new Date(fechaLlegada + "T00:00:00");
  return Math.max(1, Math.round(diferencia / milisegundosPorDia));
}

/** Suma el subtotal de todos los ítems del carrito para obtener el total. */
function calcularTotalCarrito(carrito) {
  var total = 0;
  for (var i = 0; i < carrito.length; i++) {
    total += carrito[i].subtotal;
  }
  return total;
}

/**
 * Actualiza el número que se ve junto al ícono 🛒 del header.
 * Si el carrito está vacío, el globito se oculta (atributo "hidden").
 */
function actualizarContadorCarrito() {
  var globito = document.getElementById("cart-count");
  if (!globito) return; // esta página no tiene ícono de carrito, no hacemos nada

  var carrito = obtenerCarrito();
  globito.textContent = carrito.length;
  globito.hidden = carrito.length === 0;
}

// Apenas carga cualquier página que incluya este script, actualizamos
// el contador del carrito (por eso este script va en habitaciones.html,
// detalle-habitacion.html y carrito.html).
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
