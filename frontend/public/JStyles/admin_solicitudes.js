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
        row.innerHTML = `
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
document.getElementById("acceptButton").addEventListener("click", function () {
  // Lógica de clic en el botón Aceptar, si es necesario
  // ...

  // Después de realizar la lógica, vuelve a cargar los datos en la tabla
  cargarDatosEnTablaDesdeServidor();
});

// Llama a la función de carga al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  cargarDatosEnTablaDesdeServidor();
});