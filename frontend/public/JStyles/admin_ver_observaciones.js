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

// Simulación de datos de observaciones obtenidos del backend
var observacionesData = [
    {
        fechaObservacion: "2023-10-29",
        motivo: "Incumplimiento",
        codigoEquipo: "E001",
        rut: "12345678-9",
        codigoReserva: "R001",
    },
    {
        fechaObservacion: "2023-10-30",
        motivo: "Daño al equipo",
        codigoEquipo: "E002",
        rut: "98765432-1",
        codigoReserva: "R002",
    },
    // Agregar más datos aquí
];

// Función para poblar la tabla con datos de observaciones
function fillObservationsTable() {
    var tableBody = document.querySelector("#observaciones-table tbody");

    observacionesData.forEach(function (observacion) {
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = observacion.fechaObservacion;
        cell2.innerHTML = observacion.motivo;
        cell3.innerHTML = observacion.codigoEquipo;
        cell4.innerHTML = observacion.rut;
        cell5.innerHTML = observacion.codigoReserva;
    });
}

// Llamar a la función para llenar la tabla cuando se cargue la página
window.addEventListener("load", fillObservationsTable);
