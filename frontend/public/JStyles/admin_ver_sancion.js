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
// Supongamos que tienes datos de sanciones en una variable llamada "datosSanciones" desde el backend.

const datosSanciones = [
    { fechaInicio: "2023-10-01", fechaTermino: "2023-10-15", estado: "Activa", rut: "12345678-9" },
    { fechaInicio: "2023-09-15", fechaTermino: "2023-09-30", estado: "Inactiva", rut: "98765432-1" }
    // Agrega más datos de sanciones según lo que tengas en el backend
];

const sancionesTable = document.getElementById("sanciones-table").querySelector("tbody");

// Recorre los datos y crea las filas de la tabla
datosSanciones.forEach((sancion) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${sancion.fechaInicio}</td>
        <td>${sancion.fechaTermino}</td>
        <td>${sancion.estado}</td>
        <td>${sancion.rut}</td>
    `;
    sancionesTable.appendChild(row);
});
