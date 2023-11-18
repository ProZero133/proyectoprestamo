// Funcion de click
document.getElementById("btn_open").addEventListener("click", open_close_menu);

// Variables
var side_menu = document.getElementById("menu__side");
var btn_open = document.getElementById("btn_open");
var body = document.getElementById("body");

function open_close_menu() {
    body.classList.toggle("body_move");
    side_menu.classList.toggle("menu__side_move");
}

// Oculta el menú al recargar si la página es pequeña
if (window.innerWidth < 760) {
    body.classList.add("body_move");
    side_menu.classList.add("menu__side_move");
}

// Menú adaptable
window.addEventListener("resize", function () {
    if (this.window.innerWidth > 760) {
        body.classList.remove("body_move");
        side_menu.classList.remove("menu__side_move");
    }
    if (this.window.innerWidth < 760) {
        body.classList.remove("body_move");
        side_menu.classList.remove("menu__side_move");
    }
});
document.getElementById('equipos').addEventListener('click', function () {
    var submenu = document.getElementById('equiposSubmenu');
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
});
document.getElementById('usuario').addEventListener('click', function () {
    var submenu = document.getElementById('equiposUsuario');
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
});
document.getElementById('faltas').addEventListener('click', function () {
    var submenu = document.getElementById('adminFaltas');
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
});
// Función para mostrar un mensaje de éxito o error
function showMessage(message, isSuccess) {
    var messageDiv = document.getElementById("message");
    messageDiv.innerHTML = message;
    messageDiv.className = isSuccess ? "success" : "error";
}

// Función para manejar el envío del formulario de observación
document.getElementById("observacion-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtener los datos del formulario de observación
    var fechaObservacion = document.getElementById("fecha_observacion").value;
    var motivo = document.getElementById("motivo").value;
    var codigoEquipo = document.getElementById("codigo_equipo").value;
    var rut = document.getElementById("rut").value;
    var codigoReserva = document.getElementById("codigo_reserva").value;

    // Aquí puedes enviar los datos al servidor o procesarlos según tus necesidades

    // Mostrar un mensaje de éxito o error
    showMessage("Observación creada exitosamente.", true);
});

// Función para manejar el envío del formulario de sanción
document.getElementById("sancion-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtener los datos del formulario de sanción
    var fechaInicio = document.getElementById("fecha_inicio").value;
    var fechaTermino = document.getElementById("fecha_termino").value;
    var estadoSancion = document.getElementById("estado_sancion").value;
    var rutSancion = document.getElementById("rut_sancion").value;

    // Aquí puedes enviar los datos al servidor o procesarlos según tus necesidades

    // Mostrar un mensaje de éxito o error
    showMessage("Sanción creada exitosamente.", true);
});