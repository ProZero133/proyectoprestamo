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
document.addEventListener("DOMContentLoaded", function () {
    // Función para manejar el envío del formulario de observación
    document.getElementById("observacion-form").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevenir el envío del formulario por defecto

        // Obtener los datos del formulario de observación
        var fechaObservacion = document.getElementById("fecha_observacion").value;
        var motivo = document.getElementById("motivo").value;
        var codigoEquipo = document.getElementById("id_equipo").value;
        var rut = document.getElementById("RUTUsuario").value;
        var codigoReserva = document.getElementById("codigo_reserva").value;

        var data = {
            fechaObservacion: fechaObservacion,
            motivo: motivo,
            codigoEquipo: codigoEquipo,
            rut: rut,
            codigoReserva: codigoReserva
        };

        // Enviar los datos al servidor
        fetch('/api/admin-home/CrearObservacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                // Mostrar un mensaje de éxito
                showMessage("Observación creada exitosamente.", true);
            })
            .catch((error) => {
                console.error('Error:', error);
                // Mostrar un mensaje de error
                showMessage("Error al crear la observación.", false);
            });
    });
});

function fillFaltasTable() {
    var tableBody = document.querySelector("#observaciones-table tbody");

    // Realizar una solicitud fetch a la API
    fetch('/api/admin-home/CargarSanciones')
        .then(response => response.json())
        .then(observacionesData => {
            // Limpiar el cuerpo de la tabla
            tableBody.innerHTML = '';

            // Rellenar la tabla con los datos de las observaciones
            observacionesData.forEach(function (observacion) {
                var row = tableBody.insertRow();
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);

                cell1.innerHTML = observacion.fecha_inicion;
                cell2.innerHTML = observacion.fecha_fin;
                cell3.innerHTML = observacion.estado_sancion;
                cell4.innerHTML = observacion.rut_usuario;
            });
        })
        .catch(error => console.error('Error:', error));
}
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
window.addEventListener("load", fillFaltasTable);

// Añade un evento de clic para cada ícono de la barra lateral
document.getElementById('equipos').addEventListener('click', function () {
    toggleSideMenu();
});

document.getElementById('usuario').addEventListener('click', function () {
    toggleSideMenu();
});

document.getElementById('faltas').addEventListener('click', function () {
    toggleSideMenu();
});

// Función para alternar la visibilidad de la barra lateral
function toggleSideMenu() {
    var isSideMenuVisible = side_menu.classList.contains("menu__side_move");

    // Si la barra lateral no está visible, se abre
    if (!isSideMenuVisible) {
        body.classList.add("body_move");
        side_menu.classList.add("menu__side_move");
    }
}