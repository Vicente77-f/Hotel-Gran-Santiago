
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('registroForm');
  if (!form) return;

  var nombreInput = document.getElementById('nombre');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var password2Input = document.getElementById('password2');

  var nombreError = document.getElementById('nombreError');
  var emailError = document.getElementById('emailError');
  var passwordError = document.getElementById('passwordError');
  var password2Error = document.getElementById('password2Error');

  // Expresión simple para validar formato de correo (texto@texto.texto)
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // evita que se envíe si hay errores

    var esValido = true;

    // Limpiamos los mensajes anteriores
    nombreError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    password2Error.textContent = '';

    // Validación del nombre
    if (nombreInput.value.trim() === '') {
      nombreError.textContent = 'Debes ingresar tu nombre completo.';
      esValido = false;
    } else if (nombreInput.value.trim().length < 3) {
      nombreError.textContent = 'El nombre debe tener al menos 3 caracteres.';
      esValido = false;
    }

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
      passwordError.textContent = 'Debes ingresar una contraseña.';
      esValido = false;
    } else if (passwordInput.value.trim().length < 6) {
      passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
      esValido = false;
    }

    // Validación de confirmación de contraseña
    if (password2Input.value.trim() === '') {
      password2Error.textContent = 'Debes confirmar tu contraseña.';
      esValido = false;
    } else if (password2Input.value.trim() !== passwordInput.value.trim()) {
      password2Error.textContent = 'Las contraseñas no coinciden.';
      esValido = false;
    }

    // Si todo está bien, simulamos el registro y mandamos al login
    if (esValido) {
      alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
      form.reset();
      window.location.href = 'login.html';
    }
  });
});