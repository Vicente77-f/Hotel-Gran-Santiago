/**
 * detalle-habitacion.js
 * -----------------------------------------------------------------------
 * Este archivo hace que detalle-habitacion.html deje de estar vacío y
 * muestre la información real de la habitación que el usuario eligió.
 *
 * ¿Cómo sabe QUÉ habitación mostrar? Cuando en habitaciones.html se hace
 * clic en "Ver detalle", el link es algo como:
 *
 *     detalle-habitacion.html?id=3
 *
 * Ese "?id=3" es un "parámetro de URL". Aquí lo leemos con
 * "URLSearchParams" y buscamos, dentro del arreglo "rooms" (definido en
 * rooms-data.js), la habitación que tenga ese mismo id.
 * -----------------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1) Leer el "id" que viene en la URL, ej: ?id=3 -> "3"
  var parametros = new URLSearchParams(window.location.search);
  var idHabitacion = Number(parametros.get("id"));

  // 2) Buscar, dentro de "rooms" (rooms-data.js), la habitación con ese id
  var habitacion = null;
  for (var i = 0; i < rooms.length; i++) {
    if (rooms[i].id === idHabitacion) {
      habitacion = rooms[i];
      break;
    }
  }

  var contenedorDetalle = document.getElementById("room-detail");

  // 3) Si no se encontró (por ejemplo, alguien entró sin "?id=" o con un
  //    número que no existe), mostramos un mensaje en vez de dejar la
  //    página vacía o rota.
  if (!habitacion) {
    contenedorDetalle.innerHTML =
      "<div>" +
      "<h1>No encontramos esa habitación</h1>" +
      "<p>Vuelve al <a href='habitaciones.html'>listado de habitaciones</a> para elegir otra.</p>" +
      "</div>";
    return; // cortamos acá: no tiene sentido seguir configurando el resto de la página
  }

  // 4) Si sí se encontró, vamos llenando cada parte de la página:
  renderizarHabitacion(habitacion);
  configurarGaleria(habitacion);
  configurarFormularioCarrito(habitacion);
  renderizarResenas(habitacion);
  configurarFormularioResena(habitacion);
});

/**
 * Escribe en el HTML el nombre, descripción, amenidades, precio y
 * capacidad de la habitación (todo lo que va en la columna de la derecha
 * del detalle, más el título de la pestaña y la migaja de pan de arriba).
 */
function renderizarHabitacion(habitacion) {
  document.title = habitacion.nombre + " · Hotel Gran Santiago";
  document.getElementById("breadcrumb-habitacion").textContent = habitacion.nombre;
  document.getElementById("room-name").textContent = habitacion.nombre;
  document.getElementById("room-description").textContent = habitacion.descripcion;

  // formatearCLP() viene de rooms-data.js
  document.getElementById("room-price").textContent = formatearCLP(habitacion.precio) + " ";
  document.getElementById("room-price").insertAdjacentHTML("beforeend", "<small>/noche</small>");

  document.getElementById("room-capacity").textContent =
    "Hasta " + habitacion.huespedes + " huésped" + (habitacion.huespedes > 1 ? "es" : "") +
    " · " + habitacion.metrosCuadrados + " m²";

  // Lista de amenidades: por cada texto del arreglo, creamos un <li>
  var listaAmenidades = document.getElementById("room-amenities");
  listaAmenidades.innerHTML = "";
  for (var i = 0; i < habitacion.amenidades.length; i++) {
    var item = document.createElement("li");
    item.textContent = habitacion.amenidades[i];
    listaAmenidades.appendChild(item);
  }

  // Video embebido (viene de rooms-data.js)
  document.getElementById("room-video-frame").src = habitacion.video;

  // Opciones del selector de huéspedes: van de 1 hasta la capacidad máxima
  // de ESTA habitación (así no se puede reservar para más gente de la que cabe).
  var selectHuespedes = document.getElementById("cantidad-huespedes");
  for (var h = 1; h <= habitacion.huespedes; h++) {
    var opcion = document.createElement("option");
    opcion.value = h;
    opcion.textContent = h + " huésped" + (h > 1 ? "es" : "");
    selectHuespedes.appendChild(opcion);
  }
}

