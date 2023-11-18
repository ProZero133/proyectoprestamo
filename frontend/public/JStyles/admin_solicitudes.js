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


// Agregar evento de clic para la opción "Equipos"
var equiposOption = document.querySelector(".fa-laptop").parentElement.parentElement;

equiposOption.addEventListener("click", function (e) {
    e.preventDefault(); // Prevenir que el enlace funcione

    // Alternar una clase para mostrar u ocultar el submenú
    var submenu = equiposOption.querySelector(".submenu");
    submenu.classList.toggle("active-submenu");
});
var equiposOption = document.querySelector(".fa-laptop").parentElement.parentElement;

equiposOption.addEventListener("click", function (e) {
    e.preventDefault(); // Prevenir que el enlace funcione

    // Alternar una clase para mostrar u ocultar el submenú
    equiposOption.classList.toggle("active-submenu");
});
var equiposOption = document.querySelector(".submenu-trigger");

equiposOption.addEventListener("click", function (e) {
    e.preventDefault(); // Prevenir que el enlace funcione

    // Alternar una clase para mostrar u ocultar el submenú
    var submenu = equiposOption.querySelector(".submenu");
    submenu.classList.toggle("active-submenu");
});
// Supongamos que tienes un array de solicitudes
const solicitudes = [
    {
        Fecha: "2023-10-29",
        Hora: "14:30",
        Nombre: "Ejemplo 1",
        Rut: "12.345.678-9",
        Correo: "ejemplo1@gmail.com",
        Carrera: "Informática",
        EquipoSolicitado: "Laptop"
    },
    // Agrega más objetos de solicitudes aquí
];

// Obtén la referencia a la tabla en el DOM
const table = document.querySelector("table tbody");

// Itera sobre las solicitudes y crea las filas de la tabla
solicitudes.forEach((solicitud) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${solicitud.Fecha}</td>
        <td>${solicitud.Hora}</td>
        <td>${solicitud.Nombre}</td>
        <td>${solicitud.Rut}</td>
        <td>${solicitud.Correo}</td>
        <td>${solicitud.Carrera}</td>
        <td>${solicitud.EquipoSolicitado}</td>
        <td>
            <button class="sancionar">Sancionar</button>
            <button class="observacion">Agregar Observación</button>
        </td>
    `;

    table.appendChild(row);
});
