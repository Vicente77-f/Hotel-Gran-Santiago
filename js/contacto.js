document.addEventListener('DOMContentLoaded', function () {
    var formContacto = document.getElementById('contactoForm');
    
    if (!formContacto) return;

    formContacto.addEventListener('submit', function (event) {
        event.preventDefault(); 
        
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto a la brevedad.');
        
        formContacto.reset();
    });
});