/**
 * Configura la galería de fotos: pone la primera imagen como foto
 * principal, crea las miniaturas, y hace que al hacer clic en una
 * miniatura, esa imagen pase a ser la principal.
 */
function configurarGaleria(habitacion) {
  var imagenPrincipal = document.getElementById("main-image");
  var tiraMiniaturas = document.getElementById("thumbnail-strip");

  imagenPrincipal.src = habitacion.imagenes[0];
  imagenPrincipal.alt = "Vista principal de " + habitacion.nombre;

  tiraMiniaturas.innerHTML = "";

  habitacion.imagenes.forEach(function (rutaImagen, indice) {
    var miniatura = document.createElement("img");
    miniatura.src = rutaImagen;
    miniatura.alt = "Vista " + (indice + 1) + " de " + habitacion.nombre;
    if (indice === 0) {
      miniatura.classList.add("active"); // la primera empieza marcada como seleccionada
    }

    miniatura.addEventListener("click", function () {
      imagenPrincipal.src = rutaImagen;

      // Quitamos la clase "active" de todas las miniaturas...
      var todasLasMiniaturas = tiraMiniaturas.querySelectorAll("img");
      todasLasMiniaturas.forEach(function (img) {
        img.classList.remove("active");
      });
      // ...y se la ponemos solo a la que se acaba de clickear.
      miniatura.classList.add("active");
    });

    tiraMiniaturas.appendChild(miniatura);
  });
}

/**
 * Configura el formulario "Agregar al carrito": valida fechas y
 * huéspedes, y si todo está bien, guarda un ítem nuevo en el carrito
 * (localStorage, ver cart.js) con la habitación, las fechas elegidas y
 * el subtotal ya calculado.
 */
function configurarFormularioCarrito(habitacion) {
  var formulario = document.getElementById("form-agregar-carrito");
  var mensajeExito = document.getElementById("mensaje-agregado");

  var inputLlegada = document.getElementById("fecha-llegada");
  var inputSalida = document.getElementById("fecha-salida");
  var selectHuespedes = document.getElementById("cantidad-huespedes");

  var errorLlegada = document.getElementById("error-fecha-llegada");
  var errorSalida = document.getElementById("error-fecha-salida");
  var errorHuespedes = document.getElementById("error-cantidad-huespedes");

  // Validación "en vivo": apenas el usuario cambia una fecha o el
  // selector de huéspedes, revisamos si quedó correcto (sin esperar a
  // que apriete el botón).
  inputLlegada.addEventListener("change", function () {
    validarFechas(inputLlegada, inputSalida, errorLlegada, errorSalida);
  });
  inputSalida.addEventListener("change", function () {
    validarFechas(inputLlegada, inputSalida, errorLlegada, errorSalida);
  });
  selectHuespedes.addEventListener("change", function () {
    validarSelect(selectHuespedes, errorHuespedes, "el número de huéspedes");
  });

  formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // evita que la página se recargue al enviar
    mensajeExito.hidden = true;

    var fechasOk = validarFechas(inputLlegada, inputSalida, errorLlegada, errorSalida);
    var huespedesOk = validarSelect(selectHuespedes, errorHuespedes, "el número de huéspedes");

    if (fechasOk && huespedesOk) {
      var noches = calcularNoches(inputLlegada.value, inputSalida.value);
      var subtotal = noches * habitacion.precio;

      // agregarAlCarrito() viene de cart.js
      agregarAlCarrito({
        habitacionId: habitacion.id,
        nombre: habitacion.nombre,
        imagen: habitacion.imagenes[0],
        precioPorNoche: habitacion.precio,
        fechaLlegada: inputLlegada.value,
        fechaSalida: inputSalida.value,
        huespedes: Number(selectHuespedes.value),
        noches: noches,
        subtotal: subtotal
      });

      mensajeExito.hidden = false;
      mensajeExito.textContent =
        '"' + habitacion.nombre + '" se agregó al carrito: ' + noches +
        " noche" + (noches > 1 ? "s" : "") + ", total " + formatearCLP(subtotal) +
        ". Puedes seguir agregando habitaciones o ir al carrito para confirmar.";

      formulario.reset();
    } else {
      // Si algo quedó mal, llevamos el foco al primer campo con error
      // para que el usuario lo vea y lo corrija más rápido.
      var primerCampoInvalido = formulario.querySelector(".invalid");
      if (primerCampoInvalido) primerCampoInvalido.focus();
    }
  });
}

