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

async function cargarDatosEnTablaDesdeServidor() {
    try {
        // Realiza una solicitud fetch al servidor para obtener los datos de la tabla reserva
        const response = await fetch('/api/admin-home/ObtenerPrestamos');
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }

        // Convierte la respuesta a formato JSON
        const data = await response.json();

        // Obtén la referencia a la tabla en el DOM
        const tableBody = document.querySelector('table tbody');

        // Limpia el contenido actual de la tabla
        tableBody.innerHTML = '';

        // Itera sobre los datos y agrega filas a la tabla
        for (const row of data) {
            const newRow = tableBody.insertRow();

            // Añade celdas con los datos de la fila
            const fechaCell = newRow.insertCell();
            fechaCell.textContent = row.fecha;

            const horaSolicitudCell = newRow.insertCell();
            horaSolicitudCell.textContent = row.hora_solicitud;

            // Realiza una solicitud fetch al servidor para obtener la carrera y correo desde la tabla usuario
            const detallesUsuarioResponse = await fetch(`/api/admin-home/ObtenerCarrera/${row.rut_usuario}`);
            console.log('Obteniendo detalles del usuario para' + detallesUsuarioResponse.carrera);
            if (detallesUsuarioResponse.ok) {
                const detallesUsuarioData = await detallesUsuarioResponse.json();

                const nombreCell = newRow.insertCell();
                nombreCell.textContent = detallesUsuarioData.nombre;

                const rutCell = newRow.insertCell();
                rutCell.textContent = row.rut_usuario;

                const correoCell = newRow.insertCell();
                correoCell.textContent = detallesUsuarioData.correo;

                const carreraCell = newRow.insertCell();
                carreraCell.textContent = detallesUsuarioData.carrera;

                const equiposolicitado = newRow.insertCell();
                equiposolicitado.textContent = row.codigo_equipo;
            } else {
                console.error(`Error al obtener detalles del usuario para ${row.rut_usuario}`);
            }
            const celdaNull = newRow.insertCell(newRow.cells.length);
            celdaNull.textContent = null;


            const accionesCell = newRow.insertCell(newRow.cells.length);
            const confirmarEntregaButton = document.createElement('button');
            confirmarEntregaButton.textContent = 'Confirmar entrega';
            confirmarEntregaButton.classList.add('boton_entrega'); //para el css
            confirmarEntregaButton.addEventListener('click', async () => {
                console.log(`Confirmar entrega para la solicitud ${row.codigo_reserva}`);
                const confirmacionEntrega = await confirmarEntrega(row.codigo_reserva);
                if (confirmacionEntrega) {
                    // Actualiza la tabla después de la confirmación de entrega
                    cargarDatosEnTablaDesdeServidor();
                } else {
                    console.error('Error al confirmar la entrega.');
                }
            });

            accionesCell.appendChild(confirmarEntregaButton);
        }
    } catch (error) {
        console.error('Error al cargar datos en la tabla:', error);
    }
}

async function confirmarEntrega(solicitudId) {
    try {
        // Realiza una solicitud fetch al servidor para confirmar la entrega
        const response = await fetch(`/api/admin-home/ConfirmarEntrega/${solicitudId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log(`Entrega confirmada con éxito para la solicitud ${solicitudId}`);
            return true;
        } else {
            console.error('Error al confirmar la entrega:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error al confirmar la entrega:', error);
        return false;
    }
}

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarDatosEnTablaDesdeServidor);

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