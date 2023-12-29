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
    ['Nombre', 'RUT', 'Carrera', 'Rol', 'Seleccionar'].forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    // Agregar filas de usuarios
    usuarios.forEach(usuario => {
        const row = table.insertRow();

        // Datos del usuario
        ['nombre', 'rut_usuario', 'carrera', 'rol'].forEach(key => {
            const cell = row.insertCell();
            cell.textContent = usuario[key];
        });

        // Casilla de selección
        const checkboxCell = row.insertCell();
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkboxCell.appendChild(checkbox);
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

// Obtener referencia a la casilla de verificación y al botón de eliminar
const eliminarCheckbox = document.getElementById('eliminarCheckbox');
const eliminarUsuarioBtn = document.getElementById('eliminarUsuarioBtn');

// Añadir evento clic al botón de eliminar
eliminarUsuarioBtn.addEventListener('click', function () {
    // Verificar si la casilla de verificación está marcada
    if (eliminarCheckbox.checked) {
        // Mostrar modal de confirmación
        showModal('Usuario Eliminado');
    } else {
        // Mostrar modal de advertencia
        showModal('Por favor, selecciona un usuario para eliminar.');
    }
});

// Función para mostrar el modal
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');

    modalText.textContent = message;
    modal.style.display = 'block';

    // Añadir evento clic al botón de cerrar del modal
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Añadir evento clic fuera del modal para cerrarlo
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Añadir evento clic al botón de eliminar en el modal
document.getElementById('eliminarUsuarioBtn').addEventListener('click', function () {

    // Después de eliminar, cerrar el modal
    document.getElementById('modal').style.display = 'none';
});
document.getElementById('eliminarUsuarioBtn').addEventListener('click', function () {
    // Obtener todas las casillas de selección
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let algunUsuarioSeleccionado = false;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            algunUsuarioSeleccionado = true;
            // Aquí puedes realizar acciones adicionales si es necesario
        }
    });

    // Verificar si al menos un usuario está seleccionado
    if (algunUsuarioSeleccionado) {
        // Mostrar modal de confirmación
        showModal('Usuario(s) Eliminado(s)');
    } else {
        // Mostrar modal de advertencia
        showModal('Por favor, selecciona al menos un usuario para eliminar.');
    }
});
// Añadir evento clic al botón de eliminar usuarios
document.getElementById('eliminarUsuarioBtn').addEventListener('click', function () {
    // Obtener todas las casillas de selección
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const usuariosAEliminar = [];

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            usuariosAEliminar.push(usuarios[index].rut_usuario);
        }
    });

    // Verificar si al menos un usuario está seleccionado
    if (usuariosAEliminar.length > 0) {
        // Realizar la solicitud de eliminación al servidor
        eliminarUsuarios(usuariosAEliminar);
    } else {
        // Mostrar modal de advertencia
        showModal('Por favor, selecciona al menos un usuario para eliminar.');
    }
});

// Función para enviar solicitud de eliminación al servidor
async function eliminarUsuarios(ruts) {
    try {
        const response = await fetch('/api/admin-home/EliminarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ruts }),
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar usuarios: ${response.statusText}`);
        }

        // Mostrar modal de confirmación
        showModal('Usuario(s) Eliminado(s)');
        // Actualizar la tabla después de la eliminación
        cargarUsuariosDesdeServidor();
    } catch (error) {
        console.error('Error al eliminar usuarios:', error);
        // Mostrar modal de error
        showModal('Error al eliminar usuarios.');
    }
}
