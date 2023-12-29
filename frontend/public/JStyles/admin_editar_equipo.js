// Obtén el formulario y los campos de texto
const formulario = document.getElementById('registro-form');
const codigoEquipoInput = document.getElementById('codigo_equipo');
const tipoInput = document.getElementById('tipo');
const estadoInput = document.getElementById('estado');
// Agrega más campos según sea necesario...

// Agrega un evento al cargar la página
window.addEventListener('load', async function () {
  // Obtén el código del equipo de algún lugar, por ejemplo, la URL
  const urlParams = new URLSearchParams(window.location.search);
  const codigoEquipo = urlParams.get('codigoEquipo');

  // Realiza la solicitud a la nueva ruta
  const response = await fetch(`/api/admin-home/obtener-datos-equipo/${codigoEquipo}`);
  if (response.ok) {
    // Obtén los datos del equipo
    const datosEquipo = await response.json();

    // Llena los campos del formulario con los datos obtenidos
    codigoEquipoInput.value = datosEquipo.codigo_equipo;
    tipoInput.value = datosEquipo.tipo;
    estadoInput.value = datosEquipo.estado;
    // Llena más campos según sea necesario...
  } else {
    console.error('Error al obtener datos del equipo:', response.statusText);
    // Maneja el error según tus necesidades
  }
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