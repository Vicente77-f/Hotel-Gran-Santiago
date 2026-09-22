/**
 * carrito.js
 * -----------------------------------------------------------------------
 * Controla todo lo que pasa en carrito.html:
 *  1) Pintar en pantalla cada habitación guardada en el carrito
 *     (obtenerCarrito() viene de cart.js).
 *  2) Permitir quitar una habitación del carrito.
 *  3) Validar el formulario de nombre/correo y, si está todo bien,
 *     "confirmar" la reserva (mostrar mensaje de éxito y vaciar el carrito).
 * -----------------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", function () {
  pintarCarrito();
  configurarFormularioCheckout();
});

/**
 * Lee el carrito guardado (cart.js) y arma, por cada ítem, una tarjeta
 * con foto, nombre de la habitación, fechas, huéspedes y subtotal.
 * También calcula y muestra el total general.
 */
function pintarCarrito() {
  var carrito = obtenerCarrito(); // función de cart.js
  var contenedor = document.getElementById("cart-items");
  var totalTexto = document.getElementById("cart-total-amount");
  var botonConfirmar = document.getElementById("boton-confirmar");

  contenedor.innerHTML = "";

  // Caso 1: el carrito está vacío -> mostramos un mensaje en vez de nada
  if (carrito.length === 0) {
    contenedor.innerHTML =
      "<div class='cart-empty'>" +
      "<h2>Tu carrito está vacío</h2>" +
      "<p>Aún no has agregado habitaciones. Ve al <a href='habitaciones.html'>listado de habitaciones</a> para elegir tu estadía.</p>" +
      "</div>";
    totalTexto.textContent = formatearCLP(0);
    botonConfirmar.disabled = true; // no dejamos "confirmar" si no hay nada que confirmar
    return;
  }

  botonConfirmar.disabled = false;

  // Caso 2: hay ítems -> creamos una tarjeta por cada uno
  carrito.forEach(function (item, indice) {
    var tarjeta = document.createElement("div");
    tarjeta.className = "cart-item";

    tarjeta.innerHTML =
      "<img src='" + item.imagen + "' alt='" + escaparTextoCarrito(item.nombre) + "' />" +
      "<div class='cart-item-details'>" +
      "<h3>" + escaparTextoCarrito(item.nombre) + "</h3>" +
      "<p>Del " + formatearFecha(item.fechaLlegada) + " al " + formatearFecha(item.fechaSalida) +
      " · " + item.noches + " noche" + (item.noches > 1 ? "s" : "") + "</p>" +
      "<p>" + item.huespedes + " huésped" + (item.huespedes > 1 ? "es" : "") +
      " · " + formatearCLP(item.precioPorNoche) + "/noche</p>" +
      "</div>" +
      "<div class='cart-item-actions'>" +
      "<span class='cart-item-subtotal'>" + formatearCLP(item.subtotal) + "</span>" +
      "<button type='button' class='btn-remove' data-indice='" + indice + "'>Quitar</button>" +
      "</div>";

    contenedor.appendChild(tarjeta);
  });

  totalTexto.textContent = formatearCLP(calcularTotalCarrito(carrito));

  // A cada botón "Quitar" le agregamos su propio evento de clic.
  // Usamos "data-indice" para saber cuál ítem del arreglo hay que borrar.
  var botonesQuitar = contenedor.querySelectorAll(".btn-remove");
  botonesQuitar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      var indice = Number(boton.dataset.indice);
      quitarDelCarrito(indice); // función de cart.js
      pintarCarrito(); // volvemos a pintar todo con el carrito actualizado
    });
  });
}

/** Convierte una fecha "2026-05-20" en algo más lindo de leer, ej: "20 may 2026". */
function formatearFecha(fechaIso) {
  var fecha = new Date(fechaIso + "T00:00:00");
  return fecha.toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" });
}

/**
 * Configura el formulario de nombre/correo. Al enviarlo, valida los
 * datos y, si están correctos, muestra un mensaje de confirmación y
 * vacía el carrito (como si la reserva ya hubiera quedado hecha).
 */
function configurarFormularioCheckout() {
  var formulario = document.getElementById("form-checkout");
  var mensajeExito = document.getElementById("checkout-exito");

  var inputNombre = document.getElementById("checkout-nombre");
  var inputCorreo = document.getElementById("checkout-correo");
  var errorNombre = document.getElementById("error-checkout-nombre");
  var errorCorreo = document.getElementById("error-checkout-correo");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    mensajeExito.hidden = true;

    var carrito = obtenerCarrito();
    if (carrito.length === 0) return; // no hay nada que confirmar

    var nombreOk = validarTextoObligatorio(inputNombre, errorNombre, 3, "El nombre");
    var correoOk = validarCorreo(inputCorreo, errorCorreo);

    if (nombreOk && correoOk) {
      var total = formatearCLP(calcularTotalCarrito(carrito));

      mensajeExito.hidden = false;
      mensajeExito.textContent =
        "¡Gracias, " + inputNombre.value.trim() + "! Tu reserva de " + carrito.length +
        " habitación" + (carrito.length > 1 ? "es" : "") + " por un total de " + total +
        " fue enviada. Te contactaremos a " + inputCorreo.value.trim() + " para confirmar disponibilidad.";

      vaciarCarrito(); // función de cart.js
      formulario.reset();
      pintarCarrito(); // vuelve a pintar (ahora mostrará "carrito vacío")
    } else {
      var primerCampoInvalido = formulario.querySelector(".invalid");
      if (primerCampoInvalido) primerCampoInvalido.focus();
    }
  });
}

/** Evita que texto insertado en el carrito se interprete como código HTML. */
function escaparTextoCarrito(texto) {
  var contenedorTemporal = document.createElement("div");
  contenedorTemporal.textContent = texto;
  return contenedorTemporal.innerHTML;
}
