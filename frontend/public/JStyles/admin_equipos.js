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


// Función para registrar el equipo
function registrarEquipo() {
    const modelo = document.getElementById("modelo").value;
    const tipo = document.getElementById("tipo").value;
    const estado = document.getElementById("estado").value;
    const condicion = document.getElementById("condicion").value;
    const propietario = document.getElementById("propietario").value;
    const fechaLlegada = document.getElementById("fecha-llegada").value;
    const fechaSalida = document.getElementById("fecha-salida").value;

    // Aquí puedes realizar alguna validación de datos si es necesario

    // Luego, puedes enviar los datos a un servidor o almacenarlos en alguna base de datos
    // Por ahora, solo mostraremos los datos en la consola como ejemplo
    console.log("Equipo Registrado:");
    console.log("Modelo:", modelo);
    console.log("Tipo:", tipo);
    console.log("Estado:", estado);
    console.log("Condición:", condicion);
    console.log("Propietario:", propietario);
    console.log("Fecha de Llegada:", fechaLlegada);
    console.log("Fecha de Salida:", fechaSalida);

    // Puedes agregar código para enviar los datos a un servidor aquí
}

// Agregar un evento de clic al botón de registro
document.getElementById("submit-button").addEventListener("click", registrarEquipo);
