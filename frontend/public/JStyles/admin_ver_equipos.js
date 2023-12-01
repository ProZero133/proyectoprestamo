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

function addEquipmentRow(equipment) {
    // Obtén la referencia a la tabla
    const tableBody = document.querySelector('#equipment-table tbody');

    // Crea una nueva fila
    const newRow = document.createElement('tr');

    // Añade celdas con la información del equipo
    const columns = ['modelo', 'tipo', 'estado', 'condicion', 'propietario', 'FechaLlegada', 'carrera'];
    columns.forEach(columnName => {
        const cell = document.createElement('td');
        if (columnName.startsWith('Fecha')) {
            // Formatea las fechas si existen
            if (equipment[columnName]) {
                const date = new Date(equipment[columnName]);
                cell.textContent = date.toLocaleDateString(); // O utiliza otros métodos de formato de fecha
            } else {
                cell.textContent = 'N/A'; // O algún otro valor predeterminado para fechas nulas
            }
        } else {
            cell.textContent = equipment[columnName];
        }
        newRow.appendChild(cell);
    });

    // Añade la nueva fila a la tabla
    tableBody.appendChild(newRow);
}
// Agrega un evento al botón de búsqueda
document.getElementById("search-button").addEventListener("click", function () {
    const searchInput = document.getElementById("search-input").value;
    const filterModel = document.getElementById("filter-model").value;
    const filterType = document.getElementById("filter-type").value;
    const filterState = document.getElementById("filter-state").value;
    const filterCondition = document.getElementById("filter-condition").value;
    const filterOwner = document.getElementById("filter-owner").value;

    // Lógica de búsqueda en el backend
    // Realiza una solicitud al backend con los valores de búsqueda y filtros
    // Recibe los resultados y actualiza la tabla en la página
    // Aquí puedes usar AJAX, Fetch o cualquier otra biblioteca o enfoque que prefieras

    // Ejemplo: llamada a una función que maneja la búsqueda en el backend
    performSearch(searchInput, filterModel, filterType, filterState, filterCondition, filterOwner);
});

function performSearch(searchInput, filterModel, filterType, filterState, filterCondition, filterOwner) {
    // Realiza una solicitud al backend con los valores de búsqueda y filtros
    fetch('/api/admin-home/ObtenerEquipos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            searchInput: searchInput,
            filterModel: filterModel,
            filterType: filterType,
            filterState: filterState,
            filterCondition: filterCondition,
            filterOwner: filterOwner,
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Llama a una función para actualizar la tabla con los datos de equipos
            updateEquipmentTable(data);
        })
        .catch(error => console.error('Error al obtener datos de equipos:', error));
}

// ... Más código para manipular la tabla de resultados ...
document.addEventListener("DOMContentLoaded", function () {
    // Realiza una solicitud para obtener los datos de equipos desde el servidor
    fetch('/api/admin-home/ObtenerEquipos')  // Modifica la ruta aquí
        .then(response => response.json())
        .then(data => {
            // Llama a una función para actualizar la tabla con los datos de equipos
            updateEquipmentTable(data);
        })
        .catch(error => console.error('Error al obtener datos de equipos:', error));
});

function updateEquipmentTable(equipmentData) {
    // Limpia la tabla
    const tableBody = document.querySelector('#equipment-table tbody');
    tableBody.innerHTML = '';

    // Agrega las filas a la tabla con los datos de equipos
    equipmentData.forEach((equipment) => {
        addEquipmentRow(equipment);
    });
};