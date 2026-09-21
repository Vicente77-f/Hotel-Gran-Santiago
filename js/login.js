
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('loginForm');
  if (!form) return;

  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var emailError = document.getElementById('emailError');
  var passwordError = document.getElementById('passwordError');

  // Expresión simple para validar formato de correo (texto@texto.texto)
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Credenciales especiales: si coinciden correo Y contraseña, lo
  // mandamos directo al panel de administración en vez del sitio normal.
  var ADMIN_EMAIL = 'admin@hotelgransantiago.cl';
  var ADMIN_PASSWORD = 'Admin2026';

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // evita que se envíe si hay errores

    var esValido = true;

    // Limpiamos los mensajes anteriores
    emailError.textContent = '';
    passwordError.textContent = '';

    // Validación del correo
    if (emailInput.value.trim() === '') {
      emailError.textContent = 'Debes ingresar tu correo electrónico.';
      esValido = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = 'Ingresa un correo válido, ejemplo: nombre@correo.com';
      esValido = false;
    }

    // Validación de la contraseña
    if (passwordInput.value.trim() === '') {
      passwordError.textContent = 'Debes ingresar tu contraseña.';
      esValido = false;
    } else if (passwordInput.value.trim().length < 6) {
      passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
      esValido = false;
    }

    // Si todo está bien, simulamos el inicio de sesión
    if (esValido) {
      var correoIngresado = emailInput.value.trim().toLowerCase();
      var claveIngresada = passwordInput.value.trim();

      if (correoIngresado === ADMIN_EMAIL) {
        // Es el correo de administrador: la contraseña también debe coincidir
        if (claveIngresada === ADMIN_PASSWORD) {
          window.location.href = '../admin/admin-home.html';
        } else {
          passwordError.textContent = 'Contraseña incorrecta para el administrador.';
        }
      } else {
        // Usuario normal (por ahora es solo una simulación, sin backend)
        alert('Inicio de sesión correcto. ¡Bienvenido/a!');
        form.reset();
      }
    }
  });
});