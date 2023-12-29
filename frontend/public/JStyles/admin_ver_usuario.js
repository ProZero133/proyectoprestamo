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
const usuarios = [];



async function cargarUsuariosDesdeServidor() {
    try {
        // Realizar solicitud al servidor
        const response = await fetch('/api/admin-home/CargarUsuarios');

        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error(`Error al obtener usuarios: ${response.statusText}`);
        }

        // Obtener los datos de usuarios desde la respuesta
        const datosUsuarios = await response.json();

        // Actualizar la constante 'usuarios' con los datos obtenidos
        usuarios.length = 0; // Limpiar el array existente
        usuarios.push(...datosUsuarios);

        // Construir la tabla de usuarios con los datos actualizados
        buildUserTable();
    } catch (error) {
        console.error('Error al cargar usuarios desde el servidor:', error);
        // Manejar el error según tus necesidades
    }
}

// Llamar a la función para cargar usuarios al cargar la página
window.addEventListener('load', cargarUsuariosDesdeServidor);







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
        ['nombre', 'rut_usuario', 'carrera', 'rol'].forEach(key => {
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