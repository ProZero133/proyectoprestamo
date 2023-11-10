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
// Supongamos que tienes una función que obtiene los datos del usuario y el historial desde el backend
function obtenerDatosUsuarioYHistorial() {
    // Aquí realizarías una solicitud al servidor o API para obtener los datos
    // Por simplicidad, simularemos los datos en este ejemplo
    const datosUsuario = { nombre: "Juan Pérez" };
    const historialPrestamos = [
        { fecha: "2023-01-15", equipo: "Laptop", estado: "Entregado" },
        { fecha: "2023-02-10", equipo: "Monitor", estado: "Pendiente" },
        // Otros registros de historial...
    ];

    // Actualiza el nombre del usuario en la página
    const nombreUsuarioElement = document.getElementById("nombre-usuario");
    nombreUsuarioElement.textContent = `Nombre del Usuario: ${datosUsuario.nombre}`;

    // Actualiza el historial de préstamos en la página
    const historialUsuarioElement = document.getElementById("historial-usuario").querySelector("tbody");
    historialPrestamos.forEach(prestamo => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${prestamo.fecha}</td><td>${prestamo.equipo}</td><td>${prestamo.estado}</td>`;
        historialUsuarioElement.appendChild(row);
    });
}

// Llama a la función para obtener y mostrar los datos del usuario y el historial
obtenerDatosUsuarioYHistorial();
