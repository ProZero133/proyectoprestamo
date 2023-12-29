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

// Abrir el modal
document.getElementById('registrarBtn').addEventListener('click', function () {
    var modal = document.getElementById('miModal');
    modal.style.display = 'flex';
});

// Cerrar el modal
function cerrarModal() {
    var modal = document.getElementById('miModal');
    modal.style.display = 'none';
}

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