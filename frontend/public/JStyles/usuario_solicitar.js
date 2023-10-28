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
// Estructura de datos para los ordenadores
//hacer prueba cuando se cree el backend
var ordenadores = [
    { modelo: "Modelo 1", caracteristicas: "Características del Modelo 1" },
    { modelo: "Modelo 2", caracteristicas: "Características del Modelo 2" },
    // Agrega más ordenadores si es necesario
];
document.addEventListener("DOMContentLoaded", function () {
    // Obtener el elemento del formulario
    var solicitudForm = document.getElementById("solicitud-form");

    // Obtener el contenedor para la lista de ordenadores
    var ordenadoresList = document.createElement("div");
    ordenadoresList.classList.add("ordenadores-list");

    // Itera sobre la estructura de datos y crea un elemento para cada ordenador
    ordenadores.forEach(function (ordenador, index) {
        var ordenadorElement = document.createElement("div");
        ordenadorElement.classList.add("ordenador");
        ordenadorElement.innerHTML = `
        <h3>${ordenador.modelo}</h3>
        <p>${ordenador.caracteristicas}</p>
        <button class="solicitar-button" data-index="${index}">Solicitar</button>
      `;
        ordenadoresList.appendChild(ordenadorElement);
    });

    // Agrega la lista de ordenadores al formulario
    solicitudForm.appendChild(ordenadoresList);

    // Agrega un manejador de eventos para los botones de solicitud
    var solicitarButtons = document.querySelectorAll(".solicitar-button");
    solicitarButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var index = button.getAttribute("data-index");
            solicitarOrdenador(index);
        });
    });
});

function solicitarOrdenador(index) {
    // Aquí puedes implementar la lógica para solicitar el ordenador seleccionado.
    // Puedes acceder a la información del ordenador desde la estructura de datos utilizando el índice.
    var ordenadorSeleccionado = ordenadores[index];

    // Puedes realizar una solicitud al backend o mostrar un mensaje de confirmación.
    alert("Has solicitado el ordenador: " + ordenadorSeleccionado.modelo);
}

