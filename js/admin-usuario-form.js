document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('usuarioNuevoForm') || document.getElementById('usuarioEditarForm');
  if (!form) return;

  var esEdicion = form.id === 'usuarioEditarForm';

  var nombreInput = document.getElementById('nombre');
  var apellidosInput = document.getElementById('apellidos');
  var runInput = document.getElementById('run');
  var emailInput = document.getElementById('email');
  var fechaInput = document.getElementById('fechaNacimiento');
  var tipoUsuarioInput = document.getElementById('tipoUsuario');
  var regionInput = document.getElementById('region');
  var comunaInput = document.getElementById('comuna');
  var direccionInput = document.getElementById('direccion');
  var passwordInput = document.getElementById('password');

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var runPattern = /^[0-9]{7,8}-[0-9kK]$/;

  function mostrarError(id, mensaje) {
    var span = document.getElementById(id + 'Error');
    if (span) span.textContent = mensaje;
  }

  function limpiarErrores() {
    var campos = ['nombre', 'apellidos', 'run', 'email', 'fechaNacimiento', 'tipoUsuario', 'region', 'comuna', 'direccion', 'password'];
    campos.forEach(function (campo) {
      mostrarError(campo, '');
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var esValido = true;
    limpiarErrores();

    if (nombreInput.value.trim() === '') {
      mostrarError('nombre', 'Debes ingresar el nombre.');
      esValido = false;
    }

    if (apellidosInput.value.trim() === '') {
      mostrarError('apellidos', 'Debes ingresar los apellidos.');
      esValido = false;
    }

    if (runInput.value.trim() === '') {
      mostrarError('run', 'Debes ingresar el Run.');
      esValido = false;
    } else if (!runPattern.test(runInput.value.trim())) {
      mostrarError('run', 'Formato de Run inválido. Ejemplo: 12345678-9');
      esValido = false;
    }

    if (emailInput.value.trim() === '') {
      mostrarError('email', 'Debes ingresar un correo electrónico.');
      esValido = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      mostrarError('email', 'Ingresa un correo válido, ejemplo: nombre@correo.com');
      esValido = false;
    }

    if (fechaInput.value.trim() === '') {
      mostrarError('fechaNacimiento', 'Debes ingresar la fecha de nacimiento.');
      esValido = false;
    }

    if (tipoUsuarioInput.value.trim() === '') {
      mostrarError('tipoUsuario', 'Debes seleccionar el tipo de usuario.');
      esValido = false;
    }

    if (regionInput.value.trim() === '') {
      mostrarError('region', 'Debes seleccionar una región.');
      esValido = false;
    }

    if (comunaInput.value.trim() === '') {
      mostrarError('comuna', 'Debes ingresar la comuna.');
      esValido = false;
    }

    if (direccionInput.value.trim() === '') {
      mostrarError('direccion', 'Debes ingresar la dirección.');
      esValido = false;
    }

    if (!esEdicion && passwordInput.value.trim() === '') {
      mostrarError('password', 'Debes ingresar una contraseña.');
      esValido = false;
    } else if (passwordInput.value.trim() !== '' && passwordInput.value.trim().length < 6) {
      mostrarError('password', 'La contraseña debe tener al menos 6 caracteres.');
      esValido = false;
    }

    if (esValido) {
      if (esEdicion) {
        alert('Cambios guardados correctamente.');
        window.location.href = 'admin-usuario-mostrar.html';
      } else {
        alert('Usuario creado correctamente.');
        form.reset();
        window.location.href = 'admin-usuarios.html';
      }
    }
  });
});