/**
 * validaciones.js
 * -----------------------------------------------------------------------
 * Funciones chicas y reutilizables para validar campos de formularios.
 * Se usan tanto en detalle-habitacion.js (formulario "agregar al carrito"
 * y formulario de reseñas) como en carrito.js (formulario de datos de
 * contacto al confirmar la reserva).
 *
 * Se siguen las mismas ideas que ya usaban login.js y registro.js:
 * mostrar el mensaje de error en un <span class="field-error">, y marcar
 * el campo como inválido para que se pinte en rojo con el CSS.
 * -----------------------------------------------------------------------
 */

// Expresión simple para validar formato de correo (texto@texto.texto),
// igual a la que ya usaban login.js y registro.js.
var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Muestra un mensaje de error junto a un campo y lo marca como inválido. */
function mostrarError(input, spanError, mensaje) {
  input.classList.add("invalid");
  if (spanError) {
    spanError.textContent = mensaje;
  }
}

/** Limpia el mensaje de error de un campo (cuando ya quedó correcto). */
function limpiarError(input, spanError) {
  input.classList.remove("invalid");
  if (spanError) {
    spanError.textContent = "";
  }
}

/** Valida que un campo de texto no esté vacío y tenga un largo mínimo. */
function validarTextoObligatorio(input, spanError, largoMinimo, nombreCampo) {
  var valor = input.value.trim();

  if (valor === "") {
    mostrarError(input, spanError, nombreCampo + " es obligatorio.");
    return false;
  }
  if (largoMinimo && valor.length < largoMinimo) {
    mostrarError(input, spanError, nombreCampo + " debe tener al menos " + largoMinimo + " caracteres.");
    return false;
  }

  limpiarError(input, spanError);
  return true;
}

/** Valida que el correo tenga un formato válido. */
function validarCorreo(input, spanError) {
  var valor = input.value.trim();

  if (valor === "") {
    mostrarError(input, spanError, "El correo electrónico es obligatorio.");
    return false;
  }
  if (!emailPattern.test(valor)) {
    mostrarError(input, spanError, "Ingresa un correo válido, ejemplo: nombre@correo.com");
    return false;
  }

  limpiarError(input, spanError);
  return true;
}

/** Valida que se haya elegido una opción en un <select>. */
function validarSelect(select, spanError, textoCampo) {
  if (!select.value) {
    mostrarError(select, spanError, "Selecciona " + textoCampo + ".");
    return false;
  }

  limpiarError(select, spanError);
  return true;
}

/**
 * Valida que la fecha de salida sea posterior a la de llegada, y que la
 * fecha de llegada no sea anterior al día de hoy.
 */
function validarFechas(inputLlegada, inputSalida, spanErrorLlegada, spanErrorSalida) {
  var esValido = true;
  var hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (!inputLlegada.value) {
    mostrarError(inputLlegada, spanErrorLlegada, "Selecciona una fecha de llegada.");
    esValido = false;
  } else {
    var fechaLlegada = new Date(inputLlegada.value + "T00:00:00");
    if (fechaLlegada < hoy) {
      mostrarError(inputLlegada, spanErrorLlegada, "La fecha de llegada no puede ser anterior a hoy.");
      esValido = false;
    } else {
      limpiarError(inputLlegada, spanErrorLlegada);
    }
  }

  if (!inputSalida.value) {
    mostrarError(inputSalida, spanErrorSalida, "Selecciona una fecha de salida.");
    esValido = false;
  } else if (inputLlegada.value) {
    var fechaLlegada2 = new Date(inputLlegada.value + "T00:00:00");
    var fechaSalida = new Date(inputSalida.value + "T00:00:00");
    if (fechaSalida <= fechaLlegada2) {
      mostrarError(inputSalida, spanErrorSalida, "La fecha de salida debe ser posterior a la de llegada.");
      esValido = false;
    } else {
      limpiarError(inputSalida, spanErrorSalida);
    }
  }

  return esValido;
}