/** Dibuja en pantalla la lista de reseñas que ya vienen guardadas en rooms-data.js. */
function renderizarResenas(habitacion) {
  var lista = document.getElementById("reviews-list");
  lista.innerHTML = "";

  habitacion.resenas.forEach(function (resena) {
    agregarTarjetaResena(lista, resena);
  });

  actualizarResumenResenas(habitacion.resenas);
}

/** Crea el HTML de una sola tarjeta de reseña y la agrega a la lista. */
function agregarTarjetaResena(lista, resena) {
  var elementoLista = document.createElement("li");
  elementoLista.className = "review-card";

  // Convertimos el número de estrellas (ej: 4) en "★★★★☆"
  var estrellas = "★".repeat(resena.calificacion) + "☆".repeat(5 - resena.calificacion);

  elementoLista.innerHTML =
    '<div class="review-head">' +
    "<span>" + escaparTexto(resena.nombre) + "</span>" +
    '<span class="review-rating">' + estrellas + "</span>" +
    "</div>" +
    "<p>" + escaparTexto(resena.comentario) + "</p>";

  lista.appendChild(elementoLista);
}

/** Calcula y muestra el promedio de calificación junto con el total de reseñas. */
function actualizarResumenResenas(resenas) {
  var resumen = document.getElementById("reviews-summary");

  if (resenas.length === 0) {
    resumen.innerHTML = "<p>Aún no hay reseñas para esta habitación.</p>";
    return;
  }

  var sumaCalificaciones = 0;
  for (var i = 0; i < resenas.length; i++) {
    sumaCalificaciones += resenas[i].calificacion;
  }
  var promedio = (sumaCalificaciones / resenas.length).toFixed(1);

  resumen.innerHTML =
    '<span class="score">' + promedio + "</span>" +
    "<span>de 5 · basado en " + resenas.length + " reseña" + (resenas.length > 1 ? "s" : "") + "</span>";
}

/**
 * Configura el formulario para dejar una reseña nueva. Al enviarlo (si
 * pasa la validación), se agrega la reseña a la lista en pantalla y al
 * arreglo "habitacion.resenas" en memoria. No queda guardada para
 * siempre (no hay backend), pero sirve para ver el flujo completo.
 */
function configurarFormularioResena(habitacion) {
  var formulario = document.getElementById("form-resena");

  var inputNombre = document.getElementById("resena-nombre");
  var selectCalificacion = document.getElementById("resena-calificacion");
  var inputComentario = document.getElementById("resena-comentario");

  var errorNombre = document.getElementById("error-resena-nombre");
  var errorCalificacion = document.getElementById("error-resena-calificacion");
  var errorComentario = document.getElementById("error-resena-comentario");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    var nombreOk = validarTextoObligatorio(inputNombre, errorNombre, 2, "Tu nombre");
    var calificacionOk = validarSelect(selectCalificacion, errorCalificacion, "una calificación");
    var comentarioOk = validarTextoObligatorio(inputComentario, errorComentario, 10, "El comentario");

    if (nombreOk && calificacionOk && comentarioOk) {
      var nuevaResena = {
        nombre: inputNombre.value.trim(),
        calificacion: Number(selectCalificacion.value),
        comentario: inputComentario.value.trim()
      };

      habitacion.resenas.push(nuevaResena);
      agregarTarjetaResena(document.getElementById("reviews-list"), nuevaResena);
      actualizarResumenResenas(habitacion.resenas);

      formulario.reset();
    } else {
      var primerCampoInvalido = formulario.querySelector(".invalid");
      if (primerCampoInvalido) primerCampoInvalido.focus();
    }
  });
}

/**
 * Evita que texto escrito por el usuario (nombre o comentario de una
 * reseña) se interprete como código HTML al insertarlo en la página.
 */
function escaparTexto(texto) {
  var contenedorTemporal = document.createElement("div");
  contenedorTemporal.textContent = texto;
  return contenedorTemporal.innerHTML;
}
