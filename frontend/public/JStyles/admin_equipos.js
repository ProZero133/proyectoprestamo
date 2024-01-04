// Funcion de click
document.getElementById("btn_open").addEventListener("click", open_close_menu);

// Variables
var side_menu = document.getElementById("menu__side");
var btn_open = document.getElementById("btn_open");
var body = document.getElementById("body");
let listaEquipos = [];
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
document.getElementById('registrarBtn').addEventListener('click', function () {
    document.getElementById('registrarBtn').style.display = 'flex';
});

document.addEventListener('DOMContentLoaded', function () {
    // ...
    fetch('/api/admin-home/ObtenerEquipos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            AlmacenarEquipos(data);
        })
        .catch(error => console.error('Error al obtener datos de equipos:', error));

    // Obtener la lista de tipos desde el servidor
    fetch('/api/admin-home/equipos/obtener-tipos')
        .then(response => response.json())
        .then(tipos => {
            console.log('Tipos obtenidos:', tipos);
            // Rellenar el dropdown con los tipos obtenidos
            const tipoDropdown = document.getElementById('tipo');
            tipos.forEach(tipo => {
                const option = document.createElement('option');
                option.value = tipo.tipo; // Ajusta según la estructura de tu tabla Tipo
                option.textContent = tipo.tipo; // Ajusta según la estructura de tu tabla Tipo
                tipoDropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener tipos:', error));
});
function AlmacenarEquipos(data) {
    listaEquipos = [];
    data.forEach(equipo => {
        listaEquipos.push({
            codigoEquipo: equipo.codigo_equipo,
            codigoInventario: equipo.numero_inventario
        });
    });
    console.log("Equipos almacenados en listaEquipos:", listaEquipos);
}
function existeEquipo(codigoEquipo) {
    return listaEquipos.some(equipo => equipo.codigoEquipo === codigoEquipo);
}
// Función para registrar el equipo
function registrarEquipo() {
    const modelo = document.getElementById("modelo").value;
    const tipo = document.getElementById("tipo").value;
    const estado = document.getElementById("estado").value;
    const condicion = document.getElementById("condicion").value;
    const propietario = document.getElementById("propietario").value;
    const fechallegada = document.getElementById("fechallegada").value;
    const fechaSalida = null
    const codigo_equipo = document.getElementById("codigo_equipo").value;
    const codigo_inventario = document.getElementById("codigo_inventario").value;
    const visible_equipo = document.getElementById("visible_equipo").value;
    const carrera = document.getElementById("carrera").value;


    // Validar que no falten datos
    if (!modelo || !tipo || !estado || !condicion || !propietario || !fechallegada || !codigo_equipo || !codigo_inventario || !visible_equipo || !carrera) {
        const errorModalMessage = document.getElementById('errorModalMessage');
        errorModalMessage.textContent = 'Falta un dato, por favor ingréselo.';
        abrirErrorModal();
        return;
    }

    const mensajeErrorElemento = document.getElementById('mensajeError');

    // Verificar si el número de serie ya existe
    if (existeEquipo(codigo_equipo)) {
        const errorModalMessage = document.getElementById('errorModalMessage');
        errorModalMessage.textContent = 'Error: El número de serie ya existe';
        abrirErrorModal();
        return;  // No se envía la solicitud al servidor si ya existe
    }
    // Limpiar el mensaje de error si no hay error
    mensajeErrorElemento.textContent = '';

    // Luego, puedes enviar los datos a un servidor o almacenarlos en alguna base de datos
    // Por ahora, solo mostraremos los datos en la consola como ejemplo
    console.log("Equipo Registrado:");
    console.log("Modelo:", modelo);
    console.log("Tipo:", tipo);
    console.log("Estado:", estado);
    console.log("Condición:", condicion);
    console.log("Propietario:", propietario);
    console.log("Fecha de Llegada:", fechallegada);
    console.log("Fecha de Salida:", fechaSalida);
    const mensajeElemento = document.getElementById('mensaje');
    fetch('/api/admin-home/equipos/crear-equipo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            modelo,
            tipo,
            estado,
            condicion,
            propietario,
            fechallegada,
            fechaSalida,
            codigo_equipo,
            codigo_inventario,
            visible_equipo,
            carrera
            // Agrega otros campos si es necesario
        }),
    })
        .then(response => {
            if (!response.ok) {
                // Si el servidor responde con un código de error
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            // Si la respuesta del servidor es exitosa, muestra un mensaje de éxito
            console.log('Equipo registrado con éxito:', data);
            mensajeElemento.textContent = 'Equipo registrado con éxito';
        })
        .catch(error => {
            // Si hay algún error en la solicitud, muestra un mensaje de error
            console.error('Error al registrar equipo:', error);
            mensajeElemento.textContent = 'Error al registrar equipo';
        });
    // Abre el modal de éxito
    var modal = document.getElementById('miModal');
    modal.style.display = 'flex';
}
document.getElementById('cerrarModal').addEventListener('click', function () {
    var modal = document.getElementById('miModal');
    modal.style.display = 'none';
});
// Agregar un evento de clic al botón de registro
document.getElementById("registrarBtn").addEventListener("click", function (event) {
    event.preventDefault();
    registrarEquipo();
});
// Agrega un evento de clic al fondo oscuro del modal
document.getElementById('miModal').addEventListener('click', function (event) {
    if (event.target === this) {
        // Cierra el modal solo si se hizo clic en el fondo oscuro
        cerrarModal();
    }
});

// Función para cerrar el modal
function cerrarModal() {
    var modal = document.getElementById('miModal');
    modal.style.display = 'none';
}
// Función para abrir el modal de error
function abrirErrorModal() {
    var errorModal = document.getElementById('errorModal');
    errorModal.style.display = 'flex';

    // Añade un evento de clic al fondo oscuro del modal
    errorModal.addEventListener('click', cerrarErrorModal);
}
// Añade un evento de clic al botón de cierre del modal de error
document.getElementById('cerrarErrorModal').addEventListener('click', function () {
    cerrarErrorModal();
});
// Función para cerrar el modal de error
function cerrarErrorModal() {
    var errorModal = document.getElementById('errorModal');
    errorModal.style.display = 'none';

    // Elimina el evento de clic al fondo oscuro del modal para evitar conflictos
    errorModal.removeEventListener('click', cerrarErrorModal);
}

// Añade un evento de clic al botón de cierre del modal
document.getElementById('cerrarModal').addEventListener('click', function () {
    cerrarModal();
});

// Agregar un evento de clic al botón de registro
document.getElementById("registrarBtn").addEventListener("click", function (event) {
    event.preventDefault();
    registrarEquipo();
});

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