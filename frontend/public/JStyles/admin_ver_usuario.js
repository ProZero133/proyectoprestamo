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
// Para ver el css,solo son datas de prueba!!!
const usuarios = [
    { nombre: 'Juan Perez', rut: '12345678-9', carrera: 'ICINF', rol: 'Estudiante' },
    { nombre: 'Raul jimenez', rut: '98765432-1', carrera: 'IECI', rol: 'Docente' },
    // ... más usuarios
];

// Función para construir la tabla de usuarios
function buildUserTable() {
    const tableContainer = document.getElementById('userTableContainer');

    // Crear la tabla
    const table = document.createElement('table');
    table.classList.add('user-table');

    // Crear encabezado
    const headerRow = table.insertRow();
    ['Nombre', 'RUT', 'Carrera', 'Rol'].forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    // Agregar filas de usuarios
    usuarios.forEach(usuario => {
        const row = table.insertRow();
        ['nombre', 'rut', 'carrera', 'rol'].forEach(key => {
            const cell = row.insertCell();
            cell.textContent = usuario[key];
        });
    });

    // Limpiar el contenedor y agregar la tabla
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

// Llamar a la función para construir la tabla al cargar la página
window.addEventListener('load', buildUserTable);