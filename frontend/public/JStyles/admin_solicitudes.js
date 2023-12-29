// admin_solicitudes.js

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

// Función para cargar los datos en la tabla desde el servidor
async function cargarDatosEnTablaDesdeServidor() {
  try {
    // Hacer la solicitud al servidor para obtener las solicitudes
    const response = await fetch('api/user-home/getSolicitudes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Obtener los datos de respuesta en formato JSON
      const solicitudes = await response.json();
      console.log('Solicitudes obtenidas desde el servidor:', solicitudes);
      // Obtén la referencia a la tabla en el DOM
      const table = document.querySelector("table tbody");

      // Limpia la tabla antes de cargar nuevos datos
      table.innerHTML = '';

      // Itera sobre las solicitudes y crea las filas de la tabla con el checkbox
      solicitudes.forEach((solicitud) => {
        const row = document.createElement("tr");
        const idSolicitud = solicitud.id;
        console.log(`ID de la solicitud: ${idSolicitud}`);
        row.innerHTML = `
              <td>${solicitud.id}</td>
              <td>${solicitud.fecha}</td>
              <td>${solicitud.hora}</td>
              <td>${solicitud.nombre}</td>
              <td>${solicitud.rut}</td>
              <td>${solicitud.correo}</td>
              <td>${solicitud.carrera}</td>
              <td>${solicitud.equipo}</td>
              <td>
              <button class="sancionar">Sancionar</button>
              <button class="observacion">Agregar Observación</button>
              </td>
              <td><input type="checkbox"></td>
          `;

        table.appendChild(row);
      });
    } else {
      console.error('Error al obtener las solicitudes desde el servidor');
    }
  } catch (error) {
    console.error('Error de red al obtener las solicitudes:', error);
  }
}

// Agrega un evento de clic al botón "Aceptar"
document.getElementById("acceptButton").addEventListener("click", async function () {
  try {
    // Obtén todos los checkboxes en la tabla
    const checkboxes = document.querySelectorAll("table tbody input[type='checkbox']");

    // Array para almacenar las solicitudes aceptadas
    const solicitudesAceptadas = [];

    // Itera sobre los checkboxes y realiza la lógica deseada
    for (let index = 0; index < checkboxes.length; index++) {
      const checkbox = checkboxes[index];

      if (checkbox.checked) {
        // Obtiene el ID de la solicitud asociada a la fila seleccionada
        const solicitudId = obtenerIdSolicitudDesdeFila(index);
        console.log(`Solicitud seleccionada para aceptar: ${solicitudId}`);

        // Realiza una solicitud fetch al servidor para aceptar la solicitud
        const response = await fetch(`/api/admin-home/AceptarSolicitud/${solicitudId}`, {
          method: 'POST',
        });

        if (response.ok) {
          solicitudesAceptadas.push(solicitudId);
          console.log(`Solicitud aceptada con éxito: ${solicitudId}`);
        } else {
          console.error(`Error al aceptar la solicitud ${solicitudId}:`, response.statusText);
        }
      }
    }

    if (solicitudesAceptadas.length > 0) {
      console.log('Solicitudes aceptadas:', solicitudesAceptadas);
      // Después de realizar la lógica, vuelve a cargar los datos en la tabla
      cargarDatosEnTablaDesdeServidor();
    } else {
      console.log('No se seleccionaron solicitudes para aceptar.');
    }
  } catch (error) {
    console.error('Error al procesar la aceptación de la solicitud:', error);
  }
});

function obtenerIdSolicitudDesdeFila(index) {
  // Obtén la referencia a la fila según el índice
  const fila = document.querySelectorAll("table tbody tr")[index];

  // Obtén la primera celda (td) de la fila y asume que contiene la ID de la solicitud
  const idSolicitud = fila.querySelector('td:first-child').textContent;

  return idSolicitud;
}

function obtenerIdEquipo(index) {
  const fila = document.querySelectorAll("table tbody tr")[index];

  // Obtener el valor de la celda en la posición 8 (suponiendo que la información está en la octava celda)
  const IdEquipo = fila.querySelector('td:nth-child(8)').textContent;

  return IdEquipo;
}
document.getElementById("rechazoButton").addEventListener("click", async function () {
  try {
    // Obtén todos los checkboxes en la tabla
    const checkboxes = document.querySelectorAll("table tbody input[type='checkbox']");

    // Itera sobre los checkboxes y realiza la lógica deseada
    checkboxes.forEach(async (checkbox, index) => {
      if (checkbox.checked) {
        // Obtiene el ID de la solicitud asociada al checkbox seleccionado
        const solicitudId = obtenerIdSolicitudDesdeFila(index);
        const equipoId = obtenerIdEquipo(index);
        // Realiza una solicitud fetch al servidor para rechazar la solicitud
        const response = await fetch(`/api/user-home/RechazarSolicitud/${solicitudId}/${equipoId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log(`Solicitud rechazada con éxito: ${solicitudId}`);
        } else {
          console.error('Error al rechazar la solicitud:', response.statusText);
        }
      }
    });

    // Después de realizar la lógica, vuelve a cargar los datos en la tabla
    cargarDatosEnTablaDesdeServidor();
  } catch (error) {
    console.error('Error al procesar el rechazo de la solicitud:', error);
  }
});

// Llama a la función de carga al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  cargarDatosEnTablaDesdeServidor();
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